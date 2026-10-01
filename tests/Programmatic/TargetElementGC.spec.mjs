import { test, expect } from '@playwright/test';

// Needs gc() exposed, which forces its own worker -- hence a separate file.
test.use({ launchOptions: { args: ['--js-flags=--expose-gc'] } });

test('Programmatic>TargetElementGC: a removed #kitchen is not kept alive', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('./tests/Programmatic/TargetElementGC.html');
    await page.waitForTimeout(1000);
    // The test's own WeakRef lets it observe collection without keeping the element alive.
    await page.evaluate(() => {
        const el = document.querySelector('#kitchen');
        globalThis.__removedRef = new WeakRef(el);
        el.remove();
    });
    // WeakRef targets survive until the current job ends, so collect across several turns.
    const collected = await page.evaluate(async () => {
        const ref = globalThis.__removedRef;
        for(let i = 0; i < 20 && ref.deref() !== undefined; i++){
            await new Promise(r => setTimeout(r, 50));
            globalThis.gc();
        }
        return ref.deref() === undefined;
    });
    expect(collected, 'the removed #kitchen was garbage collected, so the enhancement held no strong reference to it').toBe(true);
    // Enter on the input whose button was collected is a no-op, not an error...
    await page.locator('#kitchenInput').press('Enter');
    // ...and the enhancement keeps working for the live target.
    await page.locator('#porchInput').press('Enter');
    await expect(page.locator('#porch')).toHaveAttribute('data-clicked', 'true');
    expect(errors).toEqual([]);
});
