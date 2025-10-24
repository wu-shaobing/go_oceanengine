import { test, expect } from '@playwright/test';

/**
 * Login Tests for cl.mobgi.com
 * 
 * Test credentials:
 * - URL: http://cl.mobgi.com/login
 * - Email: 11489573@qq.com
 * - Password: Aa123456
 */

test.describe('Login Functionality', () => {
  test('should successfully login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Fill in login credentials
    // Note: Update selectors based on actual page structure
    await page.fill('input[type="email"], input[name="email"], input[placeholder*="邮箱"]', '11489573@qq.com');
    await page.fill('input[type="password"], input[name="password"], input[placeholder*="密码"]', 'Aa123456');
    
    // Click login button
    // Note: Update selector based on actual button
    await page.click('button[type="submit"], button:has-text("登录"), button:has-text("Login")');
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    // Verify successful login
    // Note: Update this assertion based on actual post-login page
    await expect(page).not.toHaveURL(/.*login.*/);
    
    // Optional: Take screenshot after successful login
    await page.screenshot({ path: 'tests/screenshots/after-login.png', fullPage: true });
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Fill in invalid credentials
    await page.fill('input[type="email"], input[name="email"], input[placeholder*="邮箱"]', 'invalid@example.com');
    await page.fill('input[type="password"], input[name="password"], input[placeholder*="密码"]', 'wrongpassword');
    
    // Click login button
    await page.click('button[type="submit"], button:has-text("登录"), button:has-text("Login")');
    
    // Wait for error message to appear
    // Note: Update selector based on actual error message element
    await expect(page.locator('.error-message, .alert-error, [role="alert"]')).toBeVisible();
  });

  test('should have required form fields', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Check if email and password fields are present
    const emailField = page.locator('input[type="email"], input[name="email"], input[placeholder*="邮箱"]');
    const passwordField = page.locator('input[type="password"], input[name="password"], input[placeholder*="密码"]');
    const submitButton = page.locator('button[type="submit"], button:has-text("登录"), button:has-text("Login")');
    
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(submitButton).toBeVisible();
  });
});
