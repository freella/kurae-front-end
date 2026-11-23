import { test, expect } from '@playwright/test'

test.describe('Landing Page Lead Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('deve exibir erros de validação ao tentar enviar formulário vazio', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()

    await expect(page.locator('text=O nome é obrigatório.')).toBeVisible()
    await expect(page.locator('text=O e-mail é obrigatório.')).toBeVisible()
    await expect(page.locator('text=A mensagem é obrigatória.')).toBeVisible()
    await expect(page.locator('text=Confirme a leitura da Política de Privacidade')).toBeVisible()
  })

  test('deve exibir link funcional para a Política de Privacidade', async ({ page }) => {
    const privacyLink = page.locator('#contato a[href="/politica-de-privacidade"]')
    await expect(privacyLink).toBeVisible()
  })

  test('deve enviar o lead com sucesso quando os dados estão corretos', async ({ page }) => {
    await page.route('**/api/leads/', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead registrado com sucesso' }),
      })
    })

    await page.fill('input#contact-name', 'Testador Kurae')
    await page.fill('input#contact-email', 'testador@kurae.dev')
    await page.fill('input#contact-phone', '11999998888')
    await page.fill('textarea#contact-message', 'Gostaria de conhecer mais sobre as soluções.')
    await page.check('input#contact-privacy')

    await page.click('button[type="submit"]')

    await expect(page.locator('text=Mensagem enviada com sucesso!')).toBeVisible()
    await expect(page.locator('input#contact-name')).toHaveValue('')
    await expect(page.locator('input#contact-email')).toHaveValue('')
    await expect(page.locator('textarea#contact-message')).toHaveValue('')
  })

  test('deve ser funcional em viewport mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('#contato form')).toBeVisible()
    await expect(page.locator('#contact-name')).toBeVisible()
    await expect(page.locator('#contact-message')).toBeVisible()
  })
})
