// Генерира статичните HTML входове за маршрутите, които иначе получаваха
// общия български index.html: /, /za-nas, /en и петте /en/* услуги.
//
// Защо: Google определя езика по суровия документ при обхождане, не по
// JS-а на SeoManager. EN маршрутите сервираха lang="bg", български title,
// JSON-LD и скрит блок — клиенти на английски кацаха на българската страница.
//
// title/description/canonical/hreflang идват от src/seo/routes.mjs — същите
// данни, които SeoManager прилага в браузъра. Тук е само съдържанието, което
// не съществува там: JSON-LD и скритият SEO блок.
//
// Пуска се автоматично от `npm run build` (преди vite build). Генерираните
// файлове не се редактират на ръка — промените се правят тук или в routes.mjs.
// Цените в блоковете следват BRAIN/цени.md и петте BG категорийни .html.

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, SEO_META, resolve } from '../src/seo/routes.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PHONE = '+359889182749'
const OG_IMAGE = SITE + '/og-banner.jpg'

const business = (lang) => ({
  '@type': 'HomeAndConstructionBusiness',
  name: 'HandymanSofia',
  url: SITE,
  telephone: PHONE,
  areaServed: { '@type': 'City', name: lang === 'en' ? 'Sofia' : 'София' },
})

const service = (lang, path, name, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': SITE + path,
  name,
  description,
  provider: business(lang),
  areaServed: { '@type': 'City', name: lang === 'en' ? 'Sofia' : 'София' },
  availableLanguage: ['English', 'Bulgarian'],
  priceRange: '€€',
})

const localBusiness = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': SITE + '/#business',
  name: 'HandymanSofia',
  url: SITE,
  logo: SITE + '/FrontPage-logo.webp',
  image: OG_IMAGE,
  description: lang === 'en'
    ? 'Small repairs, installations and home services in Sofia by English-speaking, verified professionals. Fixed prices and a 30-day labour guarantee.'
    : 'Професионални дребни ремонти, монтажи и домашни услуги в София. Верифицирани майстори, фиксирани цени, 30-дневна гаранция на труда.',
  telephone: PHONE,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  areaServed: { '@type': 'City', name: lang === 'en' ? 'Sofia' : 'София' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: lang === 'en' ? 'Sofia' : 'София',
    addressRegion: lang === 'en' ? 'Sofia City' : 'София-град',
    addressCountry: 'BG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'customer service',
    availableLanguage: ['Bulgarian', 'English'],
    areaServed: 'BG',
  },
  sameAs: [SITE],
})

// Скритият блок за краулери — по един на страница, само на нейния език.
const block = ({ h1, intro, listTitle, items, footer }) => [
  `    <h1>${h1}</h1>`,
  `    <p>${intro}</p>`,
  `    <h2>${listTitle}</h2>`,
  '    <ul>',
  ...items.map(i => `      <li>${i}</li>`),
  '    </ul>',
  `    <p>${footer}</p>`,
].join('\n')

