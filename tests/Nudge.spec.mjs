import { test, expect } from '@playwright/test';
test('Nudge (emoji attributes)', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('./tests/Nudge.html');
    const subject = page.locator('#subject');
    await expect(subject).toBeEnabled();
    await subject.press('Enter');
    await expect(page.locator('#target')).toHaveAttribute('mark', 'good');
    expect(errors).toEqual([]);
});
