import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://handymansofia.com'

// Единствен източник на истина: BG път <-> EN път
const PAIRS = [
  { bg: '/',              en: '/en' },
  { bg: '/vik-remonti',   en: '/en/plumbing-repairs-sofia' },
  { bg: '/dovarshitelni', en: '/en/home-finishing-sofia' },
  { bg: '/montaji',       en: '/en/appliance-installation-sofia' },
  { bg: '/mebeli',        en: '/en/furniture-assembly-sofia' },
  { bg: '/elektro',       en: '/en/electrical-installation-sofia' },
]

// BG-only страници (без EN близнак)
const BG_ONLY = ['/za-nas']

// EN-only страници (бъдещи: english-speaking-handyman, furniture-restoration)
const EN_ONLY = []

function normalize(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

function resolve(pathname) {
  const path = normalize(pathname)

  const pair = PAIRS.find(p => p.bg === path || p.en === path)
  if (pair) {
    return {
      lang: pair.en === path ? 'en' : 'bg',
      canonical: SITE + path,
      alternates: [
        { hreflang: 'bg',        href: SITE + pair.bg },
        { hreflang: 'en',        href: SITE + pair.en },
        { hreflang: 'x-default', href: SITE + pair.bg },
      ],
    }
  }

  if (EN_ONLY.includes(path)) {
    return {
      lang: 'en',
      canonical: SITE + path,
      alternates: [
        { hreflang: 'en',        href: SITE + path },
        { hreflang: 'x-default', href: SITE + path },
      ],
    }
  }

  if (BG_ONLY.includes(path)) {
    return {
      lang: 'bg',
      canonical: SITE + path,
      alternates: [
        { hreflang: 'bg',        href: SITE + path },
        { hreflang: 'x-default', href: SITE + path },
      ],
    }
  }

  // fallback за непознат път - самореферентен, по префикс
  const lang = path.startsWith('/en') ? 'en' : 'bg'
  return {
    lang,
    canonical: SITE + path,
    alternates: [
      { hreflang: lang,        href: SITE + path },
      { hreflang: 'x-default', href: SITE + path },
    ],
  }
}

export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { lang, canonical, alternates } = resolve(pathname)

    document.documentElement.lang = lang
    const meta = document.querySelector('meta[http-equiv="Content-Language"]')
    if (meta) meta.setAttribute('content', lang)

    let c = document.querySelector('link[rel="canonical"]')
    if (!c) {
      c = document.createElement('link')
      c.setAttribute('rel', 'canonical')
      document.head.appendChild(c)
    }
    c.setAttribute('href', canonical)

    document.querySelectorAll('link[data-seo="hreflang"]').forEach(el => el.remove())
    alternates.forEach(a => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'alternate')
      l.setAttribute('hreflang', a.hreflang)
      l.setAttribute('href', a.href)
      l.setAttribute('data-seo', 'hreflang')
      document.head.appendChild(l)
    })

    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'bg_BG')

    // GA4 pageview при всяка навигация
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
      })
    }
  }, [pathname])

  // Conversion events — глобален click listener
  useEffect(() => {
    function handleClick(e) {
      if (!window.gtag) return
      const t = e.target

      // Резервирай бутон в сервизна карта
      if (t.closest('.svc-book-btn')) {
        window.gtag('event', 'booking_started', {
          event_category: 'conversion',
          event_label: t.closest('.service-card')?.querySelector('.svc-name')?.textContent || 'unknown',
        })
      }
      // WhatsApp
      if (t.closest('.wa-btn') || t.closest('.float-wa-btn')) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'conversion',
        })
      }
      // Viber
      if (t.closest('.viber-btn') || t.closest('.float-viber-btn') || t.closest('.sticky-viber-btn')) {
        window.gtag('event', 'viber_click', {
          event_category: 'conversion',
        })
      }
      // Телефон
      if (t.closest('.phone-link') || t.closest('.phone-num')) {
        window.gtag('event', 'phone_click', {
          event_category: 'conversion',
        })
      }
      // CTA бутони (Book now / Резервирай горе)
      if (t.closest('.nav-cta') || t.closest('.sticky-cta-btn') || t.closest('.btn-primary')) {
        window.gtag('event', 'cta_click', {
          event_category: 'conversion',
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
  
  return null
}