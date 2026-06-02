import { useState, useEffect, useRef } from "react";

const logoImg = "/FrontPage-logo.webp";

const SERVICES = [
  // 🔧 ВиК
  { id: 1,  cat: "🔧 ВиК", icon: "🔧", name: "Смяна на смесител (кухня/баня)", price: 30, unit: "фикс.", popular: true },
  { id: 2,  cat: "🔧 ВиК", icon: "🔧", name: "Смяна на тоалетна чиния/моноблок", price: 55, unit: "фикс.", popular: false },
  { id: 3,  cat: "🔧 ВиК", icon: "🔧", name: "Отпушване на мивка/канал", price: 30, unit: "фикс.", popular: false },
  { id: 4,  cat: "🔧 ВиК", icon: "🔧", name: "Смяна на сифон под мивка", price: 25, unit: "фикс.", popular: true },
  { id: 5,  cat: "🔧 ВиК", icon: "🔧", name: "Ремонт на тоалетно казанче", price: 55, unit: "фикс.", popular: true },
  { id: 6,  cat: "🔧 ВиК", icon: "🔧", name: "Ремонт на теч (уплътнение)", price: 22, unit: "фикс.", popular: false },
  // 🏠 Довършителни
  { id: 7,  cat: "🏠 Довършителни", icon: "🏠", name: "Боядисване на стена (латекс)", price: 7,  unit: "кв.м.", popular: false },
  { id: 8,  cat: "🏠 Довършителни", icon: "🏠", name: "Шпакловка на пукнатина/дупка", price: 10, unit: "бр.",   popular: false },
  { id: 9,  cat: "🏠 Довършителни", icon: "🏠", name: "Лепене на тапети", price: 7,  unit: "кв.м.", popular: true },
  { id: 10, cat: "🏠 Довършителни", icon: "🏠", name: "Смяна на брава/ключалка", price: 25, unit: "фикс.", popular: false },
  { id: 11, cat: "🏠 Довършителни", icon: "🏠", name: "Поставяне на ламинат", price: 7,  unit: "кв.м.", popular: false },
  { id: 12, cat: "🏠 Довършителни", icon: "🏠", name: "Поставяне на первази", price: 3,  unit: "л.м.",  popular: false },
  { id: 13, cat: "🏠 Довършителни", icon: "🏠", name: "Лепене на фаянс (малък обем)", price: 30, unit: "кв.м.", popular: false },
  { id: 14, cat: "🏠 Довършителни", icon: "🏠", name: "Фугиране на плочки", price: 7,  unit: "кв.м.", popular: false },
  { id: 15, cat: "🏠 Довършителни", icon: "🏠", name: "Дребни ремонти (по договаряне)", price: 15, unit: "час",  popular: true }, // НОВО
  // 🔩 Монтажи
  { id: 16, cat: "🔩 Монтажи", icon: "🔩", name: "Монтаж на аспиратор", price: 60, unit: "фикс.", popular: false },
  { id: 17, cat: "🔩 Монтажи", icon: "🔩", name: "Монтаж на миялна машина", price: 90, unit: "фикс.", popular: false },
  { id: 18, cat: "🔩 Монтажи", icon: "🔩", name: "Монтаж на бойлер", price: 95, unit: "фикс.", popular: true },
  // 🪑 Мебели
  { id: 19, cat: "🪑 Мебели", icon: "🪑", name: "Сглобяване на шкаф/легло", price: 30, unit: "фикс.", popular: true },
  { id: 20, cat: "🪑 Мебели", icon: "🪑", name: "Сглобяване на гардероб (плъзгащи)", price: 60, unit: "фикс.", popular: false },
  { id: 21, cat: "🪑 Мебели", icon: "🪑", name: "Монтаж на рафт/етажерка", price: 20, unit: "фикс.", popular: false },
  { id: 22, cat: "🪑 Мебели", icon: "🪑", name: "Монтаж на TV стойка/конзола", price: 20, unit: "фикс.", popular: true },
  { id: 23, cat: "🪑 Мебели", icon: "🪑", name: "Монтаж на корниз", price: 19, unit: "л.м.", popular: false }, // НОВО
  // 💡 Електро
  { id: 24, cat: "💡 Електро", icon: "💡", name: "Монтаж на полилей/осветително тяло", price: 45, unit: "фикс.", popular: true },
  { id: 25, cat: "💡 Електро", icon: "💡", name: "Смяна на контакт/ключ", price: 19, unit: "фикс.", popular: true },
];

const REVIEWS = [
  { name: "Мартин Г.", role: "Software Engineer @ Telerik", text: "Резервирах за монтаж на полюлей в 11 ч. вечерта, на следващия ден в 10 ч. майсторът беше тук. Точно на часа, чисто след себе си, фактура на имейла.", stars: 5, service: "Монтаж полюлей" },
  { name: "Ива Д.", role: "UX Designer, Sofia", text: "Накрая платформа, която знае колко струва услугата ПРЕДИ да дойде майсторът. Никакви изненади. Препоръчвам на всички сама живеещи.", stars: 5, service: "Миялна машина" },
  { name: "Александър П.", role: "CTO @ FinTech startup", text: "Смяна на гуми до офиса - не съм губил дори 5 минути работно време. Момчетата дойдоха докато аз бях в среща. Страхотно!", stars: 5, service: "Смяна на гуми" },
  { name: "Надя Т.", role: "Product Manager", text: "Казанчето ми се счупи в петък вечерта. Резервирах за събота сутрин, платих онлайн. Всичко мина гладко. Ще ползвам пак.", stars: 5, service: "Ремонт казанче" },
];

