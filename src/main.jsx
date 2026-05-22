// src/pages/ZaNas.jsx
// Route: /za-nas

const G = {
  bg: "#0C0A07",
  card: "#161410",
  border: "#2A2520",
  accent: "#E8722A",
  accentLight: "#FF9A5C",
  text: "#F5F0E8",
  textSec: "#9A8F82",
  textMuted: "#5A5047",
  white: "#FEFCF8",
};

const VALUES = [
  { icon: "🛡️", title: "Ясни цени", desc: "Без скрити такси и неприятни изненади след ремонта." },
  { icon: "⏰", title: "Точен час", desc: "Уважаваме времето ти и идваме в уговорения интервал." },
  { icon: "✔️", title: "Проверени майстори", desc: "Работим само с хора, на които бихме поверили собствения си дом." },
  { icon: "🧾", title: "Професионално отношение", desc: "Коректна комуникация, фактура и гаранция за извършената работа." },
];

const HOW = [
  { n: "01", title: "Избери услуга", desc: "Виждаш цената предварително и избираш удобно време за посещение." },
  { n: "02", title: "Потвърждаваме заявката", desc: "Получаваш бърз отговор и точен час - без 'ще дойдем някога днес'." },
  { n: "03", title: "Майсторът идва", desc: "Работим чисто, коректно и с внимание към детайла." },
];

