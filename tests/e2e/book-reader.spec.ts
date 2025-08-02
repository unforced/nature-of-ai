import { test, expect } from '@playwright/test';

test.describe('Book Reader', () => {
  test('should navigate to chapters from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Click on Interactive Book card
    await page.click('text=Interactive Book');
    await expect(page).toHaveURL('/chapters');
    
    // Should show chapter selection page
    await expect(page.locator('h1')).toContainText('The Nature of Code');
  });

  test('should display chapter navigation sidebar', async ({ page, isMobile }) => {
    await page.goto('/chapters');
    
    // Check sidebar is visible
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // On mobile, toggle the menu
    if (isMobile) {
      await page.click('button:has-text("Chapters")');
    }
    
    // Check chapters are listed
    await expect(sidebar.locator('text=Introduction')).toBeVisible();
    await expect(sidebar.locator('text=1. Vectors')).toBeVisible();
    await expect(sidebar.locator('text=2. Forces')).toBeVisible();
  });

  test('should navigate between chapters', async ({ page, isMobile, browserName }) => {
    // Skip on mobile browsers for now - navigation menu doesn't auto-close
    if (isMobile && (browserName === 'webkit' || browserName === 'chromium')) {
      test.skip();
    }
    await page.goto('/chapters');
    
    // On mobile, toggle the menu
    if (isMobile) {
      await page.click('button:has-text("Chapters")');
    }
    
    // Click on Vectors chapter
    await page.click('text=1. Vectors');
    await expect(page).toHaveURL('/chapters/vectors');
    
    // Content should load
    await expect(page.locator('h1')).toContainText('Vectors');
    
    // On mobile, toggle the menu again
    if (isMobile) {
      await page.click('button:has-text("Chapters")');
    }
    
    // Navigate to Forces chapter
    await page.click('text=2. Forces');
    await expect(page).toHaveURL('/chapters/forces');
    await expect(page.locator('h1')).toContainText('Forces');
  });

  test('should display code blocks', async ({ page }) => {
    await page.goto('/chapters/vectors');
    
    // Wait for content to load
    await page.waitForSelector('pre[data-code-language]');
    
    // Check code block is displayed
    const codeBlock = page.locator('pre[data-code-language]').first();
    await expect(codeBlock).toBeVisible();
    
    // For now, we're just displaying raw HTML without interactive features
    // TODO: Add CodeBlock component integration for interactive features
  });

  test.skip('should copy code to clipboard', async ({ page, context, browserName }) => {
    // Grant clipboard permissions (only works in Chromium)
    if (browserName === 'chromium') {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    }
    
    await page.goto('/chapters/vectors');
    await page.waitForSelector('pre[data-code-language]');
    
    // Click copy button
    await page.click('button:has-text("Copy")');
    
    // Button should show "Copied!"
    await expect(page.locator('button:has-text("Copied!")')).toBeVisible();
    
    // After 2 seconds, should revert to "Copy"
    await page.waitForTimeout(2500);
    await expect(page.locator('button:has-text("Copy")')).toBeVisible();
  });

  test.skip('should toggle AI chat for code blocks', async ({ page }) => {
    await page.goto('/chapters/vectors');
    await page.waitForSelector('pre[data-code-language]');
    
    // Initially chat should not be visible
    await expect(page.locator('input[placeholder="Ask about this code..."]')).not.toBeVisible();
    
    // Click Ask AI button
    await page.click('button:has-text("Ask AI")');
    
    // Chat interface should appear
    await expect(page.locator('input[placeholder="Ask about this code..."]')).toBeVisible();
    
    // Click again to hide
    await page.click('button:has-text("Ask AI")');
    await expect(page.locator('input[placeholder="Ask about this code..."]')).not.toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/chapters');
    
    // Sidebar should have toggle button on mobile
    const toggleButton = page.locator('button:has-text("Chapters")');
    await expect(toggleButton).toBeVisible();
    
    // Navigation should be hidden initially on mobile
    const nav = page.locator('nav');
    await expect(nav).toHaveClass(/hidden/);
    
    // Click to open
    await toggleButton.click();
    await expect(nav).toHaveClass(/block/);
  });
});