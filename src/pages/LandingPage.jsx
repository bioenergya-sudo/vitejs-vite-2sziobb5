// src/pages/LandingPage.jsx

import { useState, useEffect } from "react";

const logoImg = "/FrontPage-logo.webp";

const G = {
  bg: "#0C0A07",
  card: "#161410",
  cardHov: "#1E1A14",
  border: "#2A2520",
  accent: "#E8722A",
  accentLight: "#FF9A5C",
  text: "#F5F0E8",
  textSec: "#9A8F82",
  textMuted: "#5A5047",
  white: "#FEFCF8",
};

const PHONE       = "+359889182749";
const PHONE_LABEL = "0889 182 749";
const CURR        = "€";

const SERVICE_DATA = {

  vik: {
    heroTitle:  <>ВиК ремонти<br />от <em>майстор</em><br />в София</>,
    heroSub:    "Течове, запушвания, казанчета, смесители. Идваме в същия ден — фиксирана цена, без изненади.",
    badge:      "🔧 Идваме в същия ден",
    icon:       "🔧",
    priceLabel: "ВиК ремонти",
    priceColor: "#5B9CF6",
    prices: [
      { name: "Смяна на смесител (кухня/баня)",    price: 30, unit: "фикс." },
      { name: "Смяна на тоалетна чиния/моноблок",  price: 55, unit: "фикс." },
      { name: "Отпушване на мивка/канал",           price: 30, unit: "фикс." },
      { name: "Смяна на сифон под мивка",           price: 25, unit: "фикс." },
      { name: "Ремонт на тоалетно казанче",         price: 55, unit: "фикс." },
      { name: "Ремонт на теч (подмяна уплътнение)", price: 22, unit: "фикс." },
    ],
    gallery: [
      { src: "/Монтаж_смесител.jpg", alt: "Смяна смесител",  label: "Смяна смесител · София" },
      { src: "/Монтаж_сифон.jpg",    alt: "Монтаж сифон",    label: "Монтаж сифон"           },
      { src: "/Монтаж_миялна.jpg",   alt: "Монтаж миялна",   label: "Монтаж миялна"          },
      { src: "/Монтаж_пералня.jpg",  alt: "Монтаж пералня",  label: "Монтаж пералня"         },
    ],
    faq: [
      { q: "Идвате ли в същия ден?",             a: "В повечето случаи — да. При спешност се стараем до 2–3 часа след обаждането." },
      { q: "Носите ли резервни части?",           a: "Носим най-честите части (уплътнения, сифони, аванси). По-специфични части се уточняват предварително." },
      { q: "Колко струва посещението за оглед?",  a: "Огледът е безплатен при поръчка на услуга. Само оглед без работа — 10€ транспорт." },
      { q: "Давате ли гаранция?",                 a: "Да — 6 месеца гаранция на всяка извършена услуга. При проблем — идваме безплатно." },
    ],
  },

  dovarshitelni: {
    heroTitle:  <>Довършителни<br /><em>ремонти</em><br />в София</>,
    heroSub:    "Боядисване, шпакловка, тапети, ламинат, фаянс. Малки обеми без фирма — качество на занаятчия.",
    badge:      "🏠 Малки обеми, голямо качество",
    icon:       "🏠",
    priceLabel: "Довършителни работи",
    priceColor: "#4CAF7A",
    prices: [
      { name: "Боядисване на стена (латекс)", price: 7,  unit: "кв.м." },
      { name: "Шпакловка на пукнатина/дупка", price: 10, unit: "бр."   },
      { name: "Лепене на тапети",             price: 7,  unit: "кв.м." },
      { name: "Смяна на брава/ключалка",      price: 25, unit: "фикс." },
      { name: "Поставяне на ламинат",         price: 7,  unit: "кв.м." },
      { name: "Поставяне на первази",         price: 3,  unit: "л.м."  },
      { name: "Лепене на фаянс (малък обем)", price: 30, unit: "кв.м." },
      { name: "Фугиране на плочки",           price: 7,  unit: "кв.м." },
      { name: "Дребни ремонти (по договаряне)", price: 15, unit: "час" },
    ],
    gallery: [
      { src: "/лепене_тапети.jpg",  alt: "Лепене тапети", label: "Лепене тапети · София" },
      { src: "/Монтаж_мебели1.jpg", alt: "Довършителни",  label: "Довършителни работи"   },
      { src: "/Монтаж_спалня1.jpg", alt: "Ремонт стая",   label: "Ремонт стая"           },
    ],
    faq: [
      { q: "Работите ли с малки площи?",     a: "Да — специализираме в малки обеми. Нямаме минимум на поръчката." },
      { q: "Носите ли материали?",           a: "Трудът е включен в цената. Материали (боя, лепило, фуги) се доплащат по реална цена без надценка." },
      { q: "Боядисвате ли тавани?",          a: "Да. Таванът се изчислява на кв.м. по същата тарифа като стена." },
      { q: "Колко трае лепенето на тапети?", a: "Зависи от площта и модела на тапета. Уточняваме при записването." },
    ],
  },

  montaji: {
    heroTitle:  <>Монтаж на<br /><em>уреди</em><br />в София</>,
    heroSub:    "Аспиратори, миялни, бойлери — правилен монтаж от сертифициран майстор. Гаранция на труда.",
    badge:      "🔩 Сертифициран монтаж",
    icon:       "🔩",
    priceLabel: "Монтаж на уреди",
    priceColor: "#E8722A",
    prices: [
      { name: "Монтаж на аспиратор",     price: 60, unit: "фикс." },
      { name: "Монтаж на миялна машина", price: 90, unit: "фикс." },
      { name: "Монтаж на бойлер",        price: 95, unit: "фикс." },
    ],
    gallery: [
      { src: "/Монтаж_миялна.jpg",  alt: "Монтаж миялна",  label: "Монтаж миялна · София" },
      { src: "/Монтаж_пералня.jpg", alt: "Монтаж пералня", label: "Монтаж пералня"        },
      { src: "/Монтаж_сифон.jpg",   alt: "Монтаж сифон",   label: "ВиК връзки"            },
    ],
    faq: [
      { q: "Включва ли монтажът ВиК и ел. връзки?",          a: "Да — включва всички необходими връзки. При нужда от нова инсталация се уточнява предварително." },
      { q: "Трябва ли да е доставен уредът предварително?",  a: "Да, трябва да е на място преди нашето посещение." },
      { q: "Давате ли гаранция на монтажа?",                 a: "Да — 6 месеца гаранция на труда. При проблем идваме безплатно." },
      { q: "Монтирате ли всички марки?",                     a: "Да — всички марки и модели. Носим стандартни маркучи и накрайници." },
    ],
  },

  mebeli: {
    heroTitle:  <>Сглобяване<br />на <em>мебели</em><br />в София</>,
    heroSub:    "IKEA, Jysk и всички марки. Бързо, чисто, без бъркотия — фиксирана цена от 20€.",
    badge:      "🪑 IKEA, Jysk и всички марки",
    icon:       "🪑",
    priceLabel: "Мебели & Монтаж",
    priceColor: "#4CAF7A",
    prices: [
      { name: "Сглобяване на шкаф/легло",          price: 30, unit: "фикс." },
      { name: "Сглобяване на гардероб (плъзгащи)", price: 60, unit: "фикс." },
      { name: "Монтаж на рафт/етажерка",           price: 20, unit: "фикс." },
      { name: "Монтаж на TV стойка/конзола",       price: 20, unit: "фикс." },
      { name: "Монтаж на корниз",                  price: 13, unit: "фикс." },
    ],
    gallery: [
      { src: "/Монтаж_мебели1.jpg", alt: "Сглобяване мебели", label: "Сглобяване мебели · София" },
      { src: "/Монтаж_спалня1.jpg", alt: "Монтаж спалня",     label: "Монтаж спалня"             },
      { src: "/Монтаж_спалня2.jpg", alt: "Сглобяване легло",  label: "Сглобяване легло"          },
    ],
    faq: [
      { q: "Сглобявате ли всички марки?",                        a: "Да — IKEA, Jysk, Praktiker, Mr. Bricolage и всякакви. Ако имаш инструкция — сглобяваме." },
      { q: "Трябва ли да е доставена мебелта преди да дойдете?", a: "Да, трябва да е доставена и разопакована. Ние се занимаваме само със сглобяването." },
      { q: "Изнасяте ли картоните след себе си?",                a: "Сгъваме и наредждаме картоните до изхода на входа. Чисто след нас — гарантирано." },
      { q: "Монтирате ли TV стойки на бетонна стена?",           a: "Да — с подходящи дюбели и бормашина. Уточнете материала на стената при резервацията." },
    ],
  },

  elektro: {
    heroTitle:  <>Електро<br /><em>монтаж</em><br />в София</>,
    heroSub:    "Полилеи, осветителни тела, контакти и ключове. Верифициран електротехник — фиксирана цена.",
    badge:      "💡 Верифициран електротехник",
    icon:       "💡",
    priceLabel: "Електро услуги",
    priceColor: "#E8722A",
    prices: [
      { name: "Монтаж на полилей/осветително тяло", price: 45, unit: "фикс." },
      { name: "Смяна на контакт/ключ",              price: 19, unit: "фикс." },
    ],
    gallery: [
      { src: "/Монтаж_полюлей.jpg",  alt: "Монтаж полилей",   label: "Монтаж полилей · София" },
      { src: "/Монтаж_полюлей1.jpg", alt: "Монтаж полилей 2", label: "Монтаж полилей"         },
      { src: "/Монтаж_контакт.jpg",  alt: "Смяна контакт",    label: "Смяна контакт"          },
      { src: "/Монтаж_контакт1.jpg", alt: "Монтаж контакт",   label: "Монтаж контакт"         },
    ],
    faq: [
      { q: "Нужен ли е разрешителен за монтаж на осветление?", a: "За стандартен монтаж на лампи и контакти — не. При по-сложни ел. инсталации ще те информираме предварително." },
      { q: "Носите ли материали?",                             a: "Трудът е включен в цената. Материали (кабели, конзоли) се доплащат по реална цена без надценка." },
      { q: "Работите ли в събота и неделя?",                   a: "Да — 7 дни в седмицата от 08:00 до 21:00. Без доплащане за уикенд." },
      { q: "Можете ли да монтирате smart осветление?",         a: "Да — Philips Hue, IKEA Tradfri и повечето smart системи. Уточнете модела при резервацията." },
    ],
  },

};

