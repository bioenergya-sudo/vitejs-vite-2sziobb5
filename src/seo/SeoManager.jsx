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

// Per-route title и description.
// Цените са сверени с BRAIN/цени.md (окончателни от 04.07.2026) и SERVICE_DATA.
// Ограничения: title <= 60 символа, description <= 155.
const SEO_META = {
  '/': {
    title: 'Домашен майстор София — фиксирани цени от 11 €',
    description: 'Домашен майстор в София за дребни ремонти и монтажи. Виждаш цената преди да дойдем — смесител 45 €, полилей 37 €, контакт 11 €. Гаранция и фактура.',
  },
  '/elektro': {
    title: 'Монтаж на полилей София — цена 37 € | Електро услуги',
    description: 'Домашен майстор за електро услуги в София. Полилей 37 €, контакт 11 € — фиксирана цена, верифициран електротехник.',
  },
  '/mebeli': {
    title: 'Сглобяване на мебели София — цени от 20 € | IKEA, Jysk',
    description: 'Шкаф или легло 35 €, гардероб с плъзгащи 60 €, рафт 20 €. Домашен майстор в София за всички марки. Бързо, чисто, фиксирана цена.',
  },
  '/vik-remonti': {
    title: 'ВиК майстор София — смесител 45 €, сифон 39 € | Същия ден',
    description: 'Течове, запушвания, казанчета, смесители. Домашен майстор в София — идваме в същия ден. Фиксирана цена, без изненади.',
  },
  '/montaji': {
    title: 'Монтаж на бойлер, миялна, пералня София — фиксирани цени',
    description: 'Домашен майстор за монтаж на уреди в София. Бойлер 130 €, миялна 90 €, аспиратор 70 €. Верифицирани майстори, гаранция.',
  },
  '/dovarshitelni': {
    title: 'Довършителни ремонти София — боядисване 8 €/кв.м.',
    description: 'Боядисване, шпакловка, тапети, ламинат, фаянс. Домашен майстор в София — стена 8 €/кв.м., ламинат 5 €/кв.м. Фиксирана цена.',
  },
  '/za-nas': {
    title: 'За нас — домашен майстор с фиксирани цени в София',
    description: 'Кои сме, как работим и защо казваме цената преди да дойдем. Домашен майстор в София с гаранция и фактура.',
  },

  // === EN — 222 импресии на 0% CTR. Най-важните редове в целия файл. ===
  '/en': {
    title: 'English-Speaking Handyman in Sofia — Prices from €11',
    description: 'Repairs, installations and assembly in Sofia. You see the price before we arrive. English-speaking, verified, invoice provided.',
  },
  '/en/electrical-installation-sofia': {
    title: 'English-Speaking Electrician Sofia — Chandelier €37',
    description: 'Chandeliers, light fixtures, sockets and switches. Chandelier €37, socket €11. Fixed price, verified electrician, English spoken.',
  },
  '/en/furniture-assembly-sofia': {
    title: 'Furniture Assembly Sofia — IKEA & All Brands from €20',
    description: 'Wardrobe €60, cabinet or bed €35, shelf €20. Fast, clean, no mess. English-speaking, fixed prices.',
  },
  '/en/plumbing-repairs-sofia': {
    title: 'Plumber in Sofia — Tap Replacement €45 | English-Speaking',
    description: 'Leaks, blockages, cisterns, taps. Same-day service. Fixed price, no surprises, English spoken.',
  },
  '/en/appliance-installation-sofia': {
    title: 'Appliance Installation Sofia — Boiler, Dishwasher, Washer',
    description: 'Appliance installation in Sofia at a fixed price you see upfront. Boiler €130, dishwasher €90. English-speaking, guaranteed.',
  },
  '/en/home-finishing-sofia': {
    title: 'Home Finishing & Repairs Sofia — English-Speaking Handyman',
    description: 'Painting €8/sq.m., laminate €5/sq.m. Plastering, wallpaper, tiling. Small jobs welcome, fixed prices, English spoken.',
  },
}

// Fallback за непознат път — същите стойности като статичните в index.html
const FALLBACK_META = {
  title: 'HandymanSofia – Ремонти на едно повикване в София',
  description: 'Майстор за дребни ремонти и монтажи в София – мебели, бойлери, осветление, корнизи и домашни ремонти. Бързо посещение и коректни цени.',
}

function normalize(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

function resolve(pathname) {
  const path = normalize(pathname)
  const meta = SEO_META[path] || FALLBACK_META

  const pair = PAIRS.find(p => p.bg === path || p.en === path)
  if (pair) {
    return {
      lang: pair.en === path ? 'en' : 'bg',
      canonical: SITE + path,
      meta,
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
      meta,
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
      meta,
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
    meta,
    alternates: [
      { hreflang: lang,        href: SITE + path },
      { hreflang: 'x-default', href: SITE + path },
    ],
  }
}

// Намира тага, създава го ако липсва, задава content. Никога не дублира.
function upsertMeta(attr, key, content) {
  let el = document.head.querySelector('meta[' + attr + '="' + key + '"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { lang, canonical, alternates, meta: pageMeta } = resolve(pathname)

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

    // Per-route title, description и social тагове
    document.title = pageMeta.title
    upsertMeta('name', 'description', pageMeta.description)

    upsertMeta('property', 'og:title', pageMeta.title)
    upsertMeta('property', 'og:description', pageMeta.description)
    upsertMeta('property', 'og:url', canonical)

    upsertMeta('name', 'twitter:title', pageMeta.title)
    upsertMeta('name', 'twitter:description', pageMeta.description)
    upsertMeta('name', 'twitter:url', canonical)

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