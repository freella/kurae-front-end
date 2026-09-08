import { test, expect } from '@playwright/test'

test.describe('Landing Page Lead Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Acesse a URL local (Vite padrão)
    await page.goto('http://localhost:5173')
  })

  test('deve exibir erros de validação ao tentar enviar formulário vazio', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()

    await expect(page.locator('text=O nome é obrigatório.')).toBeVisible()
    await expect(page.locator('text=O email é obrigatório.')).toBeVisible()
  })

  test('deve enviar o lead com sucesso quando os dados estão corretos', async ({ page }) => {
    // Preenche os campos
    await page.fill('input#name', 'Testador Antigravity')
    await page.fill('input#email', 'testador@antigravity.dev')

    // Clica no enviar
    await page.click('button[type="submit"]')

    // Verifica a mensagem de sucesso
    // Nota: como o serviço é um mock, ele deve responder instantaneamente
    await expect(page.locator('text=Lead enviado com sucesso!')).toBeVisible()
    
    // Verifica se os campos foram limpos
    await expect(page.locator('input#name')).toHaveValue('')
    await expect(page.locator('input#email')).toHaveValue('')
  })

  test('deve ser totalmente responsivo', async ({ page }) => {
    // Muda para mobile
    await page.setViewportSize({ width: 375, height: 667 })
    
    // O Header deve mudar para coluna (estilo que definimos no CSS modular)
    const header = page.locator('.landing-header')
    const flexDirection = await header.evaluate((el) => window.getComputedStyle(el).flexDirection)
    expect(flexDirection).toBe('column')
  })
})
