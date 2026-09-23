const { test, expect } = require('@playwright/test');

async function openDemo(page) {
  await page.goto('/');
  await expect(page.locator('#connOverlay')).toBeHidden();
}

test('live ECG pauses on other tabs and when the document is hidden, and stays near 30 fps', async ({ page }) => {
  await page.addInitScript(() => {
    window.ecgDraws = 0;
    const fillRect = CanvasRenderingContext2D.prototype.fillRect;
    CanvasRenderingContext2D.prototype.fillRect = function (...args) {
      if (this.canvas?.id === 'ecgCanvas') window.ecgDraws += 1;
      return fillRect.apply(this, args);
    };
  });
  await openDemo(page);

  const initial = await page.evaluate(() => window.ecgDraws);
  await page.waitForTimeout(1000);
  const visible = await page.evaluate(() => window.ecgDraws);
  expect(visible - initial).toBeGreaterThan(3);
  expect(visible - initial).toBeLessThanOrEqual(35);

  await page.locator('[aria-controls="tab-trends"]').click();
  const paused = await page.evaluate(() => window.ecgDraws);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.ecgDraws)).toBe(paused);

  await page.locator('[aria-controls="tab-live"]').click();
  await expect.poll(() => page.evaluate(() => window.ecgDraws)).toBeGreaterThan(paused);

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const hidden = await page.evaluate(() => window.ecgDraws);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.ecgDraws)).toBe(hidden);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(() => page.evaluate(() => window.ecgDraws)).toBeGreaterThan(hidden);
});

test('profile details survive reload and the clear action removes them', async ({ page }) => {
  await openDemo(page);
  await page.locator('[aria-controls="tab-profile"]').click();
  await page.locator('#profName').fill('Test User');
  await page.locator('#profEmergency1').fill('Ali - 555');
  await page.locator('.btn-save').click();
  await expect(page.locator('#saveToast')).toHaveClass(/show/);

  await openDemo(page);
  await page.locator('[aria-controls="tab-profile"]').click();
  await expect(page.locator('#profName')).toHaveValue('Test User');
  await expect(page.locator('#profEmergency1')).toHaveValue('Ali - 555');

  page.once('dialog', dialog => dialog.accept());
  await page.locator('.btn-clear-data').click();
  await expect(page.locator('#profName')).toHaveValue('');
  expect(await page.evaluate(() => localStorage.getItem('akilliGiysi_profile'))).toBeNull();
});

test('scenario buttons show and dismiss the correct alert flows', async ({ page }) => {
  await openDemo(page);
  await page.locator('.sc-panic').click();
  await expect(page.locator('#alertTitle')).toHaveText('YÜKSEK STRES ALGILANDI');
  await page.locator('#alertBtn').click();
  await expect(page.locator('#alertOverlay')).toBeHidden();

  await page.locator('.sc-heart').click();
  await expect(page.locator('#alertTitle')).toHaveText('KRİTİK KALBİ RİTİM BOZUKLUĞU');
  await expect(page.locator('#emergencyFlow')).toHaveClass(/active/);
});
