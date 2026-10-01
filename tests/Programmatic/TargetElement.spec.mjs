import { test, expect } from '@playwright/test';
test('Programmatic>TargetElement: to accepts an element, or a WeakRef to one', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('./tests/Programmatic/TargetElement.html');
    await page.waitForTimeout(500);
    await page.locator('#kitchenInput').press('Enter');
    await expect(page.locator('.kitchen')).toHaveAttribute('data-clicked', 'true');
    await expect(page.locator('.porch')).not.toHaveAttribute('data-clicked', 'true');
    await page.locator('#porchInput').press('Enter');
    await expect(page.locator('.porch')).toHaveAttribute('data-clicked', 'true');
    expect(errors).toEqual([]);
});
