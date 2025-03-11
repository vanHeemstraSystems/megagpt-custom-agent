import { test, expect } from '@playwright/test';

test('agent chat interaction', async ({ page }) => {
  await page.goto('/');

  // Type a message
  await page.fill('input[type="text"]', 'Hello agent');
  await page.click('button[type="submit"]');

  // Wait for response
  await expect(page.locator('text=Processed message:')).toBeVisible();

  // Check message history
  const messages = await page.locator('.space-y-4 > div').count();
  expect(messages).toBe(2); // User message and agent response
});