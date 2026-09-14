import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Маршрутите, SEO_META и hreflang логиката живеят в routes.mjs — същите данни
// генерират суровия HTML при build (scripts/static-pages.mjs). Тук само се
// прилагат при навигация в браузъра.
import { resolve } from './routes.mjs'

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

      // Пътят се чете при клика, не при закачането на listener-а: този useEffect
      // има празен dependency масив и би замразил pathname от първото зареждане.
      const page = window.location.pathname

      // Контактните намерения се разпознават по href, не по клас - така всяка
      // нова телефонна/Viber/WhatsApp връзка се брои, без да се помни клас.
      // Проверките са взаимно изключващи се: един клик = едно събитие.

      // Телефон
      if (t.closest('a[href^="tel:"]')) {
        window.gtag('event', 'phone_click', {
          event_category: 'conversion',
          event_label: page,
        })
        return
      }
      // Viber
      if (t.closest('a[href^="viber:"]')) {
        window.gtag('event', 'viber_click', {
          event_category: 'conversion',
          event_label: page,
        })
        return
      }
      // WhatsApp
      if (t.closest('a[href*="wa.me"]')) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'conversion',
          event_label: page,
        })
        return
      }
      // CTA бутони (Book now / Резервирай горе). btn-p се ползва само от
      // телефонни връзки, които вече излязоха горе - оставен е за бъдещи
      // не-контактни бутони със същия клас.
      if (t.closest('.nav-cta') || t.closest('.sticky-cta-btn') || t.closest('.btn-primary') || t.closest('.btn-p')) {
        window.gtag('event', 'cta_click', {
          event_category: 'conversion',
          event_label: page,
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}