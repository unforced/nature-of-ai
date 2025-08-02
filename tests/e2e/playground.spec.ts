import { test, expect } from '@playwright/test';

test.describe('Code Playground', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground');
  });

  test('should display editor and preview panels', async ({ page }) => {
    // Wait for editor to load by checking for Monaco editor
    await page.waitForSelector('.monaco-editor', { state: 'visible', timeout: 10000 });
    
    // Check both panels are visible
    const editor = page.locator('.monaco-editor');
    const preview = page.locator('iframe[title="p5.js Preview"]');
    
    await expect(editor).toBeVisible();
    await expect(preview).toBeVisible();
  });

  test('should have control buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("Run")')).toBeVisible();
    await expect(page.locator('button:has-text("Reset")')).toBeVisible();
    await expect(page.locator('button:has-text("Show Console")')).toBeVisible();
  });

  test('should run code when clicking Run', async ({ page }) => {
    // Wait for editor to load
    await page.waitForSelector('.monaco-editor', { state: 'visible', timeout: 10000 });
    
    // Click Run button
    await page.click('button:has-text("Run")');
    
    // Button should change to Stop
    await expect(page.locator('button:has-text("Stop")')).toBeVisible();
    
    // Preview should be active (message should disappear)
    const previewMessage = page.locator('text=Click "Run" to start the sketch');
    await expect(previewMessage).not.toBeVisible();
  });

  test('should stop code when clicking Stop', async ({ page }) => {
    // Wait for editor to load
    await page.waitForSelector('.monaco-editor', { state: 'visible', timeout: 10000 });
    
    // Run the code
    await page.click('button:has-text("Run")');
    await expect(page.locator('button:has-text("Stop")')).toBeVisible();
    
    // Stop the code
    await page.click('button:has-text("Stop")');
    await expect(page.locator('button:has-text("Run")')).toBeVisible();
  });

  test('should toggle console visibility', async ({ page }) => {
    // Console should be hidden initially
    const console = page.locator('text=Console Output');
    await expect(console).not.toBeVisible();
    
    // Show console
    await page.click('button:has-text("Show Console")');
    await expect(console).toBeVisible();
    await expect(page.locator('button:has-text("Hide Console")')).toBeVisible();
    
    // Hide console
    await page.click('button:has-text("Hide Console")');
    await expect(console).not.toBeVisible();
  });

  test('should reset code to default', async ({ page }) => {
    // Wait for editor to load
    await page.waitForSelector('.monaco-editor', { state: 'visible', timeout: 10000 });
    
    // Modify the code
    await page.click('.monaco-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.type('// Modified code');
    
    // Reset
    await page.click('button:has-text("Reset")');
    
    // Check default code is restored
    await page.waitForTimeout(1000); // Give state time to update
    const editorContent = await page.locator('.view-lines').textContent();
    expect(editorContent).toContain('function setup()');
    expect(editorContent).toContain('function draw()');
  });

  test('should open from code block', async ({ page }) => {
    // Navigate to a chapter with code
    await page.goto('/chapters/vectors');
    await page.waitForSelector('.language-javascript');
    
    // Should open playground in new tab when clicking Run
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('button:has-text("Run")').first() // Use first() to ensure we click the right button
    ]);
    
    // New page should be playground
    await expect(newPage).toHaveURL('/playground');
  });
});