const STEPS = [
  { n: "01", title: "Избери услуга", desc: "Виждаш цената преди да продължиш. Никакви изненади.", icon: "📋" },
  { n: "02", title: "Избери дата и час", desc: "Виждаш реалното свободно време на верифицираните ни майстори.", icon: "📅" },
  { n: "03", title: "Потвърди и плати", desc: "Онлайн или в брой. Майстор при теб в договорения час.", icon: "✅" },
];

const TRUST = [
  { icon: "🛡️", title: "30-дневна гаранция", desc: "Нещо не е наред след ремонта? Поправяме безплатно." },
  { icon: "✔️", title: "Верифицирани майстори", desc: "Всеки майстор е лично проверен, осигурен и с рейтинг." },
  { icon: "🧾", title: "Фактура винаги", desc: "Издаваме фактура при всяка услуга. Без сива икономика." },
  { icon: "⏰", title: "Точен час", desc: "Не 'между 9 и 17 ч.' - идваме в точния уговорен час." },
];

const CATS = ["Всички", "🔧 ВиК", "🏠 Довършителни", "🔩 Монтажи", "🪑 Мебели", "💡 Електро"];

// Heights: desktop sticky bar = 54px, mobile sticky bar = 64px + safe-area
const STICKY_H_DESKTOP = 54;
const STICKY_H_MOBILE = 64;

