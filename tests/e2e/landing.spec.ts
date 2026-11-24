import { test, expect, type Page } from '@playwright/test'

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:5173'

async function fillValidForm(page: Page, overrides?: Partial<Record<string, string>>) {
  await page.fill('#contact-name', overrides?.name ?? 'QA Teste Kurae')
  await page.fill('#contact-email', overrides?.email ?? 'qa.teste.kurae+01@example.com')
  await page.fill('#contact-phone', overrides?.phone ?? '11900000001')
  await page.fill(
    '#contact-message',
    overrides?.message ?? 'Teste E2E automatizado do formulário de contato.',
  )
  await page.check('#contact-privacy')
}

test.describe('Landing Page — Fluxo E2E de Contato', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('1. Campos inválidos: exibe mensagens claras e foca primeiro erro', async ({ page }) => {
    await page.click('#contato button[type="submit"]')

    await expect(page.locator('#contact-name-error')).toContainText('O nome é obrigatório.')
    await expect(page.locator('#contact-email-error')).toContainText('O e-mail é obrigatório.')
    await expect(page.locator('#contact-message-error')).toContainText('A mensagem é obrigatória.')
    await expect(page.locator('#contact-privacy-error')).toContainText('Política de Privacidade')
    await expect(page.locator('#contact-name')).toBeFocused()

    await page.locator('#contato').screenshot({ path: 'test-results/evidencia-01-validacao.png' })
  })

  test('2. Política de Privacidade acessível pelo formulário', async ({ page }) => {
    const privacyLink = page.locator('#contato a[href="/politica-de-privacidade"]')
    await expect(privacyLink).toBeVisible()
  })

  test('3. Envio válido: envia dados mínimos, exibe sucesso e limpa campos', async ({ page }) => {
    let capturedBody: Record<string, unknown> | null = null

    await page.route('**/api/leads/', async (route) => {
      capturedBody = route.request().postDataJSON() as Record<string, unknown>
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead registrado com sucesso' }),
      })
    })

    await fillValidForm(page)
    await page.click('#contato button[type="submit"]')

    await expect(page.locator('#contato [role="status"]')).toContainText(
      'Mensagem enviada com sucesso!',
    )
    await expect(page.locator('#contact-name')).toHaveValue('')
    await expect(page.locator('#contact-email')).toHaveValue('')
    await expect(page.locator('#contact-message')).toHaveValue('')

    expect(capturedBody).toMatchObject({
      name: 'QA Teste Kurae',
      email: 'qa.teste.kurae+01@example.com',
      phone: '11900000001',
      privacy_accepted: true,
    })

    await page.locator('#contato').screenshot({ path: 'test-results/evidencia-02-sucesso.png' })
  })

  test('4. Erro de rede e recuperação no reenvio', async ({ page }) => {
    let attempts = 0

    await page.route('**/api/leads/', async (route) => {
      attempts += 1
      if (attempts === 1) {
        await route.abort('failed')
        return
      }
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead registrado com sucesso' }),
      })
    })

    await fillValidForm(page)
    await page.click('#contato button[type="submit"]')

    await expect(page.locator('#contato p[role="alert"]')).toContainText('Não foi possível enviar')
    await expect(page.locator('#contact-name')).toHaveValue('QA Teste Kurae')
    await page.locator('#contato').screenshot({ path: 'test-results/evidencia-03-erro-rede.png' })

    await page.click('#contato button[type="submit"]')
    await expect(page.locator('#contato [role="status"]')).toContainText(
      'Mensagem enviada com sucesso!',
    )
  })

  test('5. Indisponibilidade da HubSpot (503) e recuperação', async ({ page }) => {
    let attempts = 0

    await page.route('**/api/leads/', async (route) => {
      attempts += 1
      if (attempts === 1) {
        await route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({
            error:
              'Nosso serviço de atendimento está temporariamente indisponível. Tente novamente em instantes.',
          }),
        })
        return
      }
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead registrado com sucesso' }),
      })
    })

    await fillValidForm(page)
    await page.click('#contato button[type="submit"]')

    await expect(page.locator('#contato p[role="alert"]')).toContainText(
      'temporariamente indisponível',
    )
    await page.locator('#contato').screenshot({ path: 'test-results/evidencia-04-hubspot-503.png' })

    await page.click('#contato button[type="submit"]')
    await expect(page.locator('#contato [role="status"]')).toContainText(
      'Mensagem enviada com sucesso!',
    )
  })

  test('6. Responsividade Desktop e Mobile sem overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.locator('#contato form')).toBeVisible()
    const desktopOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(desktopOverflow).toBe(false)
    await page.locator('#contato').screenshot({ path: 'test-results/evidencia-05-desktop.png' })

    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('#contato form')).toBeVisible()
    const mobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(mobileOverflow).toBe(false)
    await page.locator('#contato').screenshot({ path: 'test-results/evidencia-06-mobile.png' })
  })
})
