import { test, expect } from '@playwright/test'

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login')
  })

  test('should show on the screen', async ({ page }) => {
    await expect(page).toHaveTitle(/Facebook/)

    await expect(page.getByRole('heading', { name: 'facebook' })).toBeVisible()

    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()

    await expect(page.getByRole('button', { name: 'Đăng nhập' })).toBeVisible()
  })

  test("should show error message when user doesn't input email and password", async ({ page }) => {
    await page.click('button[type="submit"]')

    await expect(page.getByText('Email is not valid!')).toBeVisible()
    await expect(page.getByText('Password must be at least 6 characters!')).toBeVisible()
  })

  test('should show error message when user input invalid email', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="password"]', '123456')

    await page.click('button[type="submit"]')

    await expect(page.getByText('Email is not valid!')).toBeVisible()
  })

  test('should show error message when user input password less than 6 characters', async ({ page }) => {
    await page.fill('input[name="email"]', 'ttson.1711@gmail.com')
    await page.fill('input[name="password"]', '123')

    await page.click('button[type="submit"]')

    await expect(page.getByText('Password must be at least 6 characters!')).toBeVisible()
  })

  test('should show error message when user input wrong email or password', async ({ page }) => {
    await page.fill('input[name="email"]', 'ttson.123@gmail.com')
    await page.fill('input[name="password"]', '123456')

    await page.click('button[type="submit"]')

    await expect(page.getByText('No user found')).toBeVisible()
  })

  test('should redirect to home page when user input correct email and password', async ({ page }) => {
    await page.fill('input[name="email"]', 'ttson.1740@gmail.com')
    await page.fill('input[name="password"]', '!Enouvo1234')

    await page.click('button[type="submit"]')
    await page.waitForURL('http://localhost:5173/')

    await expect(page.getByText('Magnus Klein')).toBeVisible()
  })

  test('should open popup when click on "Tạo tài khoản mới" button', async ({ page }) => {
    await page.click('text="Tạo tài khoản mới"')

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Đăng ký' })).toBeVisible()
  })
})