export default function ZaNas() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: ${G.bg}; color: ${G.text}; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${G.bg}; }
    ::-webkit-scrollbar-thumb { background: ${G.accent}; border-radius: 3px; }

    .zn-navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 16px 40px;
      background: rgba(12,10,7,0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid ${G.border};
      display: flex; align-items: center; justify-content: space-between;
    }
    .zn-logo { font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 900; color: ${G.white}; text-decoration: none; cursor: pointer; }
    .zn-logo span { color: ${G.accent}; }
    .zn-nav-links { display: flex; align-items: center; gap: 28px; }
    .zn-nav-link { font-size: 14px; color: ${G.textSec}; text-decoration: none; cursor: pointer; transition: color 0.2s; font-weight: 500; }
    .zn-nav-link:hover, .zn-nav-link.active { color: ${G.accent}; }
    .zn-nav-cta { background: ${G.accent}; color: ${G.white}; border: none; padding: 9px 20px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; text-decoration: none; }
    .zn-nav-cta:hover { background: ${G.accentLight}; }

    .zn-hero {
      padding: 140px 40px 80px;
      max-width: 1200px; margin: 0 auto;
      position: relative;
    }
    .zn-hero-bg {
      position: fixed; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse 60% 50% at 80% 20%, rgba(232,114,42,0.08) 0%, transparent 60%);
      z-index: 0;
    }
    .zn-label { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${G.accent}; margin-bottom: 14px; }
    .zn-hero-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(36px, 5vw, 58px);
      font-weight: 900; line-height: 1.1;
      color: ${G.white}; margin-bottom: 24px;
    }
    .zn-hero-title em { font-style: italic; color: ${G.accent}; }
    .zn-hero-lead {
      font-size: 18px; color: ${G.textSec}; line-height: 1.8;
      max-width: 680px; margin-bottom: 20px;
    }
    .zn-hero-lead strong { color: ${G.text}; font-weight: 600; }
    .zn-divider { width: 60px; height: 3px; background: ${G.accent}; border-radius: 2px; margin: 40px 0; }

    .zn-section { padding: 70px 40px; max-width: 1200px; margin: 0 auto; }
    .zn-section-title { font-family: 'Poppins', sans-serif; font-size: clamp(24px, 3.5vw, 38px); font-weight: 800; color: ${G.white}; margin-bottom: 16px; line-height: 1.2; }

    /* Mission block */
    .zn-mission {
      background: ${G.card};
      border: 1px solid ${G.border};
      border-left: 4px solid ${G.accent};
      border-radius: 14px;
      padding: 40px 44px;
      margin-bottom: 24px;
    }
    .zn-mission-text { font-size: 17px; color: ${G.textSec}; line-height: 1.9; }
    .zn-mission-text p { margin-bottom: 18px; }
    .zn-mission-text p:last-child { margin-bottom: 0; }
    .zn-mission-text strong { color: ${G.text}; font-weight: 600; }

    /* NO list */
    .zn-no-list {
      display: flex; gap: 16px; flex-wrap: wrap; margin: 32px 0;
    }
    .zn-no-item {
      background: rgba(232,114,42,0.06);
      border: 1px solid rgba(232,114,42,0.15);
      border-radius: 10px;
      padding: 14px 22px;
      font-size: 15px;
      color: ${G.textSec};
      display: flex; align-items: center; gap: 10px;
    }
    .zn-no-x { color: ${G.accent}; font-weight: 800; font-size: 17px; }

    /* How it works */
    .zn-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
    .zn-how-card {
      background: ${G.card}; border: 1px solid ${G.border};
      border-radius: 14px; padding: 28px; position: relative; overflow: hidden;
      transition: border-color 0.2s;
    }
    .zn-how-card:hover { border-color: rgba(232,114,42,0.35); }
    .zn-how-num {
      font-family: 'Poppins', sans-serif; font-size: 56px; font-weight: 900;
      color: rgba(232,114,42,0.07); position: absolute; top: 10px; right: 16px; line-height: 1;
    }
    .zn-how-title { font-size: 17px; font-weight: 700; color: ${G.white}; margin-bottom: 10px; margin-top: 6px; }
    .zn-how-desc { font-size: 14px; color: ${G.textSec}; line-height: 1.7; }

    /* Values grid */
    .zn-values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
    .zn-value-card {
      background: ${G.card}; border: 1px solid ${G.border};
      border-radius: 12px; padding: 28px; display: flex; gap: 18px;
      transition: border-color 0.2s;
    }
    .zn-value-card:hover { border-color: rgba(232,114,42,0.3); }
    .zn-value-icon { font-size: 26px; flex-shrink: 0; margin-top: 2px; }
    .zn-value-title { font-size: 16px; font-weight: 700; color: ${G.white}; margin-bottom: 6px; }
    .zn-value-desc { font-size: 13px; color: ${G.textSec}; line-height: 1.7; }

    /* CTA strip */
    .zn-cta {
      background: linear-gradient(135deg, rgba(232,114,42,0.12) 0%, rgba(232,114,42,0.04) 100%);
      border: 1px solid rgba(232,114,42,0.2);
      border-radius: 20px; padding: 56px 50px;
      margin: 0 40px 80px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 32px; flex-wrap: wrap;
    }
    .zn-cta-title { font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 800; color: ${G.white}; margin-bottom: 8px; }
    .zn-cta-sub { font-size: 15px; color: ${G.textSec}; }
    .zn-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .zn-btn-primary { background: ${G.accent}; color: ${G.white}; border: none; padding: 15px 30px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    .zn-btn-primary:hover { background: ${G.accentLight}; transform: translateY(-2px); }
    .zn-btn-viber { background: rgba(115,96,242,0.15); color: #9B8FD4; border: 1px solid rgba(115,96,242,0.3); padding: 15px 26px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    .zn-btn-viber:hover { background: rgba(115,96,242,0.28); }

    /* Footer */
    .zn-footer { border-top: 1px solid ${G.border}; padding: 36px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
    .zn-footer-logo { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 900; color: ${G.white}; }
    .zn-footer-logo span { color: ${G.accent}; }
    .zn-footer-note { font-size: 13px; color: ${G.textMuted}; }

    /* Sticky bottom bar */
    .zn-sticky {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 97;
      background: rgba(12,10,7,0.97); backdrop-filter: blur(16px);
      border-top: 1px solid ${G.border};
    }
    .zn-sticky-inner {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 40px; height: 54px; gap: 24px;
    }
    .zn-sticky-logo { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 900; color: ${G.white}; }
    .zn-sticky-logo span { color: ${G.accent}; }
    .zn-sticky-center { display: flex; align-items: center; gap: 10px; font-size: 13px; color: ${G.textSec}; flex: 1; justify-content: center; }
    .zn-sticky-phone { color: ${G.text}; font-weight: 600; font-size: 14px; text-decoration: none; }
    .zn-sticky-phone:hover { color: ${G.accentLight}; }
    .zn-sticky-actions { display: flex; gap: 10px; }
    .zn-sticky-viber { background: rgba(115,96,242,0.15); color: #9B8FD4; border: 1px solid rgba(115,96,242,0.3); padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; text-decoration: none; }
    .zn-sticky-cta { background: ${G.accent}; color: ${G.white}; border: none; padding: 9px 20px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; text-decoration: none; }

    /* Separators */
    .zn-sep { color: ${G.border}; }

    @media (max-width: 768px) {
      body { padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px)); }
      .zn-navbar { padding: 14px 20px; }
      .zn-nav-links { display: none; }
      .zn-hero { padding: 100px 20px 50px; }
      .zn-section { padding: 50px 20px; }
      .zn-how-grid { grid-template-columns: 1fr; gap: 12px; }
      .zn-values-grid { grid-template-columns: 1fr; gap: 12px; }
      .zn-no-list { gap: 10px; }
      .zn-cta { padding: 28px 20px; margin: 0 16px 60px; }
      .zn-cta-title { font-size: 24px; }
      .zn-mission { padding: 24px; }
      .zn-footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; }

      .zn-sticky-inner { display: none; }
      .zn-sticky-mobile {
        display: flex; align-items: stretch;
        height: 64px; padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      .zn-sticky-mob-btn {
        flex: 1; display: flex; flex-direction: column; align-items: center;
        justify-content: center; gap: 3px; font-family: 'Inter', sans-serif;
        font-size: 11px; font-weight: 700; text-decoration: none;
        border: none; cursor: pointer; letter-spacing: 0.3px;
      }
      .zn-sticky-mob-btn span:first-child { font-size: 20px; line-height: 1; }
      .zn-smob-phone { background: #141210; color: ${G.textSec}; border-right: 1px solid ${G.border}; }
      .zn-smob-viber { background: #161228; color: #9B8FD4; border-right: 1px solid ${G.border}; }
      .zn-smob-book { background: ${G.accent}; color: ${G.white}; flex: 1.4; }
    }

    @media (min-width: 769px) {
      .zn-sticky-mobile { display: none; }
    }
  `;

  const goHome = () => { window.location.href = "/"; };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="zn-hero-bg" />

      {/* NAVBAR */}
      <nav className="zn-navbar">
        <div className="zn-logo" onClick={goHome}>Handyman<span>Sofia</span></div>
        <div className="zn-nav-links">
          <span className="zn-nav-link" onClick={goHome}>Начало</span>
          <span className="zn-nav-link" onClick={() => { goHome(); setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 300); }}>Услуги</span>
          <span className="zn-nav-link active">За нас</span>
          <a href="tel:+359889182749" className="zn-nav-link">📞 +359 889 182 749</a>
          <span className="zn-nav-cta" onClick={goHome}>Резервирай</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="zn-hero">
        <div className="zn-label">За нас</div>
        <h1 className="zn-hero-title">
          Създадохме услугата,<br />
          която <em>самите ние</em><br />
          искахме да съществува.
        </h1>
        <p className="zn-hero-lead">
          HandymanSofia е модерен сервиз за дребни ремонти и монтажи в София.
          Създадохме го, защото хората са уморени от <strong>неясни цени</strong>, <strong>чакане с дни</strong> и липса на коректност.
        </p>
        <div className="zn-divider" />
      </div>

      {/* MISSION */}
      <div className="zn-section" style={{ paddingTop: 0 }}>
        <div className="zn-label">Нашата история</div>
        <div className="zn-mission">
          <div className="zn-mission-text">
            <p>Ние създадохме HandymanSofia, защото вярваме, че домашните ремонти не трябва да означават изгубено време, неясни цени и чакане с часове.</p>
            <p>Клиентите в София искат нещо много по-просто — <strong>коректна услуга, точен час, ясна цена</strong> и човек, на когото могат да се доверят. Именно това изграждаме всеки ден.</p>
            <p>Работим с проверени майстори, фиксирани цени и ясна организация от заявката до завършения ремонт.</p>
          </div>
        </div>

        <div className="zn-no-list">
          <div className="zn-no-item"><span className="zn-no-x">✗</span> Без „ще видим на място"</div>
          <div className="zn-no-item"><span className="zn-no-x">✗</span> Без изгубени дни в чакане</div>
          <div className="zn-no-item"><span className="zn-no-x">✗</span> Без неприятни изненади</div>
        </div>

        <p style={{ fontSize: "16px", color: G.textSec, lineHeight: 1.8, maxWidth: "680px", marginTop: "24px" }}>
          Новото при нас е подходът — съчетаваме удобството на модерните онлайн услуги с реална майсторска работа на място.
          Резервираш лесно, виждаш цената предварително и получаваш услуга, която е <strong style={{ color: G.text }}>подредена, предвидима и изпълнена с внимание към детайла.</strong>
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: G.card, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div className="zn-section">
          <div className="zn-label">Как работи</div>
          <div className="zn-section-title">Подреден процес.<br />Без излишно губене на време.</div>
          <div className="zn-how-grid">
            {HOW.map(h => (
              <div className="zn-how-card" key={h.n}>
                <div className="zn-how-num">{h.n}</div>
                <div className="zn-how-title">{h.title}</div>
                <div className="zn-how-desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="zn-section">
        <div className="zn-label">Защо ни избират отново</div>
        <div className="zn-section-title">Нашите ценности</div>
        <div className="zn-values-grid">
          {VALUES.map((v, i) => (
            <div className="zn-value-card" key={i}>
              <div className="zn-value-icon">{v.icon}</div>
              <div>
                <div className="zn-value-title">{v.title}</div>
                <div className="zn-value-desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="zn-cta">
        <div>
          <div className="zn-cta-title">Нужен ти е майстор?<br />Ние ще се погрижим.</div>
          <div className="zn-cta-sub">Резервирай услуга още днес и получи бързо, коректно и професионално обслужване.</div>
        </div>
        <div className="zn-cta-actions">
          <span className="zn-btn-primary" onClick={goHome}>⚡ Избери услуга</span>
          <a href="viber://chat?number=%2B359889182749" className="zn-btn-viber">🟣 Viber</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="zn-footer">
        <div className="zn-footer-logo">Handyman<span>Sofia</span><span style={{ fontSize: "11px", color: G.textMuted, fontFamily: "Inter", fontWeight: 400, marginLeft: 8 }}>.com</span></div>
        <div className="zn-footer-note">© 2026 HandymanSofia.com</div>
      </footer>

      {/* STICKY BAR */}
      <div className="zn-sticky">
        <div className="zn-sticky-inner">
          <div className="zn-sticky-logo">Handyman<span>Sofia</span></div>
          <div className="zn-sticky-center">
            <a href="tel:+359889182749" className="zn-sticky-phone">📞 +359 889 182 749</a>
            <span className="zn-sep">·</span>
            <span>Работим 08:00–21:00, всеки ден</span>
          </div>
          <div className="zn-sticky-actions">
            <a href="viber://chat?number=%2B359889182749" className="zn-sticky-viber">🟣 Viber</a>
            <span className="zn-sticky-cta" onClick={goHome}>⚡ Резервирай сега</span>
          </div>
        </div>
        <div className="zn-sticky-mobile">
          <a href="tel:+359889182749" className="zn-sticky-mob-btn zn-smob-phone">
            <span>📞</span><span>Обади се</span>
          </a>
          <a href="viber://chat?number=%2B359889182749" className="zn-sticky-mob-btn zn-smob-viber">
            <span>🟣</span><span>Viber</span>
          </a>
          <span className="zn-sticky-mob-btn zn-smob-book" onClick={goHome}>
            <span>⚡</span><span>Резервирай</span>
          </span>
        </div>
      </div>
    </>
  );
}
