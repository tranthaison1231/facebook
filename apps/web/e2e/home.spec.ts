import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.waitForURL('http://localhost:5173/login')

    await page.fill('input[name="email"]', 'ttson.1740@gmail.com')
    await page.fill('input[name="password"]', '!Enouvo1234')

    await page.click('button[type="submit"]')
    await page.waitForURL('http://localhost:5173/')
  })

  test('should show on the screen', async ({ page }) => {
    await expect(page).toHaveTitle(/Facebook/)
  })

  test("should open create post modal when user click on 'Magnus ơi, bạn đang nghĩ gì thế?' button", async ({
    page
  }) => {
    const postTitle = faker.lorem.sentence()
    await page.getByText('Magnus ơi ,bạn đang nghĩ gì').click()

    await expect(page.getByRole('heading', { name: 'Tạo Bài viết' })).toBeVisible()

    await page.getByPlaceholder('Magnus Klein ơi, Bạn đang ngh').fill(postTitle)
    await page.getByRole('button', { name: 'Đăng' }).click()

    await expect(page.getByText(postTitle)).toBeVisible()
  })
})