const PAGES = [
  {
    path: '/',
    file: 'index.html',
    jsonld: localBusiness('bg'),
    seo: {
      h1: 'HandymanSofia – Дребни ремонти и монтажи в София',
      intro: 'Верифицирани майстори, фиксирани цени, 30-дневна гаранция.',
      listTitle: 'Услуги',
      items: [
        'Монтаж на осветление, полилеи, контакти',
        'Сглобяване на мебели, монтаж на корнизи, рафтове',
        'ВиК ремонти — смесители, течове, тоалетни',
        'Монтаж на бойлер, миялна, аспиратор',
        'Боядисване, шпакловка, ламинат',
      ],
      footer: 'София. Тел: +359 889 182 749',
    },
  },
  {
    path: '/za-nas',
    file: 'za-nas.html',
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': SITE + '/za-nas',
      url: SITE + '/za-nas',
      name: 'За нас — HandymanSofia',
      inLanguage: 'bg',
      about: business('bg'),
    },
    seo: {
      h1: 'За нас — HandymanSofia',
      intro: 'Създадохме HandymanSofia, защото домашните ремонти не трябва да означават изгубено време, неясни цени и чакане с часове. Работим с проверени майстори, фиксирани цени и ясна организация — от заявката до завършения ремонт.',
      listTitle: 'Как работим',
      items: [
        'Точен час — идваме в уговореното време',
        'Ясна цена — казваме цената преди да дойдем',
        'Доверие — проверени майстори, гаранция на всяка услуга',
        'Чисто след нас — прибираме и оставяме дома в ред',
      ],
      footer: 'София. Тел: +359 889 182 749',
    },
  },
  {
    path: '/en',
    file: 'en.html',
    jsonld: localBusiness('en'),
    seo: {
      h1: 'HandymanSofia – English-speaking handyman in Sofia',
      intro: 'Verified professionals, fixed prices you see before we arrive, 30-day guarantee. English spoken, invoice provided.',
      listTitle: 'Services',
      items: [
        'Electrical: chandeliers, light fixtures, sockets and switches',
        'Furniture assembly, curtain rails and shelves',
        'Plumbing repairs: taps, leaks, toilets',
        'Appliance installation: boilers, dishwashers, cooker hoods',
        'Home finishing: painting, plastering, laminate',
      ],
      footer: 'Sofia. Phone: +359 889 182 749',
    },
  },
  {
    path: '/en/plumbing-repairs-sofia',
    file: 'en/plumbing-repairs-sofia.html',
    jsonld: service('en', '/en/plumbing-repairs-sofia', 'Plumbing repairs — HandymanSofia',
      'Tap replacement, leak repair, drain unblocking, toilet replacement and boiler installation in Sofia'),
    seo: {
      h1: 'Plumbing repairs in Sofia — English-speaking plumber',
      intro: 'Verified plumber for home plumbing repairs in Sofia — same-day service.',
      listTitle: 'Services and prices',
      items: [
        'Tap / mixer replacement (kitchen or bathroom) — €45',
        'Leak repair (seal replacement) — €60',
        'Sink / drain unblocking — €80',
        'Under-sink trap replacement — €39',
        'Toilet bowl / monoblock replacement — €55',
        'Toilet cistern repair — €55',
        'Boiler / water heater installation — €130',
      ],
      footer: 'Sofia. Phone: +359 889 182 749. Fixed prices, 30-day guarantee on all work.',
    },
  },
  {
    path: '/en/home-finishing-sofia',
    file: 'en/home-finishing-sofia.html',
    jsonld: service('en', '/en/home-finishing-sofia', 'Home finishing — HandymanSofia',
      'Painting, plastering, tiling, laminate flooring and wallpaper in Sofia'),
    seo: {
      h1: 'Home finishing and repairs in Sofia — English-speaking handyman',
      intro: 'Verified handyman for finishing work — painting, plastering, tiling and laminate. Small jobs welcome, no contractor overhead.',
      listTitle: 'Services and prices',
      items: [
        'Wall painting (emulsion) — €8/sq.m.',
        'Crack / hole filling — €15',
        'Wallpaper hanging — €7/sq.m.',
        'Lock / door lock replacement — €19',
        'Laminate flooring — €5/sq.m.',
        'Skirting board installation — €3/lin.m.',
        'Wall tiling (small area) — €35/sq.m.',
        'Tile grouting — €7/sq.m.',
        'General repairs (negotiable) — €20/hr.',
      ],
      footer: 'Sofia. Phone: +359 889 182 749. Fixed prices, 30-day guarantee on all work.',
    },
  },
  {
    path: '/en/appliance-installation-sofia',
    file: 'en/appliance-installation-sofia.html',
    jsonld: service('en', '/en/appliance-installation-sofia', 'Appliance installation — HandymanSofia',
      'Boiler, dishwasher, cooker hood and light fixture installation in Sofia'),
    seo: {
      h1: 'Appliance installation in Sofia — boiler, dishwasher, cooker hood',
      intro: 'Verified technician for correct installation of home appliances — labour guaranteed.',
      listTitle: 'Services and prices',
      items: [
        'Boiler / water heater installation — €130',
        'Dishwasher installation — €90',
        'Cooker hood installation — €70',
        'Chandelier / light fixture installation — €37',
      ],
      footer: 'Sofia. Phone: +359 889 182 749. Fixed prices, 30-day guarantee on all installations.',
    },
  },
  {
    path: '/en/furniture-assembly-sofia',
    file: 'en/furniture-assembly-sofia.html',
    jsonld: service('en', '/en/furniture-assembly-sofia', 'Furniture assembly — HandymanSofia',
      'Assembly of cabinets, wardrobes and beds, and mounting of shelves, curtain rails and TV brackets in Sofia'),
    seo: {
      h1: 'Furniture assembly in Sofia — IKEA, Jysk and all brands',
      intro: 'Verified handyman for fast, careful assembly of furniture from any store — IKEA, Jysk and others.',
      listTitle: 'Services and prices',
      items: [
        'Cabinet / bed assembly — €35',
        'Sliding wardrobe assembly — €60',
        'Shelf / shelving unit mounting — €20',
        'TV bracket / wall mount — €20',
        'Curtain rail mounting — €19/lin.m.',
      ],
      footer: 'Sofia. Phone: +359 889 182 749. Fixed prices, 30-day guarantee on all assembly.',
    },
  },
  {
    path: '/en/electrical-installation-sofia',
    file: 'en/electrical-installation-sofia.html',
    jsonld: service('en', '/en/electrical-installation-sofia', 'Electrical services — HandymanSofia',
      'Installation of chandeliers, light fixtures, sockets and switches in Sofia'),
    seo: {
      h1: 'Electrical installation in Sofia — English-speaking electrician',
      intro: 'Verified electrician for small and mid-size electrical jobs in Sofia — light fixtures, switches, LED lighting.',
      listTitle: 'Services and prices',
      items: [
        'Chandelier / light fixture installation — €37',
        'Socket / switch replacement — €11',
        'TV bracket / wall mount — €20',
      ],
      footer: 'Sofia. Phone: +359 889 182 749. Fixed prices, 30-day guarantee on all work.',
    },
  },
  {
    path: '/en/seasonal-tyre-change-sofia',
    file: 'en/seasonal-tyre-change-sofia.html',
    jsonld: service('en', '/en/seasonal-tyre-change-sofia', 'Seasonal tyre change - HandymanSofia',
      'Seasonal tyre change in Sofia with collection and return of your car from your address'),
    seo: {
      h1: 'Seasonal tyre change in Sofia - we collect and return your car',
      intro: 'No time to change your tyres? We collect your car from your address at a time that suits you, take it to a tyre shop and bring it back.',
      listTitle: 'Service and price',
      items: [
        'Seasonal tyre change, car collected and returned - EUR 59 (our service fee)',
        'Collection from your address at a time that suits you',
        'Return to the same address, key handed back in person',
        'Tyre shop fee for fitting and balancing paid separately, at cost',
      ],
      footer: 'Sofia. Phone: +359 889 182 749. Fixed price, 7 days a week, 08:00-21:00.',
    },
  },
]

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

