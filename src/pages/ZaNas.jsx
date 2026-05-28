// src/pages/ZaNas.jsx
// Route: /za-nas

import { useState, useEffect } from "react";

const G = {
  bg:         "#0C0A07",
  card:       "#161410",
  border:     "#2A2520",
  accent:     "#E8722A",
  accentLight:"#FF9A5C",
  text:       "#F5F0E8",
  textSec:    "#9A8F82",
  textMuted:  "#5A5047",
  white:      "#FEFCF8",
};

const PHONE       = "+359889182749";
const PHONE_LABEL = "0889 182 749";

const VALUES = [
  { icon: "⏱", title: "Точен час",      desc: "Идваме в уговореното време. Уважаваме деня ти." },
  { icon: "💰", title: "Ясна цена",      desc: 'Казваме цената преди да дойдем. Без „ще видим на място”.' },
  { icon: "🔒", title: "Доверие",        desc: "Проверени майстори. Гаранция на всяка услуга." },
  { icon: "✨", title: "Чисто след нас", desc: "Прибираме боклука и оставяме дома ти в ред." },
];

export default function ZaNas() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap');

    .zn * { box-sizing: border-box; margin: 0; padding: 0; }
    .zn { font-family: 'Inter', sans-serif; background: ${G.bg}; color: ${G.text}; overflow-x: hidden; }

    /* NAV */
    .zn-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
    .zn-nav.sc { background: rgba(12,10,7,0.95); backdrop-filter: blur(12px);
      border-bottom: 1px solid ${G.border}; padding: 12px 40px; }
    .zn-logo { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 900;
      color: ${G.white}; letter-spacing: -0.5px; text-decoration: none; }
    .zn-logo span { color: ${G.accent}; }
    .zn-nav-r { display: flex; align-items: center; gap: 20px; }
    .zn-nav-phone { font-size: 14px; font-weight: 700; color: ${G.text}; text-decoration: none; }
    .zn-nav-phone:hover { color: ${G.accent}; }
    .zn-nav-btn { background: ${G.accent}; color: ${G.white}; border: none; padding: 10px 22px;
      border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer;
      font-family: 'Inter', sans-serif; text-decoration: none; transition: all 0.2s; }
    .zn-nav-btn:hover { background: ${G.accentLight}; }

    /* HERO */
    .zn-hero { min-height: 60vh; display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden; padding: 120px 40px 80px; text-align: center; }
    .zn-hero-bg { position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,114,42,0.10) 0%, transparent 65%); }
    .zn-hero-grid { position: absolute; inset: 0;
      background-image: linear-gradient(${G.border} 1px, transparent 1px),
        linear-gradient(90deg, ${G.border} 1px, transparent 1px);
      background-size: 60px 60px; opacity: 0.25; }
    .zn-hero-c { position: relative; max-width: 720px; }
    .zn-badge { display: inline-flex; align-items: center; gap: 8px;
      background: rgba(232,114,42,0.12); border: 1px solid rgba(232,114,42,0.3);
      border-radius: 30px; padding: 6px 16px; font-size: 13px; color: ${G.accentLight};
      margin-bottom: 28px; font-weight: 600; }
    .zn-h1 { font-family: 'Poppins', sans-serif; font-size: clamp(42px, 7vw, 68px);
      font-weight: 900; line-height: 1.05; letter-spacing: -2px; color: ${G.white}; margin-bottom: 24px; }
    .zn-h1 em { color: ${G.accent}; font-style: normal; }
    .zn-sub { font-size: clamp(16px, 2vw, 19px); color: ${G.textSec}; line-height: 1.7; max-width: 600px; margin: 0 auto; }

    /* SECTIONS */
    .zn-sec { max-width: 860px; margin: 0 auto; padding: 80px 40px; }
    .zn-lbl { font-size: 12px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .zn-ttl { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 4vw, 42px);
      font-weight: 800; line-height: 1.1; letter-spacing: -1px; color: ${G.white}; margin-bottom: 32px; }

    /* STORY PARAGRAPHS */
    .zn-story p { font-size: 17px; line-height: 1.85; color: ${G.textSec};
      margin-bottom: 22px; max-width: 720px; }
    .zn-story p:last-child { margin-bottom: 0; }
    .zn-story strong { color: ${G.text}; font-weight: 600; }
    .zn-highlight { font-size: 18px; font-weight: 600; color: ${G.text};
      border-left: 3px solid ${G.accent}; padding-left: 20px; margin: 36px 0;
      line-height: 1.7; }

    /* VALUES */
    .zn-vals { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 20px; margin-top: 48px; }
    .zn-val { background: ${G.card}; border: 1px solid ${G.border}; border-radius: 12px;
      padding: 28px 24px; transition: border-color 0.2s; }
    .zn-val:hover { border-color: rgba(232,114,42,0.4); }
    .zn-val-icon { font-size: 28px; margin-bottom: 14px; }
    .zn-val-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700;
      color: ${G.white}; margin-bottom: 8px; }
    .zn-val-desc { font-size: 14px; color: ${G.textSec}; line-height: 1.6; }

    /* DIVIDER */
    .zn-div { border: none; border-top: 1px solid ${G.border}; }

    /* CTA */
    .zn-cta { background: ${G.card}; border-top: 1px solid ${G.border};
      border-bottom: 1px solid ${G.border}; padding: 80px 40px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 40px; flex-wrap: wrap; }
    .zn-cta-tag { font-size: 12px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: ${G.accent}; margin-bottom: 12px; }
    .zn-cta-title { font-family: 'Poppins', sans-serif; font-size: clamp(26px, 4vw, 38px);
      font-weight: 900; line-height: 1.1; letter-spacing: -1px; color: ${G.white}; }
    .zn-cta-sub { font-size: 14px; color: ${G.textSec}; margin-top: 10px; }
    .zn-cta-acts { display: flex; gap: 14px; flex-wrap: wrap; }
    .btn-p { background: ${G.accent}; color: ${G.white}; padding: 15px 32px;
      border-radius: 8px; font-size: 16px; font-weight: 700; text-decoration: none;
      transition: all 0.2s; white-space: nowrap; }
    .btn-p:hover { background: ${G.accentLight}; transform: translateY(-1px); }
    .btn-v { background: transparent; color: ${G.text}; padding: 15px 32px;
      border-radius: 8px; font-size: 16px; font-weight: 700; text-decoration: none;
      border: 1px solid ${G.border}; transition: all 0.2s; white-space: nowrap; }
    .btn-v:hover { border-color: ${G.accent}; color: ${G.accent}; }

    /* FOOTER */
    .zn-foot { padding: 40px; display: flex; align-items: center;
      justify-content: space-between; flex-wrap: wrap; gap: 20px;
      border-top: 1px solid ${G.border}; }
    .zn-foot-logo { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 900;
      color: ${G.white}; text-decoration: none; }
    .zn-foot-logo span { color: ${G.accent}; }
    .zn-foot-links { display: flex; gap: 24px; flex-wrap: wrap; }
    .zn-foot-link { font-size: 13px; color: ${G.textSec}; text-decoration: none;
      transition: color 0.2s; cursor: pointer; }
    .zn-foot-link:hover { color: ${G.accent}; }
    .zn-foot-note { font-size: 12px; color: ${G.textMuted}; }

    /* MOBILE */
    @media (max-width: 640px) {
      .zn-nav { padding: 14px 20px; }
      .zn-nav.sc { padding: 10px 20px; }
      .zn-hero { padding: 100px 20px 60px; }
      .zn-sec { padding: 60px 20px; }
      .zn-cta { padding: 60px 20px; flex-direction: column; align-items: flex-start; }
      .zn-foot { padding: 32px 20px; flex-direction: column; align-items: flex-start; }
      .zn-vals { grid-template-columns: 1fr 1fr; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="zn">

        {/* NAVBAR */}
        <nav className={`zn-nav${scrolled ? " sc" : ""}`}>
          <a href="/" className="zn-logo">Handyman<span>Sofia</span></a>
          <div className="zn-nav-r">
            <a href={`tel:${PHONE}`} className="zn-nav-phone">📞 {PHONE_LABEL}</a>
            <a href={`viber://chat?number=${PHONE}`} className="zn-nav-btn">Viber / WhatsApp</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="zn-hero">
          <div className="zn-hero-bg" />
          <div className="zn-hero-grid" />
          <div className="zn-hero-c">
            <div className="zn-badge">🔨 Нашата история</div>
            <h1 className="zn-h1">
              За <em>нас</em>
            </h1>
            <p className="zn-sub">
              Създадохме HandymanSofia, защото домашните ремонти не трябва да означават изгубено време, неясни цени и чакане с часове.
            </p>
          </div>
        </section>

        <hr className="zn-div" />

        {/* STORY */}
        <div className="zn-sec">
          <div className="zn-lbl">Нашата мисия</div>
          <div className="zn-ttl">Доверие в<br />домашните услуги</div>

          <div className="zn-story">
            <p>
              Клиентите в София искат нещо много по-просто —{" "}
              <strong>коректна услуга, точен час, ясна цена</strong> и човек, на когото могат да се доверят. Това изграждаме всеки ден.
            </p>
            <p>
              HandymanSofia е модерен сервиз за дребни ремонти и монтажи, създаден за хора, които ценят спокойствието, добрата комуникация и професионалното отношение. Работим с проверени майстори, фиксирани цени и ясна организация — от заявката до завършения ремонт.
            </p>

            <div className="zn-highlight">
              Без „ще видим на място&quot;. Без изгубени дни в чакане. Без неприятни изненади.
            </div>

            <p>
              Новото при нас е съчетаването на удобството на модерните онлайн услуги с реална майсторска работа на място. Резервираш лесно, виждаш цената предварително и получаваш услуга, която е <strong>подредена, предвидима и изпълнена с внимание към детайла</strong>.
            </p>
            <p>
              HandymanSofia е създаден, за да върне доверието в домашните услуги.
            </p>
          </div>
        </div>

        <hr className="zn-div" />

        {/* VALUES */}
        <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
          <div className="zn-sec">
            <div className="zn-lbl">Нашите ценности</div>
            <div className="zn-ttl">Как работим</div>
            <div className="zn-vals">
              {VALUES.map((v, i) => (
                <div className="zn-val" key={i}>
                  <div className="zn-val-icon">{v.icon}</div>
                  <div className="zn-val-title">{v.title}</div>
                  <div className="zn-val-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="zn-cta">
          <div>
            <div className="zn-cta-tag">Готов? Обади се сега</div>
            <h2 className="zn-cta-title">Твоят майстор е<br />на едно повикване.</h2>
            <p className="zn-cta-sub">HandymanSofia.com · София · {PHONE_LABEL}</p>
          </div>
          <div className="zn-cta-acts">
            <a href={`tel:${PHONE}`} className="btn-p">📞 Обади се сега</a>
            <a href={`viber://chat?number=${PHONE}`} className="btn-v">🟣 Viber</a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="zn-foot">
          <a href="/" className="zn-foot-logo">Handyman<span>Sofia</span>
            <span style={{ fontSize: 11, color: G.textMuted, fontFamily: "Inter", fontWeight: 400, marginLeft: 8 }}>.com</span>
          </a>
          <div className="zn-foot-links">
            <a href="/" className="zn-foot-link">Начало</a>
            <a href="/za-nas" className="zn-foot-link">За нас</a>
            <a href={`tel:${PHONE}`} className="zn-foot-link">Контакти</a>
          </div>
          <div className="zn-foot-note">© 2026 HandymanSofia.com · ЕИК 000000000</div>
        </footer>

      </div>
    </>
  );
}
