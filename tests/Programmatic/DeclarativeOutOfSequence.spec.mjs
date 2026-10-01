import { test, expect } from '@playwright/test';
test('Programmatic>DeclarativeOutOfSequence', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('./tests/Programmatic/DeclarativeOutOfSequence.html');
    const subject = page.locator('#subject');
    // nudge removes the disabled attribute once the enhancement is ready
    await expect(subject).toBeEnabled();
    await subject.press('Enter');
    await expect(page.locator('#target')).toHaveAttribute('mark', 'good');
    expect(errors).toEqual([]);
});