const REVIEWS = [
  { name: "Мартин Г.", role: "Software Engineer @ Telerik", text: "Резервирах за монтаж в 11 ч. вечерта, на следващия ден в 10 ч. майсторът беше тук. Точно на часа, чисто след себе си, фактура на имейла.", stars: 5 },
  { name: "Ива Д.",    role: "UX Designer, Sofia",          text: "Накрая платформа, която знае колко струва услугата ПРЕДИ да дойде майсторът. Никакви изненади. Препоръчвам на всички сама живеещи.", stars: 5 },
  { name: "Надя Т.",   role: "Product Manager",             text: "Проблемът се появи в петък вечерта. Резервирах за събота сутрин. Всичко мина гладко. Ще ползвам пак.", stars: 5 },
];

const UI = {
  bg: {
    prices:     "Прозрачни цени",
    pricesH:    "Фиксирани цени,",
    pricesSub:  "без скрити такси",
    pricesDesc: "Казваме цената преди да дойдем. Без изненади на място.",
    gallery:    "Нашата работа",
    galleryH:   "Резултати,",
    gallerySub: "не обещания",
    galleryDesc:"Реални снимки от реални клиенти в София.",
    reviews:    "Отзиви",
    reviewsH:   "Казват го",
    reviewsH2:  "нашите клиенти.",
    faq:        "Чести въпроси",
    faqH:       "Имаш въпрос?",
    faqH2:      "Отговаряме честно.",
    cta:        "Готов? Обади се сега",
    ctaH:       "Твоят майстор е",
    ctaH2:      "на едно повикване.",
    ctaBtn:     "Обади се сега",
    viber:      "Viber / WhatsApp",
    from:       "от",
    labour:     "само труд",
    rating:     "среден рейтинг",
    jobs:       "изпълнени задачи",
    guarantee:  "гаранция на труда",
    home:       "Начало",
    services:   "Услуги",
    contacts:   "Контакти",
    phone:      "Телефон",
  },
  en: {
    prices:     "Transparent pricing",
    pricesH:    "Fixed prices,",
    pricesSub:  "no hidden fees",
    pricesDesc: "We quote before we arrive. No surprises on site.",
    gallery:    "Our work",
    galleryH:   "Results,",
    gallerySub: "not promises",
    galleryDesc:"Real photos from real clients in Sofia.",
    reviews:    "Reviews",
    reviewsH:   "What our",
    reviewsH2:  "clients say.",
    faq:        "FAQ",
    faqH:       "Got a question?",
    faqH2:      "We answer honestly.",
    cta:        "Ready? Call us now",
    ctaH:       "Your handyman is",
    ctaH2:      "one call away.",
    ctaBtn:     "Call us now",
    viber:      "Viber / WhatsApp",
    from:       "from",
    labour:     "labour only",
    rating:     "average rating",
    jobs:       "jobs completed",
    guarantee:  "labour guarantee",
    home:       "Home",
    services:   "Services",
    contacts:   "Contact",
    phone:      "Phone",
  },
};

