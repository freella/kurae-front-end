import type { Router } from 'vue-router'

export interface SeoMeta {
  title?: string
  description?: string
  image?: string
  noindex?: boolean
}

const SITE_NAME = import.meta.env.VITE_APP_NAME || 'Kurae'
const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')
const DEFAULT_DESCRIPTION = `${SITE_NAME} – plataforma de gestão de saúde e bem-estar.`
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = url
}

export function applySeo(path: string, seo: SeoMeta = {}) {
  const title = seo.title ? `${seo.title} | ${SITE_NAME}` : SITE_NAME
  const description = seo.description ?? DEFAULT_DESCRIPTION
  const image = seo.image ?? DEFAULT_IMAGE
  const url = `${SITE_URL}${path}`

  document.title = title
  setMeta('name', 'description', description)
  setMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')
  setCanonical(url)

  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:image', image)

  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', image)
}

/** Atualiza as meta tags a cada navegação usando `route.meta.seo`. */
export function setupSeo(router: Router) {
  router.afterEach((to) => {
    applySeo(to.path, to.meta.seo as SeoMeta | undefined)
  })
}
