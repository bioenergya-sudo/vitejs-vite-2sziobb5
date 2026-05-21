import { useState, useEffect, useRef } from "react";

const logoImg = "/FrontPage-logo.webp";

const SERVICES = [
  { id: 1,  cat: "⚡ Електро", icon: "⚡", name: "Монтаж на полюлей",         price: 45,  unit: "фикс.",    time: "1 ч",    popular: true  },
  { id: 2,  cat: "⚡ Електро", icon: "⚡", name: "Смяна на контакт",           price: 19,  unit: "фикс.",    time: "30 мин", popular: false },
  { id: 11, cat: "⚡ Електро", icon: "⚡", name: "Смяна на ключ",              price: 45,  unit: "фикс.",    time: "30 мин", popular: false },
  { id: 3,  cat: "⚡ Електро", icon: "⚡", name: "Монтаж на климатик",         price: 120, unit: "фикс.",    time: "2-3 ч",  popular: true  },
  { id: 4,  cat: "🔧 ВиК",    icon: "🔧", name: "Ремонт на казанче",          price: 35,  unit: "фикс.",    time: "1 ч",    popular: true  },
  { id: 5,  cat: "🔧 ВиК",    icon: "🔧", name: "Монтаж миялна машина",       price: 90,  unit: "фикс.",    time: "1.5 ч",  popular: true  },
  { id: 6,  cat: "🔧 ВиК",    icon: "🔧", name: "Смяна на смесител",          price: 25,  unit: "фикс.",    time: "1 ч",    popular: false },
  { id: 12, cat: "🔧 ВиК",    icon: "🔧", name: "Смяна на сифон",             price: 25,  unit: "фикс.",    time: "45 мин", popular: false },
  { id: 7,  cat: "🏠 Монтаж", icon: "🏠", name: "Сглобяване мебели IKEA",    price: 30,  unit: "час",      time: "2-4 ч",  popular: true  },
  { id: 8,  cat: "🏠 Монтаж", icon: "🏠", name: "Закачване на рафтове",       price: 20,  unit: "държач",   time: "30 мин", popular: false },
  { id: 13, cat: "🏠 Монтаж", icon: "🏠", name: "Монтаж на TV стойка",        price: 30,  unit: "фикс.",    time: "30 мин", popular: false },
  { id: 9,  cat: "🚗 Гуми",   icon: "🚗", name: "Смяна гуми до адрес 15\"",  price: 65,  unit: "4 гуми",   time: "30 мин", popular: true  },
  { id: 10, cat: "🚗 Гуми",   icon: "🚗", name: "Смяна гуми до адрес 17\"",  price: 90,  unit: "4 гуми",   time: "45 мин", popular: false },
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

const GALLERY = [
  { src: "/Монтаж_полюлей.jpg",  label: "Монтаж полилей"    },
  { src: "/Монтаж_полюлей1.jpg", label: "Монтаж полилей"    },
  { src: "/Монтаж_контакт.jpg",  label: "Смяна контакт"     },
  { src: "/Монтаж_контакт1.jpg", label: "Монтаж контакт"    },
  { src: "/Монтаж_миялна.jpg",   label: "Монтаж миялна"     },
  { src: "/Монтаж_пералня.jpg",  label: "Монтаж пералня"    },
  { src: "/Монтаж_смесител.jpg", label: "Смяна смесител"    },
  { src: "/Монтаж_сифон.jpg",    label: "Монтаж сифон"      },
  { src: "/Монтаж_мебели1.jpg",  label: "Сглобяване мебели" },
  { src: "/Монтаж_спалня1.jpg",  label: "Монтаж спалня"     },
  { src: "/Монтаж_спалня2.jpg",  label: "Сглобяване легло"  },
  { src: "/лепене_тапети.jpg",   label: "Лепене тапети"     },
];

const CATS = ["Всички", "⚡ Електро", "🔧 ВиК", "🏠 Монтаж", "🚗 Гуми"];

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
    body { font-family: 'Inter', sans-serif; background: ${G.bg}; color: ${G.text}; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: ${G.bg}; } ::-webkit-scrollbar-thumb { background: ${G.accent}; border-radius: 3px; }

    .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
    .navbar.scrolled { background: rgba(12,10,7,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid ${G.border}; padding: 12px 40px; }
    .logo { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 900; color: ${G.white}; letter-spacing: -0.5px; }
    .logo span { color: ${G.accent}; }
    .nav-links { display: flex; align-items: center; gap: 32px; }
    .nav-link { font-size: 14px; color: ${G.textSec}; text-decoration: none; cursor: pointer; transition: color 0.2s; font-weight: 500; }
    .nav-link:hover { color: ${G.text}; }
    .nav-cta { background: ${G.accent}; color: ${G.white}; border: none; padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .nav-cta:hover { background: ${G.accentLight}; transform: translateY(-1px); }
    .phone-link { font-size: 14px; color: ${G.text}; font-weight: 600; letter-spacing: 0.5px; }

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
    .stat { }
    .stat-num { font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 800; color: ${G.white}; }
    .stat-label { font-size: 12px; color: ${G.textMuted}; font-weight: 500; margin-top: 2px; }
    .hero-logo-wrap { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 480px; pointer-events: none; user-select: none; }
    .hero-logo-img { width: 100%; height: auto; opacity: 0.88; filter: drop-shadow(0 0 60px rgba(232,114,42,0.25)); }

    .section { padding: 90px 40px; max-width: 1200px; margin: 0 auto; }
    .section-label { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .section-title { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: ${G.white}; margin-bottom: 14px; line-height: 1.15; }
    .section-sub { font-size: 16px; color: ${G.textSec}; line-height: 1.7; max-width: 520px; }

    .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 50px; }
    .step-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 14px; padding: 32px; position: relative; overflow: hidden; transition: border-color 0.2s; }
    .step-card:hover { border-color: rgba(232,114,42,0.4); }
    .step-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, ${G.accent}, ${G.accentLight}); opacity: 0; transition: opacity 0.2s; }
    .step-card:hover::before { opacity: 1; }
    .step-num { font-family: 'Poppins', sans-serif; font-size: 64px; font-weight: 900; color: rgba(232,114,42,0.08); position: absolute; top: 12px; right: 20px; line-height: 1; }
    .step-icon { font-size: 32px; margin-bottom: 16px; display: block; }
    .step-title { font-size: 18px; font-weight: 700; color: ${G.white}; margin-bottom: 10px; }
    .step-desc { font-size: 14px; color: ${G.textSec}; line-height: 1.7; }
    .steps-connector { display: none; }

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
    .service-card-custom { background: transparent; border: 1.5px dashed rgba(255,255,255,0.22); border-radius: 12px; padding: 22px; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 160px; box-shadow: 0 2px 0 rgba(255,255,255,0.04) inset; }
    .service-card-custom:hover { border-color: ${G.accent}; border-style: solid; box-shadow: 0 0 0 1px ${G.accent}, 0 12px 32px rgba(0,0,0,0.3); }
    .service-card-custom-icon { font-size: 28px; }
    .service-card-custom-label { color: ${G.textSec}; font-size: 14px; font-weight: 600; text-align: center; line-height: 1.4; }
    .service-card-custom:hover .service-card-custom-label { color: ${G.accent}; }
    .viber-btn { background: #7360F2; color: ${G.white}; border: none; padding: 16px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
    .viber-btn:hover { background: #5f4edb; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(115,96,242,0.4); }
    .float-viber-btn { width: 56px; height: 56px; background: #7360F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 8px 30px rgba(115,96,242,0.45); transition: all 0.2s; border: none; }
    .float-viber-btn:hover { transform: scale(1.1); }
    .svc-icon { font-size: 24px; margin-bottom: 12px; display: block; }
    .svc-name { font-size: 15px; font-weight: 700; color: ${G.white}; margin-bottom: 6px; line-height: 1.3; }
    .svc-time { font-size: 12px; color: ${G.textMuted}; margin-bottom: 16px; }
    .svc-footer { display: flex; align-items: center; justify-content: space-between; }
    .svc-price { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 800; color: ${G.white}; }
    .svc-price-label { font-size: 11px; color: ${G.textMuted}; margin-top: 2px; }
    .svc-book-btn { background: rgba(232,114,42,0.15); color: ${G.accent}; border: 1px solid rgba(232,114,42,0.3); padding: 7px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
    .svc-book-btn:hover { background: ${G.accent}; color: ${G.white}; }
    .urgent-badge { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(232,114,42,0.1); border-top: 1px solid rgba(232,114,42,0.2); padding: 5px 12px; font-size: 11px; color: ${G.accentLight}; display: flex; align-items: center; gap: 6px; }

    .trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 50px; }
    .trust-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px; padding: 28px; transition: border-color 0.2s; }
    .trust-card:hover { border-color: rgba(232,114,42,0.3); }
    .trust-icon { font-size: 28px; margin-bottom: 14px; display: block; }
    .trust-title { font-size: 16px; font-weight: 700; color: ${G.white}; margin-bottom: 8px; }
    .trust-desc { font-size: 13px; color: ${G.textSec}; line-height: 1.7; }

    .reviews-track { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 50px; }
    .review-card { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
    .review-card:hover { border-color: ${G.border}; }
    .review-stars { color: #F5A623; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
    .review-text { font-size: 14px; color: ${G.textSec}; line-height: 1.8; margin-bottom: 18px; font-style: italic; }
    .review-author { display: flex; align-items: center; gap: 12px; }
    .review-avatar { width: 40px; height: 40px; background: rgba(232,114,42,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: ${G.accent}; }
    .review-name { font-size: 14px; font-weight: 700; color: ${G.white}; }
    .review-role { font-size: 12px; color: ${G.textMuted}; margin-top: 2px; }
    .review-svc { font-size: 11px; color: ${G.accent}; background: rgba(232,114,42,0.1); padding: 2px 8px; border-radius: 4px; margin-top: 6px; display: inline-block; }

    .cta-strip { background: linear-gradient(135deg, rgba(232,114,42,0.15) 0%, rgba(232,114,42,0.05) 100%); border: 1px solid rgba(232,114,42,0.2); border-radius: 20px; padding: 60px 50px; margin: 0 40px 90px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
    .cta-text .tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .cta-text h2 { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 800; color: ${G.white}; margin-bottom: 10px; }
    .cta-text p { font-size: 16px; color: ${G.textSec}; }
    .cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .wa-btn { background: #25D366; color: ${G.white}; border: none; padding: 16px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
    .wa-btn:hover { background: #20BD5A; transform: translateY(-2px); }

    .footer { border-top: 1px solid ${G.border}; padding: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap; gap: 20px; }
    .footer-logo { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 900; color: ${G.white}; }
    .footer-logo span { color: ${G.accent}; }
    .footer-note { font-size: 13px; color: ${G.textMuted}; }
    .footer-links { display: flex; gap: 24px; }
    .footer-link { font-size: 13px; color: ${G.textSec}; text-decoration: none; cursor: pointer; transition: color 0.2s; }
    .footer-link:hover { color: ${G.accent}; }

    .float-wa { position: fixed; bottom: 28px; right: 28px; z-index: 99; display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
    .float-wa-btn { width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 8px 30px rgba(37,211,102,0.4); transition: all 0.2s; border: none; }
    .float-wa-btn:hover { transform: scale(1.1); }
    .float-phone-btn { width: 48px; height: 48px; background: ${G.accent}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; cursor: pointer; box-shadow: 0 8px 25px rgba(232,114,42,0.4); transition: all 0.2s; border: none; }
    .float-phone-btn:hover { transform: scale(1.1); }

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

    .gallery-section { padding: 90px 40px; max-width: 1200px; margin: 0 auto; }
    .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 50px; }
    .gallery-item { border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; aspect-ratio: 1; border: 1px solid ${G.border}; transition: border-color 0.2s; }
    .gallery-item:first-child { grid-column: span 2; grid-row: span 2; aspect-ratio: auto; }
    .gallery-item:hover { border-color: rgba(232,114,42,0.4); }
    .gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.35s; }
    .gallery-item:hover img { transform: scale(1.06); }
    .gallery-item-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 14px; background: linear-gradient(transparent, rgba(12,10,7,0.85)); font-size: 12px; font-weight: 500; color: ${G.textSec}; opacity: 0; transition: opacity 0.2s; }
    .gallery-item:hover .gallery-item-label { opacity: 1; }

    @media (max-width: 768px) {
      .navbar { padding: 14px 20px; } .navbar.scrolled { padding: 10px 20px; }
      .nav-links { display: none; }
      .hero { padding: 100px 20px 60px; }
      .hero-logo-wrap { display: none; }
      .steps-grid { grid-template-columns: 1fr; }
      .section { padding: 60px 20px; }
      .gallery-section { padding: 60px 20px; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .gallery-item:first-child { grid-column: span 2; grid-row: span 1; }
      .cta-strip { padding: 40px 28px; margin: 0 20px 60px; }
      .footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; }
      .hero-stats { gap: 24px; }
    }
  `;

  const finalPrice = selectedService ? Math.round(selectedService.price * urgentMultiplier) : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="logo">Handyman<span>Sofia</span></div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>Услуги</span>
          <span className="nav-link" onClick={() => document.getElementById("how")?.scrollIntoView({behavior:"smooth"})}>Как работи</span>
          <span className="nav-link" onClick={() => document.getElementById("reviews")?.scrollIntoView({behavior:"smooth"})}>Отзиви</span>
          <span className="phone-link">📞 0888 123 456</span>
          <button className="nav-cta" onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>Резервирай</button>
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
            <button className="btn-primary" onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>
              ⚡ Резервирай сега
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById("how")?.scrollIntoView({behavior:"smooth"})}>
              Как работи?
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">среден рейтинг</div></div>
            <div className="stat"><div className="stat-num">500+</div><div className="stat-label">изпълнени задачи</div></div>
            <div className="stat"><div className="stat-num">30 дни</div><div className="stat-label">гаранция на труда</div></div>
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
            ⚡ Спешна услуга (до 24 ч., след 18 ч. или уикенд) — добавена е 50% надценка. Вдъхновено от MrFix.nl.
          </div>
        )}

        <div className="services-grid">
          {filtered.map(svc => (
            <div key={svc.id} className={`service-card${svc.popular ? " popular" : ""}`} onClick={() => openBooking(svc)}>
              {urgent && <div className="urgent-badge">⚡ Спешна цена</div>}
              <span className="svc-icon">{svc.icon}</span>
              <div className="svc-name">{svc.name}</div>
              <div className="svc-time">⏱ {svc.time} · {svc.unit}</div>
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
            <span style={{fontSize:"12px", color:"#7360F2", fontWeight:700}}>Пиши във Viber →</span>
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

      {/* GALLERY */}
      <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div className="gallery-section">
          <div className="section-label">Нашата работа</div>
          <div className="section-title">Резултати,<br />не обещания.</div>
          <p className="section-sub">Реални снимки от реални поръчки в София.</p>
          <div className="gallery-grid">
            {GALLERY.map((item, i) => (
              <div className="gallery-item" key={i}>
                <img src={item.src} alt={item.label} loading={i < 3 ? "eager" : "lazy"} />
                <div className="gallery-item-label">{item.label}</div>
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
            <div className="review-card" key={i}>
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
      </div>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <div className="cta-text">
          <div className="tag">Готов? Резервирай сега</div>
          <h2>Твоят майстор е<br />на едно повикване.</h2>
          <p>HandymanSofia.com · София · 0888 123 456</p>
        </div>
        <div className="cta-actions">
          <button className="btn-primary" onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>⚡ Избери услуга</button>
          <a href="https://wa.me/359889182749?text=Здравейте%2C%20интересувам%20се%20от%20услуга." target="_blank" rel="noopener noreferrer" className="wa-btn">💬 WhatsApp</a>
          <a href="viber://chat?number=%2B359889182749" className="viber-btn">🟣 Viber</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Handyman<span>Sofia</span><span style={{fontSize:"11px", color: G.textMuted, fontFamily:"Inter", fontWeight:400, marginLeft:10}}>.com</span></div>
        <div className="footer-links">
          <span className="footer-link">Услуги</span>
          <span className="footer-link">За нас</span>
          <span className="footer-link">Условия</span>
          <span className="footer-link">Контакти</span>
        </div>
        <div className="footer-note">© 2026 HandymanSofia.com · ЕИК 000000000</div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="float-wa">
        <a href="viber://chat?number=%2B359889182749" className="float-viber-btn" title="Viber" aria-label="Viber">🟣</a>
        <a href="https://wa.me/359889182749?text=Здравейте%2C%20интересувам%20се%20от%20услуга." target="_blank" rel="noopener noreferrer" className="float-wa-btn" title="WhatsApp" aria-label="WhatsApp">💬</a>
        <button className="float-phone-btn" title="Телефон" aria-label="Телефон">📞</button>
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
