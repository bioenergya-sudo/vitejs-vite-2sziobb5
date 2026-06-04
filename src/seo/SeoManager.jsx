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

    // 1. <html lang>
    document.documentElement.lang = lang

    // 1b. Content-Language meta (ако съществува в index.html)
    const meta = document.querySelector('meta[http-equiv="Content-Language"]')
    if (meta) meta.setAttribute('content', lang)

    // 2. canonical - преизползваме съществуващия, за да няма дубликат
    let c = document.querySelector('link[rel="canonical"]')
    if (!c) {
      c = document.createElement('link')
      c.setAttribute('rel', 'canonical')
      document.head.appendChild(c)
    }
    c.setAttribute('href', canonical)

    // 3. hreflang - махаме старите инжектирани, слагаме новите
    document.querySelectorAll('link[data-seo="hreflang"]').forEach(el => el.remove())
    alternates.forEach(a => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'alternate')
      l.setAttribute('hreflang', a.hreflang)
      l.setAttribute('href', a.href)
      l.setAttribute('data-seo', 'hreflang')
      document.head.appendChild(l)
    })

    // 4. og:locale (ако съществува)
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'bg_BG')
  }, [pathname])

  return null
}