const jsonLd = (obj) => JSON.stringify(obj, null, 2)
  .replace(/</g, '\\u003c')
  .split('\n').map(l => '  ' + l).join('\n')

function render(page) {
  if (!SEO_META[page.path]) throw new Error(`Няма SEO_META за ${page.path}`)
  const { lang, canonical, meta, alternates } = resolve(page.path)
  const title = esc(meta.title)
  const description = esc(meta.description)

  // data-seo="hreflang": SeoManager маха и пресъздава точно тези тагове при
  // навигация, така че статичните не се дублират след hydration.
  const hreflang = alternates
    .map(a => `  <link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" data-seo="hreflang" />`)
    .join('\n')

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <!-- GENERATED by scripts/static-pages.mjs (data: src/seo/routes.mjs).
       Do not edit by hand — overwritten on every npm run build.
       (English on purpose: EN documents must not contain Cyrillic.) -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta http-equiv="Content-Language" content="${lang}" />

  <!-- Canonical + hreflang -->
  <link rel="canonical" href="${canonical}" />
${hreflang}

  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}" />
  <meta name="description" content="${description}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'bg_BG'}" />
  <meta property="og:site_name" content="HandymanSofia" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonical}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />

  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="/FrontPage-logo.webp" />
  <link rel="apple-touch-icon" href="/FrontPage-logo.webp" />

  <!-- Schema.org -->
  <script type="application/ld+json">
${jsonLd(page.jsonld)}
  </script>

  <!-- Google Analytics GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PJ767WGHLF"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PJ767WGHLF', { send_page_view: false });
  </script>

</head>
<body>
  <div id="root"></div>

  <!-- Static SEO content for crawlers (${lang === 'en' ? 'English' : 'Bulgarian'} only) -->
  <div style="display:none;" aria-hidden="true">
${block(page.seo)}
  </div>

  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`
}

for (const page of PAGES) {
  const html = render(page)
  // Предпазител срещу точно този бъг: EN документ с кирилица чупи build-а.
  if (resolve(page.path).lang === 'en' && /[Ѐ-ӿ]/.test(html)) {
    throw new Error(`Кирилица в EN страница ${page.path}`)
  }
  const out = join(ROOT, page.file)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  console.log(`static-pages: ${page.path} -> ${page.file}`)
}
