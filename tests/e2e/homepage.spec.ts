import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Nature of AI');
  });

  test('should display the tagline', async ({ page }) => {
    await expect(page.locator('text=An AI-powered interactive version of The Nature of Code')).toBeVisible();
  });

  test('should display three feature cards', async ({ page }) => {
    const featureCards = page.locator('.grid > a');
    await expect(featureCards).toHaveCount(3);
    
    await expect(featureCards.nth(0)).toContainText('Interactive Book');
    await expect(featureCards.nth(1)).toContainText('AI Assistant');
    await expect(featureCards.nth(2)).toContainText('Code Playground');
  });

  test('should have proper meta tags', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Nature of AI - Interactive Nature of Code');
    
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toBe('An AI-powered interactive version of The Nature of Code by Daniel Shiffman');
  });

  test('should be responsive', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    const desktopGrid = page.locator('.grid > a');
    await expect(desktopGrid).toHaveCount(3);
    
    // Check that cards are displayed side by side on desktop
    const firstCard = await desktopGrid.first().boundingBox();
    const secondCard = await desktopGrid.nth(1).boundingBox();
    expect(firstCard?.y).toBe(secondCard?.y); // Same vertical position = side by side
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileGrid = page.locator('.grid > a');
    await expect(mobileGrid).toHaveCount(3);
    
    // Check that cards are stacked on mobile
    const firstCardMobile = await mobileGrid.first().boundingBox();
    const secondCardMobile = await mobileGrid.nth(1).boundingBox();
    expect(firstCardMobile?.y).toBeLessThan(secondCardMobile?.y || 0); // Different vertical position = stacked
  });
});