export default function LandingPage({ service = "vik", lang = "bg" }) {
  const data = SERVICE_DATA[service];
  const u    = UI[lang];
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!data) return null;

  const minPrice = Math.min(...data.prices.map(p => p.price));
  const galClass = data.gallery.length >= 5 ? "lp-gal-5" :
                   data.gallery.length >= 4 ? "lp-gal-4" : "lp-gal-3";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap');
    .lp * { box-sizing: border-box; margin: 0; padding: 0; }
    .lp { font-family: 'Inter', sans-serif; background: ${G.bg}; color: ${G.text}; overflow-x: hidden; }

    .lp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
    .lp-nav.sc { background: rgba(12,10,7,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid ${G.border}; padding: 12px 40px; }
    .lp-logo { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 900; color: ${G.white}; letter-spacing: -0.5px; text-decoration: none; }
    .lp-logo span { color: ${G.accent}; }
    .lp-nav-r { display: flex; align-items: center; gap: 20px; }
    .lp-nav-phone { font-size: 14px; font-weight: 700; color: ${G.text}; text-decoration: none; }
    .lp-nav-phone:hover { color: ${G.accent}; }
    .lp-nav-btn { background: ${G.accent}; color: ${G.white}; border: none; padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; text-decoration: none; transition: all 0.2s; }
    .lp-nav-btn:hover { background: ${G.accentLight}; }

    .lp-hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 0 40px; }
    .lp-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,114,42,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(232,114,42,0.06) 0%, transparent 60%); }
    .lp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(${G.border} 1px, transparent 1px), linear-gradient(90deg, ${G.border} 1px, transparent 1px); background-size: 60px 60px; opacity: 0.3; }
    .lp-hero-c { position: relative; max-width: 700px; }
    .lp-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(232,114,42,0.12); border: 1px solid rgba(232,114,42,0.3); border-radius: 30px; padding: 6px 16px; font-size: 13px; color: ${G.accentLight}; margin-bottom: 28px; font-weight: 600; }
    .lp-badge-dot { width: 7px; height: 7px; background: ${G.accent}; border-radius: 50%; animation: lp-pulse 2s infinite; }
    @keyframes lp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
    .lp-h1 { font-family: 'Poppins', sans-serif; font-size: clamp(42px, 6vw, 72px); font-weight: 900; line-height: 1.08; color: ${G.white}; margin-bottom: 20px; }
    .lp-h1 em { font-style: italic; color: ${G.accent}; }
    .lp-sub { font-size: 17px; color: ${G.textSec}; line-height: 1.7; margin-bottom: 36px; max-width: 520px; }
    .lp-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
    .btn-p { background: ${G.accent}; color: ${G.white}; border: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
    .btn-p:hover { background: ${G.accentLight}; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(232,114,42,0.35); }
    .btn-v { background: #7360F2; color: ${G.white}; border: none; padding: 16px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
    .btn-v:hover { background: #5f4edb; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(115,96,242,0.4); }
    .lp-stats { display: flex; gap: 36px; }
    .lp-sn { font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 800; color: ${G.white}; }
    .lp-sl { font-size: 12px; color: ${G.textMuted}; font-weight: 500; margin-top: 2px; }
    .lp-img-wrap { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 480px; pointer-events: none; user-select: none; }
    .lp-img { width: 100%; height: auto; opacity: 0.88; filter: drop-shadow(0 0 60px rgba(232,114,42,0.25)); }

    .lp-sec { padding: 90px 40px; max-width: 1200px; margin: 0 auto; }
    .lp-lbl { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .lp-ttl { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: ${G.white}; margin-bottom: 14px; line-height: 1.15; }
    .lp-desc { font-size: 16px; color: ${G.textSec}; line-height: 1.7; max-width: 520px; }

    .lp-price-table { margin-top: 50px; border: 1px solid ${G.border}; border-radius: 16px; overflow: hidden; max-width: 580px; }
    .lp-ph { padding: 20px 28px; background: rgba(255,255,255,0.03); border-bottom: 1px solid ${G.border}; display: flex; align-items: center; gap: 14px; }
    .lp-ph-icon { font-size: 26px; }
    .lp-ph-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 800; color: ${G.white}; }
    .lp-ph-from { font-size: 12px; color: ${G.textMuted}; margin-top: 2px; }
    .lp-pr { display: flex; justify-content: space-between; align-items: center; padding: 14px 28px; border-bottom: 1px solid ${G.border}; transition: background 0.15s; }
    .lp-pr:last-child { border-bottom: none; }
    .lp-pr:hover { background: ${G.cardHov}; }
    .lp-pr-name { font-size: 14px; color: ${G.text}; }
    .lp-pr-val { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 800; }
    .lp-pr-unit { font-size: 11px; color: ${G.textMuted}; margin-left: 4px; font-family: 'Inter', sans-serif; font-weight: 400; }

    .lp-gal-4 { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 220px 220px; gap: 12px; margin-top: 50px; }
    .lp-gal-4 .lp-gi:first-child { grid-row: 1 / 3; }
    .lp-gal-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 50px; }
    .lp-gal-5 { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 220px 220px; gap: 12px; margin-top: 50px; }
    .lp-gal-5 .lp-gi:first-child { grid-row: 1 / 3; }
    .lp-gi { border-radius: 12px; overflow: hidden; background: ${G.card}; border: 1px solid ${G.border}; position: relative; cursor: pointer; transition: border-color 0.2s; min-height: 140px; }
    .lp-gi:hover { border-color: rgba(232,114,42,0.4); }
    .lp-gi img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
    .lp-gi:hover img { transform: scale(1.04); }
    .lp-glbl { position: absolute; bottom: 12px; left: 12px; background: rgba(12,10,7,0.75); color: ${G.textSec}; font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; backdrop-filter: blur(4px); }

    .lp-rv { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 50px; }
    .lp-rc { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
    .lp-rc:hover { border-color: rgba(232,114,42,0.25); }
    .lp-rs { color: #F5A623; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
    .lp-rt { font-size: 14px; color: ${G.textSec}; line-height: 1.8; margin-bottom: 18px; font-style: italic; }
    .lp-ra { display: flex; align-items: center; gap: 12px; }
    .lp-rav { width: 40px; height: 40px; background: rgba(232,114,42,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: ${G.accent}; flex-shrink: 0; }
    .lp-rn { font-size: 14px; font-weight: 700; color: ${G.white}; }
    .lp-rr { font-size: 12px; color: ${G.textMuted}; margin-top: 2px; }

    .lp-faq { margin-top: 50px; display: flex; flex-direction: column; gap: 12px; max-width: 760px; }
    .lp-fi { border: 1px solid ${G.border}; border-radius: 12px; overflow: hidden; transition: border-color 0.2s; }
    .lp-fi.open { border-color: rgba(232,114,42,0.35); }
    .lp-fq { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; cursor: pointer; font-size: 15px; font-weight: 600; color: ${G.text}; background: ${G.card}; border: none; width: 100%; text-align: left; gap: 16px; transition: background 0.15s; }
    .lp-fq:hover { background: ${G.cardHov}; }
    .lp-ft { width: 26px; height: 26px; border-radius: 50%; border: 1px solid ${G.border}; display: flex; align-items: center; justify-content: center; font-size: 16px; color: ${G.textSec}; flex-shrink: 0; transition: all 0.15s; line-height: 1; font-style: normal; }
    .lp-fi.open .lp-ft { background: ${G.accent}; border-color: ${G.accent}; color: ${G.white}; }
    .lp-fa { padding: 0 24px 18px; font-size: 14px; color: ${G.textSec}; line-height: 1.75; background: ${G.card}; }

    .lp-cta { background: linear-gradient(135deg, rgba(232,114,42,0.15) 0%, rgba(232,114,42,0.05) 100%); border: 1px solid rgba(232,114,42,0.2); border-radius: 20px; padding: 60px 50px; margin: 0 40px 90px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
    .lp-cta-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .lp-cta-title { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 800; color: ${G.white}; margin-bottom: 10px; line-height: 1.15; }
    .lp-cta-sub { font-size: 16px; color: ${G.textSec}; }
    .lp-cta-acts { display: flex; gap: 14px; flex-wrap: wrap; }

    .lp-foot { border-top: 1px solid ${G.border}; padding: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
    .lp-foot-logo { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 900; color: ${G.white}; text-decoration: none; }
    .lp-foot-logo span { color: ${G.accent}; }
    .lp-foot-note { font-size: 13px; color: ${G.textMuted}; }
    .lp-foot-links { display: flex; gap: 24px; }
    .lp-foot-link { font-size: 13px; color: ${G.textSec}; text-decoration: none; cursor: pointer; transition: color 0.2s; }
    .lp-foot-link:hover { color: ${G.accent}; }

    .lp-float { position: fixed; bottom: 28px; right: 28px; z-index: 99; display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
    .lp-fv { width: 56px; height: 56px; background: #7360F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 8px 30px rgba(115,96,242,0.45); transition: all 0.2s; border: none; text-decoration: none; }
    .lp-fv:hover { transform: scale(1.1); }
    .lp-fw { width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 8px 30px rgba(37,211,102,0.4); transition: all 0.2s; border: none; }
    .lp-fw:hover { transform: scale(1.1); }
    .lp-fp { width: 48px; height: 48px; background: ${G.accent}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; cursor: pointer; box-shadow: 0 8px 25px rgba(232,114,42,0.4); transition: all 0.2s; border: none; text-decoration: none; }
    .lp-fp:hover { transform: scale(1.1); }

    @media (max-width: 768px) {
      .lp-img-wrap { display: none; }
      .lp-hero { padding: 100px 22px 60px; min-height: auto; }
      .lp-nav { padding: 16px 22px; }
      .lp-nav.sc { padding: 10px 22px; }
      .lp-sec { padding: 56px 22px; }
      .lp-gal-4, .lp-gal-5 { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
      .lp-gal-4 .lp-gi:first-child, .lp-gal-5 .lp-gi:first-child { grid-row: auto; grid-column: 1 / 3; min-height: 220px; }
      .lp-cta { margin: 0 22px 60px; padding: 40px 28px; flex-direction: column; }
      .lp-foot { padding: 28px 22px; flex-direction: column; align-items: flex-start; }
      .lp-stats { gap: 20px; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="lp">

        {/* NAVBAR */}
        <nav className={`lp-nav${scrolled ? " sc" : ""}`}>
          <a href="/" className="lp-logo">Handyman<span>Sofia</span></a>
          <div className="lp-nav-r">
            <a href={`tel:${PHONE}`} className="lp-nav-phone">📞 {PHONE_LABEL}</a>
            <a href={`viber://chat?number=${PHONE}`} className="lp-nav-btn">{u.viber}</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero-bg" />
          <div className="lp-hero-grid" />
          <div className="lp-hero-c">
            <div className="lp-badge">
              <span className="lp-badge-dot" />{data.badge}
            </div>
            <h1 className="lp-h1">{data.heroTitle}</h1>
            <p className="lp-sub">{data.heroSub}</p>
            <div className="lp-actions">
              <a href={`tel:${PHONE}`} className="btn-p">📞 {PHONE_LABEL}</a>
              <a href={`viber://chat?number=${PHONE}`} className="btn-v">🟣 {u.viber}</a>
            </div>
            <div className="lp-stats">
              <div><div className="lp-sn">4.9★</div><div className="lp-sl">{u.rating}</div></div>
              <div><div className="lp-sn">500+</div><div className="lp-sl">{u.jobs}</div></div>
              <div><div className="lp-sn">30 дни</div><div className="lp-sl">{u.guarantee}</div></div>
            </div>
          </div>
          <div className="lp-img-wrap">
            <img src={logoImg} alt="HandymanSofia" className="lp-img" />
          </div>
        </section>

        {/* PRICES */}
        <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
          <div className="lp-sec">
            <div className="lp-lbl">{u.prices}</div>
            <div className="lp-ttl">{u.pricesH}<br />{u.pricesSub}</div>
            <p className="lp-desc">{u.pricesDesc}</p>
            <div className="lp-price-table">
              <div className="lp-ph">
                <span className="lp-ph-icon">{data.icon}</span>
                <div>
                  <div className="lp-ph-title">{data.priceLabel}</div>
                  <div className="lp-ph-from">{u.from} {minPrice}{CURR} · {u.labour}</div>
                </div>
              </div>
              {data.prices.map((item, i) => (
                <div className="lp-pr" key={i}>
                  <span className="lp-pr-name">{item.name}</span>
                  <span>
                    <span className="lp-pr-val" style={{ color: data.priceColor }}>{item.price}{CURR}</span>
                    <span className="lp-pr-unit">/ {item.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div className="lp-sec">
          <div className="lp-lbl">{u.gallery}</div>
          <div className="lp-ttl">{u.galleryH}<br />{u.gallerySub}</div>
          <p className="lp-desc">{u.galleryDesc}</p>
          <div className={galClass}>
            {data.gallery.map((item, i) => (
              <div className="lp-gi" key={i}>
                <img src={item.src} alt={item.alt} loading={i === 0 ? "eager" : "lazy"} />
                <div className="lp-glbl">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
          <div className="lp-sec">
            <div className="lp-lbl">{u.reviews}</div>
            <div className="lp-ttl">{u.reviewsH}<br />{u.reviewsH2}</div>
            <div className="lp-rv">
              {REVIEWS.map((r, i) => (
                <div className="lp-rc" key={i}>
                  <div className="lp-rs">{"★".repeat(r.stars)}</div>
                  <div className="lp-rt">"{r.text}"</div>
                  <div className="lp-ra">
                    <div className="lp-rav">{r.name[0]}</div>
                    <div>
                      <div className="lp-rn">{r.name}</div>
                      <div className="lp-rr">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="lp-sec">
          <div className="lp-lbl">{u.faq}</div>
          <div className="lp-ttl">{u.faqH}<br />{u.faqH2}</div>
          <div className="lp-faq">
            {data.faq.map((item, i) => (
              <div className={`lp-fi${openFaq === i ? " open" : ""}`} key={i}>
                <button className="lp-fq" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <em className="lp-ft">{openFaq === i ? "−" : "+"}</em>
                </button>
                {openFaq === i && <div className="lp-fa">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="lp-cta">
          <div>
            <div className="lp-cta-tag">{u.cta}</div>
            <h2 className="lp-cta-title">{u.ctaH}<br />{u.ctaH2}</h2>
            <p className="lp-cta-sub">HandymanSofia.com · София · {PHONE_LABEL}</p>
          </div>
          <div className="lp-cta-acts">
            <a href={`tel:${PHONE}`} className="btn-p">📞 {u.ctaBtn}</a>
            <a href={`viber://chat?number=${PHONE}`} className="btn-v">🟣 Viber</a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="lp-foot">
          <a href="/" className="lp-foot-logo">Handyman<span>Sofia</span>
            <span style={{ fontSize: 11, color: G.textMuted, fontFamily: "Inter", fontWeight: 400, marginLeft: 8 }}>.com</span>
          </a>
          <div className="lp-foot-links">
            <a href="/" className="lp-foot-link">{u.home}</a>
            <span className="lp-foot-link">{u.services}</span>
            <span className="lp-foot-link">{u.contacts}</span>
          </div>
          <div className="lp-foot-note">© 2026 HandymanSofia.com · ЕИК 000000000</div>
        </footer>

        {/* FLOATING BUTTONS */}
        <div className="lp-float">
          <a href={`viber://chat?number=${PHONE}`} className="lp-fv" title="Viber">🟣</a>
          <button className="lp-fw" title="WhatsApp">💬</button>
          <a href={`tel:${PHONE}`} className="lp-fp" title={u.phone}>📞</a>
        </div>

      </div>
    </>
  );
}
