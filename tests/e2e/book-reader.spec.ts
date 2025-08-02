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

  test('should display chapter navigation sidebar', async ({ page }) => {
    await page.goto('/chapters');
    
    // Check sidebar is visible
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // Check chapters are listed
    await expect(sidebar.locator('text=Introduction')).toBeVisible();
    await expect(sidebar.locator('text=Chapter 1: Vectors')).toBeVisible();
    await expect(sidebar.locator('text=Chapter 2: Forces')).toBeVisible();
  });

  test('should navigate between chapters', async ({ page }) => {
    await page.goto('/chapters');
    
    // Click on Vectors chapter
    await page.click('text=Chapter 1: Vectors');
    await expect(page).toHaveURL('/chapters/vectors');
    
    // Content should load
    await expect(page.locator('h1')).toContainText('Vectors');
    
    // Navigate to Forces chapter
    await page.click('text=Chapter 2: Forces');
    await expect(page).toHaveURL('/chapters/forces');
    await expect(page.locator('h1')).toContainText('Forces');
  });

  test('should display code blocks with interactive features', async ({ page }) => {
    await page.goto('/chapters/vectors');
    
    // Wait for content to load
    await page.waitForSelector('.language-javascript');
    
    // Check code block is displayed
    const codeBlock = page.locator('.language-javascript').first();
    await expect(codeBlock).toBeVisible();
    
    // Check interactive buttons
    await expect(page.locator('button:has-text("Copy")')).toBeVisible();
    await expect(page.locator('button:has-text("Run")')).toBeVisible();
    await expect(page.locator('button:has-text("Ask AI")')).toBeVisible();
  });

  test('should copy code to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    await page.goto('/chapters/vectors');
    await page.waitForSelector('.language-javascript');
    
    // Click copy button
    await page.click('button:has-text("Copy")');
    
    // Button should show "Copied!"
    await expect(page.locator('button:has-text("Copied!")')).toBeVisible();
    
    // After 2 seconds, should revert to "Copy"
    await page.waitForTimeout(2500);
    await expect(page.locator('button:has-text("Copy")')).toBeVisible();
  });

  test('should toggle AI chat for code blocks', async ({ page }) => {
    await page.goto('/chapters/vectors');
    await page.waitForSelector('.language-javascript');
    
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
    await expect(nav).toHaveCSS('display', 'none');
    
    // Click to open
    await toggleButton.click();
    await expect(nav).toHaveCSS('display', 'block');
  });
});