export default function App() {
  const [activeCat, setActiveCat] = useState("Всички");
  const [urgent, setUrgent] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [booked, setBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const bookRef = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filtered = activeCat === "Всички" ? SERVICES : SERVICES.filter(s => s.cat === activeCat);
  const urgentMultiplier = urgent ? 1.5 : 1;

  const openBooking = (svc) => {
    setSelectedService(svc);
    setBookingStep(1);
    setBooked(false);
    setSelectedDate(null);
    setSelectedHour(null);
    setShowPriceInfo(false);
    setShowModal(true);
  };

  const dates = ["Днес", "Утре", "Ср 18", "Чет 19", "Пет 20", "Съб 21"];
  const hours = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const confirmBooking = () => {
    setBooked(true);
    setBookingStep(3);
  };

  const G = {
    bg: "#0C0A07",
    card: "#161410",
    cardHov: "#1E1A14",
    border: "#2A2520",
    accent: "#E8722A",
    accentDark: "#C05A18",
    accentLight: "#FF9A5C",
    text: "#F5F0E8",
    textSec: "#9A8F82",
    textMuted: "#5A5047",
    green: "#4CAF7A",
    white: "#FEFCF8",
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', sans-serif;
      background: ${G.bg};
      color: ${G.text};
      overflow-x: hidden;
      padding-bottom: ${STICKY_H_DESKTOP}px;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${G.bg}; }
    ::-webkit-scrollbar-thumb { background: ${G.accent}; border-radius: 3px; }

    /* ─── NAVBAR ─── */
    .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
    .navbar.scrolled { background: rgba(12,10,7,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid ${G.border}; padding: 12px 40px; }
    .logo { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 900; color: ${G.white}; letter-spacing: -0.5px; }
    .logo span { color: ${G.accent}; }
    .nav-links { display: flex; align-items: center; gap: 32px; }
    .nav-link { font-size: 14px; color: ${G.textSec}; text-decoration: none; cursor: pointer; transition: color 0.2s; font-weight: 500; }
    .nav-link:hover { color: ${G.text}; }
    .nav-lang-btn { background: none; border: 1px solid ${G.border}; color: ${G.textSec}; padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
    .nav-lang-btn:hover { border-color: ${G.accent}; color: ${G.text}; }
    .nav-cta { background: ${G.accent}; color: ${G.white}; border: none; padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .nav-cta:hover { background: ${G.accentLight}; transform: translateY(-1px); }
    .phone-link { font-size: 14px; color: ${G.text}; font-weight: 600; letter-spacing: 0.5px; }

    /* ─── HERO ─── */
    .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 0 40px; }
    .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,114,42,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(232,114,42,0.06) 0%, transparent 60%); }
    .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(${G.border} 1px, transparent 1px), linear-gradient(90deg, ${G.border} 1px, transparent 1px); background-size: 60px 60px; opacity: 0.3; }
    .hero-content { position: relative; max-width: 700px; }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(232,114,42,0.12); border: 1px solid rgba(232,114,42,0.3); border-radius: 30px; padding: 6px 16px; font-size: 13px; color: ${G.accentLight}; margin-bottom: 28px; font-weight: 600; }
    .hero-badge-dot { width: 7px; height: 7px; background: ${G.accent}; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
    .hero-title { font-family: 'Poppins', sans-serif; font-size: clamp(42px, 6vw, 72px); font-weight: 900; line-height: 1.08; color: ${G.white}; margin-bottom: 20px; }
    .hero-title em { font-style: italic; color: ${G.accent}; }
    .hero-sub { font-size: 17px; color: ${G.textSec}; line-height: 1.7; margin-bottom: 36px; max-width: 520px; font-weight: 400; }
    .hero-sub strong { color: ${G.text}; font-weight: 600; }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
    .btn-primary { background: ${G.accent}; color: ${G.white}; border: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
    .btn-primary:hover { background: ${G.accentLight}; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(232,114,42,0.35); }
    .btn-secondary { background: transparent; color: ${G.text}; border: 1px solid ${G.border}; padding: 16px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .btn-secondary:hover { border-color: ${G.accent}; color: ${G.accent}; }
    .hero-stats { display: flex; gap: 36px; }
    .stat-num { font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 800; color: ${G.white}; }
    .stat-label { font-size: 12px; color: ${G.textMuted}; font-weight: 500; margin-top: 2px; }
    .hero-logo-wrap { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 480px; pointer-events: none; user-select: none; }
    .hero-logo-img { width: 100%; height: auto; opacity: 0.88; filter: drop-shadow(0 0 60px rgba(232,114,42,0.25)); }

    /* ─── SECTIONS ─── */
    .section { padding: 90px 40px; max-width: 1200px; margin: 0 auto; }
    .section-label { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .section-title { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: ${G.white}; margin-bottom: 14px; line-height: 1.15; }
    .section-sub { font-size: 16px; color: ${G.textSec}; line-height: 1.7; max-width: 520px; }

    /* ─── HOW IT WORKS ─── */
    .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 50px; }
    .step-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 14px; padding: 32px; position: relative; overflow: hidden; transition: border-color 0.2s; }
    .step-card:hover { border-color: rgba(232,114,42,0.4); }
    .step-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, ${G.accent}, ${G.accentLight}); opacity: 0; transition: opacity 0.2s; }
    .step-card:hover::before { opacity: 1; }
    .step-num { font-family: 'Poppins', sans-serif; font-size: 64px; font-weight: 900; color: rgba(232,114,42,0.08); position: absolute; top: 12px; right: 20px; line-height: 1; }
    .step-icon { font-size: 32px; margin-bottom: 16px; display: block; }
    .step-title { font-size: 18px; font-weight: 700; color: ${G.white}; margin-bottom: 10px; }
    .step-desc { font-size: 14px; color: ${G.textSec}; line-height: 1.7; }

    /* ─── SERVICES ─── */
    .cats { display: flex; gap: 10px; flex-wrap: wrap; margin: 40px 0 28px; }
    .cat-btn { background: ${G.card}; border: 1px solid ${G.border}; color: ${G.textSec}; padding: 9px 20px; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .cat-btn.active, .cat-btn:hover { background: rgba(232,114,42,0.15); border-color: ${G.accent}; color: ${G.accent}; }
    .urgent-toggle { margin-left: auto; display: flex; align-items: center; gap: 10px; }
    .toggle { width: 44px; height: 24px; background: ${G.border}; border-radius: 30px; cursor: pointer; position: relative; transition: background 0.2s; border: none; }
    .toggle.on { background: ${G.accent}; }
    .toggle-dot { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: ${G.white}; border-radius: 50%; transition: transform 0.2s; }
    .toggle.on .toggle-dot { transform: translateX(20px); }
    .toggle-label { font-size: 13px; color: ${G.textSec}; font-weight: 500; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
    .service-card { background: ${G.card}; border: 1px solid rgba(255,255,255,0.13); border-radius: 12px; padding: 22px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; box-shadow: 0 2px 0 rgba(255,255,255,0.07) inset, 0 8px 24px rgba(0,0,0,0.35); }
    .service-card:hover { border-color: ${G.accent}; transform: translateY(-3px); box-shadow: 0 2px 0 rgba(255,255,255,0.1) inset, 0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px ${G.accent}; }
    .service-card.popular::after { content: 'Топ'; position: absolute; top: 12px; right: 12px; background: rgba(232,114,42,0.2); color: ${G.accent}; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; letter-spacing: 1px; }
    .service-card-custom { background: transparent; border: 1.5px dashed rgba(255,255,255,0.22); border-radius: 12px; padding: 22px; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 160px; box-shadow: 0 2px 0 rgba(255,255,255,0.04) inset; text-decoration: none; }
    .service-card-custom:hover { border-color: ${G.accent}; border-style: solid; box-shadow: 0 0 0 1px ${G.accent}, 0 12px 32px rgba(0,0,0,0.3); }
    .service-card-custom-icon { font-size: 28px; }
    .service-card-custom-label { color: ${G.textSec}; font-size: 14px; font-weight: 600; text-align: center; line-height: 1.4; }
    .service-card-custom:hover .service-card-custom-label { color: ${G.accent}; }
    .viber-btn { background: #7360F2; color: ${G.white}; border: none; padding: 16px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .viber-btn:hover { background: #5f4edb; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(115,96,242,0.4); }
    .svc-icon { font-size: 24px; margin-bottom: 12px; display: block; }
    .svc-name { font-size: 15px; font-weight: 700; color: ${G.white}; margin-bottom: 6px; line-height: 1.3; }
    .svc-time { font-size: 12px; color: ${G.textMuted}; margin-bottom: 16px; }
    .svc-footer { display: flex; align-items: center; justify-content: space-between; }
    .svc-price { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 800; color: ${G.white}; }
    .svc-price-label { font-size: 11px; color: ${G.textMuted}; margin-top: 2px; }
    .svc-book-btn { background: rgba(232,114,42,0.15); color: ${G.accent}; border: 1px solid rgba(232,114,42,0.3); padding: 7px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .svc-book-btn:hover { background: ${G.accent}; color: ${G.white}; }
    .urgent-badge { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(232,114,42,0.1); border-top: 1px solid rgba(232,114,42,0.2); padding: 5px 12px; font-size: 11px; color: ${G.accentLight}; display: flex; align-items: center; gap: 6px; }

    /* ─── LANDING LINKS ─── */
    .lp-links-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 40px; }
    .lp-link-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px; padding: 28px 24px; text-decoration: none; display: flex; flex-direction: column; gap: 10px; transition: all 0.2s; }
    .lp-link-card:hover { border-color: ${G.accent}; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
    .lp-link-icon { font-size: 28px; }
    .lp-link-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: ${G.white}; line-height: 1.3; }
    .lp-link-desc { font-size: 13px; color: ${G.textSec}; line-height: 1.5; flex: 1; }
    .lp-link-cta { font-size: 13px; font-weight: 700; color: ${G.accent}; margin-top: 4px; }
    .lp-link-card:hover .lp-link-cta { color: ${G.accentLight}; }
    @media (max-width: 640px) { .lp-links-grid { grid-template-columns: 1fr; } }

    /* ─── TRUST ─── */
    .trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 50px; }
    .trust-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px; padding: 28px; transition: border-color 0.2s; }
    .trust-card:hover { border-color: rgba(232,114,42,0.3); }
    .trust-icon { font-size: 28px; margin-bottom: 14px; display: block; }
    .trust-title { font-size: 16px; font-weight: 700; color: ${G.white}; margin-bottom: 8px; }
    .trust-desc { font-size: 13px; color: ${G.textSec}; line-height: 1.7; }

    /* ─── REVIEWS ─── */
    .reviews-track { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 50px; }
    .review-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
    .review-stars { color: #F5A623; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
    .review-text { font-size: 14px; color: ${G.textSec}; line-height: 1.8; margin-bottom: 18px; font-style: italic; }
    .review-author { display: flex; align-items: center; gap: 12px; }
    .review-avatar { width: 40px; height: 40px; background: rgba(232,114,42,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: ${G.accent}; }
    .review-name { font-size: 14px; font-weight: 700; color: ${G.white}; }
    .review-role { font-size: 12px; color: ${G.textMuted}; margin-top: 2px; }
    .review-svc { font-size: 11px; color: ${G.accent}; background: rgba(232,114,42,0.1); padding: 2px 8px; border-radius: 4px; margin-top: 6px; display: inline-block; }
    .review-card-extra { }
    .show-more-reviews { display: none; }

    /* ─── CTA STRIP ─── */
    .cta-strip { background: linear-gradient(135deg, rgba(232,114,42,0.15) 0%, rgba(232,114,42,0.05) 100%); border: 1px solid rgba(232,114,42,0.2); border-radius: 20px; padding: 60px 50px; margin: 0 40px 90px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
    .cta-text .tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .cta-text h2 { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 800; color: ${G.white}; margin-bottom: 10px; }
    .cta-text p { font-size: 16px; color: ${G.textSec}; }
    .cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .wa-btn { background: #25D366; color: ${G.white}; border: none; padding: 16px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
    .wa-btn:hover { background: #20BD5A; transform: translateY(-2px); }

    /* ─── FOOTER ─── */
    .footer { border-top: 1px solid ${G.border}; padding: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
    .footer-logo { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 900; color: ${G.white}; }
    .footer-logo span { color: ${G.accent}; }
    .footer-note { font-size: 13px; color: ${G.textMuted}; }
    .footer-links { display: flex; gap: 24px; }
    .footer-link { font-size: 13px; color: ${G.textSec}; text-decoration: none; cursor: pointer; transition: color 0.2s; }
    .footer-link:hover { color: ${G.accent}; }

    /* ─── FLOATING BUTTONS ─── */
    .float-wa { position: fixed; bottom: calc(${STICKY_H_DESKTOP}px + 20px); right: 28px; z-index: 99; display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
    .float-wa-btn { width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 8px 30px rgba(37,211,102,0.4); transition: all 0.2s; border: none; }
    .float-wa-btn:hover { transform: scale(1.1); }
    .float-viber-btn { width: 56px; height: 56px; background: #7360F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 8px 30px rgba(115,96,242,0.45); transition: all 0.2s; border: none; text-decoration: none; }
    .float-viber-btn:hover { transform: scale(1.1); }
    .float-phone-btn { width: 48px; height: 48px; background: ${G.accent}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; cursor: pointer; box-shadow: 0 8px 25px rgba(232,114,42,0.4); transition: all 0.2s; border: none; }
    .float-phone-btn:hover { transform: scale(1.1); }

    /* ─── STICKY BOTTOM BAR ─── */
    .sticky-bar {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 97;
      background: rgba(12,10,7,0.97);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid ${G.border};
    }
    .sticky-bar-desktop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      height: ${STICKY_H_DESKTOP}px;
      gap: 24px;
    }
    .sticky-bar-logo {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      font-weight: 900;
      color: ${G.white};
      white-space: nowrap;
      letter-spacing: -0.3px;
    }
    .sticky-bar-logo span { color: ${G.accent}; }
    .sticky-bar-center {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      color: ${G.textSec};
      flex: 1;
      justify-content: center;
    }
    .sticky-bar-center .sep { color: ${G.border}; }
    .sticky-bar-center .phone-num {
      color: ${G.text};
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.3px;
      text-decoration: none;
    }
    .sticky-bar-center .phone-num:hover { color: ${G.accentLight}; }
    .sticky-bar-actions { display: flex; align-items: center; gap: 10px; white-space: nowrap; }
    .sticky-viber-btn {
      background: rgba(115,96,242,0.15);
      color: #9B8FD4;
      border: 1px solid rgba(115,96,242,0.3);
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sticky-viber-btn:hover { background: rgba(115,96,242,0.3); color: #C4BCEF; }
    .sticky-cta-btn {
      background: ${G.accent};
      color: ${G.white};
      border: none;
      padding: 9px 22px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sticky-cta-btn:hover { background: ${G.accentLight}; transform: translateY(-1px); }
    .sticky-bar-mobile { display: none; }

    /* ─── BOOKING MODAL ─── */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 20px; width: 100%; max-width: 520px; overflow: hidden; }
    .modal-header { padding: 24px 28px; border-bottom: 1px solid ${G.border}; display: flex; align-items: center; justify-content: space-between; }
    .modal-title { font-size: 17px; font-weight: 700; color: ${G.white}; }
    .modal-close { background: none; border: none; color: ${G.textSec}; font-size: 22px; cursor: pointer; line-height: 1; }
    .modal-close:hover { color: ${G.text}; }
    .modal-body { padding: 28px; }
    .modal-svc { display: flex; align-items: center; justify-content: space-between; background: rgba(232,114,42,0.08); border: 1px solid rgba(232,114,42,0.2); border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; }
    .modal-svc-name { font-size: 15px; font-weight: 700; color: ${G.white}; }
    .modal-svc-price { font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 800; color: ${G.accent}; }
    .modal-svc-note { font-size: 11px; color: ${G.textMuted}; margin-top: 2px; }
    .price-info-toggle { width: 100%; background: none; border: 1px dashed ${G.border}; color: ${G.textSec}; padding: 11px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; transition: all 0.15s; }
    .price-info-toggle:hover { border-color: ${G.accent}; color: ${G.text}; }
    .price-info-box { background: ${G.bg}; border: 1px solid ${G.border}; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; font-size: 12.5px; color: ${G.textSec}; line-height: 1.7; }
    .price-info-box p { margin: 0 0 8px; }
    .price-info-box p:last-child { margin-bottom: 0; }
    .modal-label { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${G.textSec}; margin-bottom: 12px; }
    .dates-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 24px; }
    .date-btn { background: ${G.bg}; border: 1px solid ${G.border}; color: ${G.textSec}; padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; text-align: center; transition: all 0.15s; }
    .date-btn.sel { background: rgba(232,114,42,0.15); border-color: ${G.accent}; color: ${G.accent}; }
    .hours-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 28px; }
    .hour-btn { background: ${G.bg}; border: 1px solid ${G.border}; color: ${G.textSec}; padding: 8px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; text-align: center; transition: all 0.15s; }
    .hour-btn.sel { background: rgba(232,114,42,0.15); border-color: ${G.accent}; color: ${G.accent}; }
    .modal-confirm { width: 100%; background: ${G.accent}; color: ${G.white}; border: none; padding: 16px; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .modal-confirm:hover:not(:disabled) { background: ${G.accentLight}; }
    .modal-confirm:disabled { opacity: 0.4; cursor: not-allowed; }
    .success-check { font-size: 56px; text-align: center; margin-bottom: 16px; }
    .success-title { font-family: 'Poppins', sans-serif; font-size: 26px; font-weight: 800; color: ${G.white}; text-align: center; margin-bottom: 10px; }
    .success-sub { font-size: 14px; color: ${G.textSec}; text-align: center; line-height: 1.7; margin-bottom: 24px; }
    .success-detail { background: rgba(76,175,122,0.08); border: 1px solid rgba(76,175,122,0.2); border-radius: 10px; padding: 16px 20px; font-size: 14px; color: ${G.textSec}; line-height: 2; }
    .success-detail strong { color: ${G.white}; }

    /* ════════════════════════════════════
       MOBILE OVERRIDES  (max-width: 768px)
       ════════════════════════════════════ */
    @media (max-width: 768px) {
      body { padding-bottom: calc(${STICKY_H_MOBILE}px + env(safe-area-inset-bottom, 0px)); }

      /* Navbar */
      .navbar { padding: 14px 20px; }
      .navbar.scrolled { padding: 10px 20px; }
      .nav-links { display: none; }

      /* Hero — compact */
      .hero {
        min-height: auto;
        padding: 110px 20px 36px;
        align-items: flex-start;
      }
      .hero-logo-wrap { display: none; }
      .hero-badge { margin-bottom: 18px; font-size: 12px; padding: 5px 13px; }
      .hero-title { font-size: clamp(34px, 9vw, 48px); margin-bottom: 14px; }
      .hero-sub { font-size: 15px; margin-bottom: 24px; }
      .hero-actions { margin-bottom: 28px; gap: 10px; }
      .btn-primary { padding: 14px 24px; font-size: 15px; }
      .btn-secondary { padding: 14px 20px; font-size: 14px; }
      .hero-stats { gap: 20px; }
      .stat-num { font-size: 22px; }
      .hero-stat-hide { display: none; }

      /* Sections */
      .section { padding: 55px 20px; }

      /* Steps */
      .steps-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }
      .step-card { padding: 22px; }
      .step-num { font-size: 48px; }

      /* Trust — hide last card on mobile */
      .trust-grid { gap: 12px; margin-top: 32px; }
      .trust-card { padding: 20px; }
      .trust-card:nth-child(4) { display: none; }

      /* Reviews — show 2 by default, "Виж още" button */
      .reviews-track { grid-template-columns: 1fr; gap: 12px; margin-top: 32px; }
      .review-card-extra { display: none; }
      .review-card-extra.visible { display: block; }
      .show-more-reviews {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        margin-top: 16px;
        background: ${G.card};
        border: 1px solid ${G.border};
        color: ${G.textSec};
        padding: 13px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        transition: all 0.2s;
      }
      .show-more-reviews:hover { border-color: ${G.accent}; color: ${G.accent}; }

      /* CTA strip */
      .cta-strip { padding: 28px 20px; margin: 0 16px 60px; }
      .cta-text h2 { font-size: 24px; }
      .cta-text p { font-size: 14px; }

      /* Footer */
      .footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; }

      /* Floating buttons — hide on mobile (sticky bar handles it) */
      .float-wa { display: none !important; }

      .services-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .service-card { padding: 14px; }
      .svc-price { font-size: 18px; }
      .svc-name { font-size: 13px; }
      .service-card-custom { min-height: 120px; }

      /* Sticky bar — mobile layout */
      .sticky-bar-desktop { display: none; }
      .sticky-bar-mobile {
        display: flex;
        align-items: stretch;
        height: ${STICKY_H_MOBILE}px;
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      .sticky-mobile-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        font-family: 'Inter', sans-serif;
        font-size: 11px;
        font-weight: 700;
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: opacity 0.15s;
        letter-spacing: 0.3px;
      }
      .sticky-mobile-btn:active { opacity: 0.75; }
      .sticky-mobile-btn-icon { font-size: 20px; line-height: 1; }
      .sticky-mobile-phone {
        background: #141210;
        color: ${G.textSec};
        border-right: 1px solid ${G.border};
      }
      .sticky-mobile-viber {
        background: #161228;
        color: #9B8FD4;
        border-right: 1px solid ${G.border};
      }
      .sticky-mobile-book {
        background: ${G.accent};
        color: ${G.white};
        flex: 1.4;
      }
    }
  `;

  const finalPrice = selectedService ? Math.round(selectedService.price * urgentMultiplier) : 0;

  const scrollToServices = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="logo">Handyman<span>Sofia</span></div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Услуги</span>
          <span className="nav-link" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>Как работи</span>
          <span className="nav-link" onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}>Отзиви</span>
          <a href="/za-nas" className="nav-link">За нас</a>
          <a href="tel:+359889182749" className="phone-link">📞 +359 889 182 749</a>
          <a href="/en" className="nav-lang-btn">🇬🇧 EN</a>
                    <button className="nav-cta" onClick={scrollToServices}>Резервирай</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge"><span className="hero-badge-dot" />Активни майстори в София</div>
          <h1 className="hero-title">Всеки ремонт.<br /><em>Без главоболие.</em></h1>
          <p className="hero-sub">
            Верифицирани майстори, <strong>фиксирани цени</strong> и <strong>гаранция 30 дни</strong>.
            Резервирай онлайн в под 60 секунди. Без изненади, без чакане.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToServices}>⚡ Резервирай сега</button>
            <button className="btn-secondary" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>Как работи?</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">4.9★</div>
              <div className="stat-label">среден рейтинг</div>
            </div>
            <div className="stat hero-stat-hide">
              <div className="stat-num">500+</div>
              <div className="stat-label">изпълнени задачи</div>
            </div>
            <div className="stat">
              <div className="stat-num">30 дни</div>
              <div className="stat-label">гаранция на труда</div>
            </div>
          </div>
        </div>
        <div className="hero-logo-wrap">
          <img src={logoImg} alt="HandymanSofia" className="hero-logo-img" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div id="how" />
      <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div className="section">
          <div className="section-label">Как работи</div>
          <div className="section-title">Три стъпки.<br />Под 60 секунди.</div>
          <p className="section-sub">Без обаждания, без чакане на оферти. Избираш, плащаш, майсторът идва точно в часа.</p>
          <div className="steps-grid">
            {STEPS.map(s => (
              <div className="step-card" key={s.n}>
                <div className="step-num">{s.n}</div>
                <span className="step-icon">{s.icon}</span>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div id="services" />
      <div className="section">
        <div className="section-label">Услуги с фиксирани цени</div>
        <div className="section-title">Виждаш цената<br />преди да резервираш.</div>
        <p className="section-sub">Без "ще видим на място". Без изненади. Цената е финална, включва труда.</p>

        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", margin: "40px 0 28px" }}>
          <div className="cats" style={{ margin: 0, flex: 1 }}>
            {CATS.map(c => (
              <button key={c} className={`cat-btn${activeCat === c ? " active" : ""}`} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>
          <div className="urgent-toggle">
            <span className="toggle-label">🚨 Спешно +50%</span>
            <button className={`toggle${urgent ? " on" : ""}`} onClick={() => setUrgent(!urgent)} aria-pressed={urgent}>
              <div className="toggle-dot" />
            </button>
          </div>
        </div>

        {urgent && (
          <div style={{ background: "rgba(232,114,42,0.08)", border: `1px solid rgba(232,114,42,0.2)`, borderRadius: "8px", padding: "12px 18px", marginBottom: "20px", fontSize: "13px", color: G.accentLight }}>
            ⚡ Спешна услуга (до 24 ч., след 18 ч. или уикенд) — добавена е 50% надценка.
          </div>
        )}

        <div className="services-grid">
          {filtered.map(svc => (
            <div key={svc.id} className={`service-card${svc.popular ? " popular" : ""}`} onClick={() => openBooking(svc)}>
              {urgent && <div className="urgent-badge">⚡ Спешна цена</div>}
              <span className="svc-icon">{svc.icon}</span>
              <div className="svc-name">{svc.name}</div>
              <div className="svc-time">· {svc.unit}</div>
              <div className="svc-footer">
                <div>
                  <div className="svc-price">{Math.round(svc.price * urgentMultiplier)} €</div>
                  <div className="svc-price-label">само труд · без части</div>
                </div>
                <button className="svc-book-btn">Резервирай →</button>
              </div>
            </div>
          ))}
          <a href="viber://chat?number=%2B359889182749" className="service-card-custom">
            <span className="service-card-custom-icon">🔍</span>
            <span className="service-card-custom-label">Друга услуга<br />по запитване</span>
            <span style={{ fontSize: "12px", color: "#7360F2", fontWeight: 700 }}>Пиши във Viber →</span>
          </a>
        </div>
      </div>

      {/* LANDING PAGE LINKS */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Специализирани услуги</div>
        <div className="section-title">Виж повече за<br />всяка услуга</div>
        <div className="lp-links-grid">
         <a href="/elektro" className="lp-link-card">
            <span className="lp-link-icon">💡</span>
            <div className="lp-link-title">Електро монтаж</div>
            <div className="lp-link-desc">Полилеи, контакти, ключове. Верифициран електротехник — фиксирана цена.</div>
            <span className="lp-link-cta">Цени и детайли →</span>
          </a>
          <a href="/mebeli" className="lp-link-card">
            <span className="lp-link-icon">🪑</span>
            <div className="lp-link-title">Сглобяване на мебели</div>
            <div className="lp-link-desc">IKEA, Jysk и всички марки. Бързо, чисто, без бъркотия.</div>
            <span className="lp-link-cta">Цени и детайли →</span>
          </a>
          <a href="/vik-remonti" className="lp-link-card">
            <span className="lp-link-icon">🔧</span>
            <div className="lp-link-title">ВиК ремонти</div>
            <div className="lp-link-desc">Течове, запушвания, смесители — идваме в същия ден. Фиксирана цена.</div>
            <span className="lp-link-cta">Цени и детайли →</span>
          </a>
        </div>
      </div>

      {/* TRUST */}
      <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div className="section">
          <div className="section-label">Защо HandymanSofia</div>
          <div className="section-title">Доверието не е опция.<br />То е стандарт.</div>
          <div className="trust-grid">
            {TRUST.map((t, i) => (
              <div className="trust-card" key={i}>
                <span className="trust-icon">{t.icon}</span>
                <div className="trust-title">{t.title}</div>
                <div className="trust-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div id="reviews" />
      <div className="section">
        <div className="section-label">Отзиви</div>
        <div className="section-title">Казват го<br />нашите клиенти.</div>
        <div className="reviews-track">
          {REVIEWS.map((r, i) => (
            <div
              className={`review-card${i >= 2 ? ` review-card-extra${showAllReviews ? " visible" : ""}` : ""}`}
              key={i}
            >
              <div className="review-stars">{"★".repeat(r.stars)}</div>
              <div className="review-text">"{r.text}"</div>
              <div className="review-author">
                <div className="review-avatar">{r.name[0]}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-role">{r.role}</div>
                  <div className="review-svc">{r.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!showAllReviews && (
          <button className="show-more-reviews" onClick={() => setShowAllReviews(true)}>
            + Виж всички отзиви ({REVIEWS.length})
          </button>
        )}
      </div>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <div className="cta-text">
          <div className="tag">Готов? Резервирай сега</div>
          <h2>Твоят майстор е<br />на едно повикване.</h2>
          <p>HandymanSofia.com · София · +359 889 182 749</p>
        </div>
        <div className="cta-actions">
          <button className="btn-primary" onClick={scrollToServices}>⚡ Избери услуга</button>
          <button className="wa-btn">💬 WhatsApp</button>
          <a href="viber://chat?number=%2B359889182749" className="viber-btn">🟣 Viber</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Handyman<span>Sofia</span><span style={{ fontSize: "11px", color: G.textMuted, fontFamily: "Inter", fontWeight: 400, marginLeft: 10 }}>.com</span></div>
        <div className="footer-links">
          <span className="footer-link">Услуги</span>
          <a href="/za-nas" className="footer-link">За нас</a>
          <span className="footer-link">Условия</span>
          <span className="footer-link">Контакти</span>
        </div>
        <div className="footer-note">© 2026 HandymanSofia.com · ЕИК 000000000</div>
      </footer>

      {/* FLOATING BUTTONS — desktop only (hidden on mobile via CSS) */}
      <div className="float-wa">
        <a href="viber://chat?number=%2B359889182749" className="float-viber-btn" title="Viber" aria-label="Viber">🟣</a>
        <button className="float-wa-btn" title="WhatsApp" aria-label="WhatsApp">💬</button>
        <button className="float-phone-btn" title="Телефон" aria-label="Телефон">📞</button>
      </div>

      {/* ─── STICKY BOTTOM BAR ─── */}
      <div className="sticky-bar">

        {/* Desktop layout */}
        <div className="sticky-bar-desktop">
          <div className="sticky-bar-logo">Handyman<span>Sofia</span></div>
          <div className="sticky-bar-center">
            <a href="tel:+359889182749" className="phone-num">📞 +359 889 182 749</a>
            <span className="sep">·</span>
            <span>Работим 08:00–21:00, всеки ден</span>
            <span className="sep">·</span>
            <span>Гаранция 30 дни</span>
          </div>
          <div className="sticky-bar-actions">
            <a href="viber://chat?number=%2B359889182749" className="sticky-viber-btn">🟣 Viber</a>
            <button className="sticky-cta-btn" onClick={scrollToServices}>⚡ Резервирай сега</button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="sticky-bar-mobile">
          <a href="tel:+359889182749" className="sticky-mobile-btn sticky-mobile-phone">
            <span className="sticky-mobile-btn-icon">📞</span>
            <span>Обади се</span>
          </a>
          <a href="viber://chat?number=%2B359889182749" className="sticky-mobile-btn sticky-mobile-viber">
            <span className="sticky-mobile-btn-icon">🟣</span>
            <span>Viber</span>
          </a>
          <button className="sticky-mobile-btn sticky-mobile-book" onClick={scrollToServices}>
            <span className="sticky-mobile-btn-icon">⚡</span>
            <span>Резервирай</span>
          </button>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showModal && selectedService && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {booked ? "🎉 Резервацията е потвърдена!" : `Резервирай · Стъпка ${bookingStep}/2`}
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {!booked ? (
                <>
                  <div className="modal-svc">
                    <div>
                      <div className="modal-svc-name">{selectedService.name}</div>
                      <div className="modal-svc-note">⏱ {selectedService.time} · само труд</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="modal-svc-price">{finalPrice} €</div>
                      {urgent && <div style={{ fontSize: "11px", color: G.accentLight }}>+50% спешно</div>}
                    </div>
                  </div>
                  <button className="price-info-toggle" onClick={() => setShowPriceInfo(v => !v)}>
                    ℹ️ Какво включва цената? <span>{showPriceInfo ? "−" : "+"}</span>
                  </button>
                  {showPriceInfo && (
                    <div className="price-info-box">
                      <p>Цената е валидна при стандартни условия на работа и свободен достъп до зоната за ремонт или монтаж.</p>
                      <p>При необходимост от разместване на мебели, освобождаване на пространство, труден достъп или допълнително време е възможно допълнително таксуване — само след предварително потвърждение от теб.</p>
                    </div>
                  )}
                  <div className="modal-label">Избери дата</div>
                  <div className="dates-grid">
                    {dates.map(d => (
                      <button key={d} className={`date-btn${selectedDate === d ? " sel" : ""}`} onClick={() => setSelectedDate(d)}>{d}</button>
                    ))}
                  </div>
                  <div className="modal-label">Избери час</div>
                  <div className="hours-grid">
                    {hours.map(h => (
                      <button key={h} className={`hour-btn${selectedHour === h ? " sel" : ""}`} onClick={() => setSelectedHour(h)}>{h}</button>
                    ))}
                  </div>
                  <button className="modal-confirm" disabled={!selectedDate || !selectedHour} onClick={confirmBooking}>
                    {selectedDate && selectedHour ? `✔ Потвърди за ${selectedDate} в ${selectedHour}` : "Избери дата и час"}
                  </button>
                </>
              ) : (
                <>
                  <div className="success-check">✅</div>
                  <div className="success-title">Резервацията е приета!</div>
                  <p className="success-sub">Ще получиш SMS потвърждение и имейл с всички детайли.</p>
                  <div className="success-detail">
                    <div><strong>Услуга:</strong> {selectedService.name}</div>
                    <div><strong>Дата:</strong> {selectedDate}, {selectedHour} ч.</div>
                    <div><strong>Цена:</strong> {finalPrice} € (само труд)</div>
                    <div><strong>Гаранция:</strong> 30 дни на труда</div>
                  </div>
                  <button className="modal-confirm" style={{ marginTop: "20px" }} onClick={() => setShowModal(false)}>Затвори</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
