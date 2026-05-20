import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Countdown Timer ────────────────────────────────────────────────────────
function calcTime(targetDate: Date) {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function useCountdown(targetDate: Date) {
  const [time, setTime] = useState(() => calcTime(targetDate));
  useEffect(() => {
    const id = setInterval(() => setTime(calcTime(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

function TimerBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="glow-border-orange rounded-lg px-4 py-3 min-w-[80px] text-center"
        style={{ background: "rgba(255,107,0,0.08)" }}
      >
        <span className="counter-digit neon-orange" style={{ color: "#FF6B00" }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs mt-2 uppercase tracking-widest" style={{ color: "#556080" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Seats Progress ──────────────────────────────────────────────────────────
function SeatsBar({ total, left }: { total: number; left: number }) {
  const taken = total - left;
  const pct = (taken / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2" style={{ color: "#8899BB" }}>
        <span>Занято мест: <strong style={{ color: "#FF6B00" }}>{taken}</strong></span>
        <span>Осталось: <strong style={{ color: "#00FF88" }}>{left}</strong></span>
      </div>
      <div className="w-full rounded-full h-2" style={{ background: "#0A0F1A", border: "1px solid #1A2440" }}>
        <div
          className="h-2 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #FF6B00, #FF9500)" }}
        />
      </div>
    </div>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl cursor-pointer card-hover"
      style={{ background: "#0A0F1A", border: "1px solid #1A2440" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <span className="font-medium" style={{ color: "#E0EAFF", fontFamily: "'IBM Plex Sans', sans-serif" }}>{q}</span>
        <div
          className="transition-transform duration-300 flex-shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <Icon name="Plus" size={20} style={{ color: "#FF6B00" }} />
        </div>
      </div>
      {open && (
        <div className="px-5 pb-5 animate-slide-up" style={{ color: "#8899BB", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Index() {
  const webinarDate = new Date("2026-06-15T10:00:00");
  const time = useCountdown(webinarDate);
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [seatsLeft] = useState(47);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const program = [
    { time: "10:00", title: "Открытие. Состояние автоматизации 2026", desc: "Обзор рынка, ключевые тренды и почему ИИ меняет всё прямо сейчас" },
    { time: "10:30", title: "Промышленный ИИ: от теории к цеху", desc: "Реальные кейсы внедрения машинного обучения на производстве" },
    { time: "11:15", title: "Цифровые двойники и компьютерное зрение", desc: "Как виртуальные модели сокращают простои и брак на 40-60%" },
    { time: "12:00", title: "Роботизированные системы нового поколения", desc: "Коллаборативные роботы, RPA и интеграция с ERP/MES-системами" },
    { time: "12:45", title: "Практикум: пилот за 90 дней", desc: "Пошаговый план запуска первого ИИ-проекта без большого бюджета" },
    { time: "13:30", title: "Q&A и нетворкинг", desc: "Ответы на вопросы, разбор кейсов участников, знакомство с экспертами" },
  ];

  const benefits = [
    { icon: "Zap", title: "Готовые решения", desc: "Получите список инструментов, которые можно применить уже в понедельник" },
    { icon: "TrendingUp", title: "Рост эффективности", desc: "Узнайте, как сократить ручной труд на 30-50% без замены оборудования" },
    { icon: "Shield", title: "Безопасное внедрение", desc: "Избежите типичных ошибок и провальных внедрений, которые стоят миллионы" },
    { icon: "Users", title: "Нетворкинг", desc: "Познакомьтесь с 200+ инженерами и руководителями производств" },
    { icon: "Gift", title: "Эксклюзивный бонус", desc: "Чек-лист из 50 критериев оценки готовности предприятия к автоматизации" },
    { icon: "Award", title: "Сертификат", desc: "Цифровой сертификат участника для профессионального портфолио" },
  ];

  const experts = [
    {
      name: "Алексей Громов",
      role: "Chief Automation Officer",
      company: "ПАО «Северсталь»",
      exp: "18 лет в промавтоматизации",
      topics: ["Цифровые двойники", "Предиктивная аналитика"],
      img: "https://cdn.poehali.dev/projects/d05c6821-fe0d-4683-9e7c-6b0813624a70/files/16ec44f8-0e82-4318-a94d-c9e07f1252f4.jpg",
    },
    {
      name: "Марина Соколова",
      role: "Head of AI Engineering",
      company: "Яндекс Облако",
      exp: "12 лет в ML и компьютерном зрении",
      topics: ["Computer Vision", "MLOps в промышленности"],
      img: "https://cdn.poehali.dev/projects/d05c6821-fe0d-4683-9e7c-6b0813624a70/files/16ec44f8-0e82-4318-a94d-c9e07f1252f4.jpg",
    },
  ];

  const faqs = [
    { q: "Нужен ли технический бэкграунд для участия?", a: "Вебинар рассчитан на инженеров и технических специалистов. Будут полезны базовые знания производственных процессов, но глубокого понимания ИИ не требуется — всё объясним с нуля." },
    { q: "Записи будут доступны после вебинара?", a: "Да, все зарегистрированные участники получат запись в течение 24 часов после окончания. Доступ открыт на 30 дней." },
    { q: "Это платный вебинар?", a: "Вебинар абсолютно бесплатный. Количество мест ограничено — 200 участников. Регистрируйтесь сейчас, чтобы гарантировать своё место." },
    { q: "Как получить сертификат участника?", a: "Сертификат отправляется автоматически на вашу почту после посещения не менее 80% мероприятия." },
    { q: "Можно ли задать вопросы спикерам?", a: "Да, последние 45 минут посвящены вопросам и ответам. Вопросы можно задавать в чате в течение всего вебинара." },
  ];

  return (
    <div style={{ background: "var(--dark-bg)", minHeight: "100vh", color: "#E0EAFF" }}>

      {/* ── Ticker ── */}
      <div
        className="overflow-hidden py-2 relative"
        style={{ background: "linear-gradient(90deg, #FF6B00, #FF9500)", borderBottom: "1px solid rgba(255,107,0,0.3)" }}
      >
        <div className="flex animate-ticker whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="mx-8 text-sm font-semibold uppercase tracking-widest" style={{ color: "#050810" }}>
              🔥 Осталось {seatsLeft} мест &nbsp;•&nbsp; Регистрация до 10 июня &nbsp;•&nbsp; Бонус каждому участнику &nbsp;•&nbsp; Бесплатный вебинар &nbsp;•&nbsp; 15 июня 2026 &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden grid-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 scanlines"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/d05c6821-fe0d-4683-9e7c-6b0813624a70/files/37dbde8d-d7d6-4549-b595-bbc162fc321e.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            opacity: 0.12,
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,8,16,0.97) 0%, rgba(5,8,16,0.7) 60%, rgba(5,8,16,0.85) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, var(--dark-bg), transparent)" }} />

        {/* Decorative orbs */}
        <div
          className="absolute top-20 right-20 rounded-full opacity-20 animate-float"
          style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(255,107,0,0.4) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-20 left-40 rounded-full opacity-15 animate-float"
          style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)", filter: "blur(30px)", animationDelay: "2s" }}
        />

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 animate-slide-up"
              style={{ background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.4)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "#FF6B00" }} />
              <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#FF6B00" }}>
                Бесплатный вебинар • 15 июня 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 animate-slide-up delay-100" style={{ textTransform: "uppercase" }}>
              <span style={{ color: "#E0EAFF" }}>Автоматизация</span>
              <br />
              <span className="gradient-text-orange">и ИИ</span>
              <br />
              <span style={{ color: "#E0EAFF" }}>для инженеров</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 animate-slide-up delay-200" style={{ color: "#8899BB", maxWidth: 560, lineHeight: 1.7 }}>
              За 4 часа узнайте, как применить искусственный интеллект и автоматизацию на вашем предприятии — с конкретными кейсами и пошаговыми планами внедрения
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mb-10 animate-slide-up delay-300">
              {[["200+", "участников"], ["4", "ч. контента"], ["2", "топ-эксперта"], ["50+", "кейсов"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold gradient-text-orange" style={{ fontFamily: "'Oswald', sans-serif" }}>{n}</div>
                  <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: "#556080" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-400">
              <a href="#register">
                <button className="glow-btn px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wider" style={{ color: "#050810", fontFamily: "'Oswald', sans-serif" }}>
                  Занять место бесплатно
                </button>
              </a>
              <a href="#program">
                <button className="px-8 py-4 rounded-xl text-lg font-semibold uppercase tracking-wider transition-all duration-300"
                  style={{ background: "transparent", border: "1px solid #1A2440", color: "#8899BB" }}>
                  Программа →
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Countdown + Seats ── */}
      <section style={{ background: "#060A14", borderTop: "1px solid #0D1626", borderBottom: "1px solid #0D1626" }}>
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-sm uppercase tracking-widest mb-4 font-semibold" style={{ color: "#556080" }}>
                До начала вебинара
              </div>
              <div className="flex gap-4 flex-wrap">
                <TimerBlock value={time.days} label="дней" />
                <TimerBlock value={time.hours} label="часов" />
                <TimerBlock value={time.minutes} label="минут" />
                <TimerBlock value={time.seconds} label="секунд" />
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest mb-4 font-semibold" style={{ color: "#556080" }}>
                Доступные места
              </div>
              <SeatsBar total={200} left={seatsLeft} />
              <p className="text-sm mt-3" style={{ color: "#FF6B00" }}>
                ⚡ Высокий спрос! Закройте место прямо сейчас
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 grid-bg" id="benefits">
        <div className="container">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#FF6B00" }}>Что вы получите</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: "#E0EAFF" }}>
              Ключевые <span className="gradient-text-orange">выгоды</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 card-hover"
                style={{ background: "#0A0F1A", border: "1px solid #1A2440" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)" }}>
                  <Icon name={b.icon} fallback="Star" size={22} style={{ color: "#FF6B00" }} />
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: "#E0EAFF" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6678A0" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program ── */}
      <section className="py-20" id="program" style={{ background: "#060A14" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#00D4FF" }}>Расписание</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: "#E0EAFF" }}>
              Программа <span className="gradient-text-blue">вебинара</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto relative timeline-line pl-12">
            {program.map((item, i) => (
              <div key={i} className="relative mb-8">
                <div
                  className="absolute -left-12 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: i === 0 ? "linear-gradient(135deg, #FF6B00, #FF9500)" : "#0A0F1A",
                    border: `2px solid ${i === 0 ? "#FF6B00" : "#1A2440"}`,
                    color: i === 0 ? "#050810" : "#556080",
                    fontFamily: "'Oswald', sans-serif",
                    zIndex: 2
                  }}
                >
                  {i + 1}
                </div>
                <div
                  className="rounded-2xl p-5 card-hover"
                  style={{ background: "#0A0F1A", border: "1px solid #1A2440" }}
                >
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-sm font-bold px-3 py-0.5 rounded-full" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                      {item.time}
                    </span>
                    <h3 className="font-bold uppercase text-sm md:text-base" style={{ color: "#E0EAFF" }}>{item.title}</h3>
                  </div>
                  <p className="text-sm" style={{ color: "#6678A0" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experts ── */}
      <section className="py-20 grid-bg" id="experts">
        <div className="container">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#FF6B00" }}>Спикеры</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: "#E0EAFF" }}>
              Эксперты <span className="gradient-text-orange">вебинара</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {experts.map((e, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden card-hover"
                style={{ background: "#0A0F1A", border: "1px solid #1A2440" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={e.img} alt={e.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A0F1A 0%, transparent 60%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase mb-1" style={{ color: "#E0EAFF" }}>{e.name}</h3>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: "#FF6B00" }}>{e.role}</div>
                  <div className="text-sm mb-3" style={{ color: "#556080" }}>{e.company}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Clock" size={14} style={{ color: "#556080" }} />
                    <span className="text-xs" style={{ color: "#556080" }}>{e.exp}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {e.topics.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bonus Banner ── */}
      <section style={{ background: "#060A14", borderTop: "1px solid #0D1626", borderBottom: "1px solid #0D1626" }}>
        <div className="container py-12">
          <div
            className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.12) 0%, rgba(0,212,255,0.08) 100%)", border: "1px solid rgba(255,107,0,0.3)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ background: "radial-gradient(circle, #FF6B00, transparent)", filter: "blur(40px)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float"
                style={{ background: "linear-gradient(135deg, #FF6B00, #FF9500)", boxShadow: "0 0 30px rgba(255,107,0,0.5)" }}>
                <Icon name="Gift" size={36} style={{ color: "#050810" }} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "#FF6B00" }}>Специальный бонус</div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase mb-2" style={{ color: "#E0EAFF" }}>
                  Чек-лист автоматизации производства
                </h3>
                <p style={{ color: "#8899BB" }}>
                  50 критериев оценки готовности вашего предприятия к внедрению ИИ — получат все зарегистрированные участники
                </p>
              </div>
              <a href="#register" className="flex-shrink-0">
                <button className="glow-btn px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm" style={{ color: "#050810", fontFamily: "'Oswald', sans-serif" }}>
                  Получить бонус
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration ── */}
      <section className="py-20 grid-bg" id="register">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#FF6B00" }}>Регистрация</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4" style={{ color: "#E0EAFF" }}>
                Занять <span className="gradient-text-orange">место</span>
              </h2>
              <p style={{ color: "#6678A0" }}>Осталось <span style={{ color: "#00FF88", fontWeight: "bold" }}>{seatsLeft} мест</span> из 200. Регистрация бесплатна.</p>
            </div>

            {submitted ? (
              <div className="rounded-2xl p-10 text-center animate-fade-in-scale"
                style={{ background: "#0A0F1A", border: "1px solid rgba(0,255,136,0.4)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(0,255,136,0.1)", border: "2px solid rgba(0,255,136,0.5)" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "#00FF88" }} />
                </div>
                <h3 className="text-2xl font-bold uppercase mb-3" style={{ color: "#E0EAFF" }}>Вы зарегистрированы!</h3>
                <p style={{ color: "#6678A0" }}>Детали вебинара и бонусный чек-лист уже летят на вашу почту ✈️</p>
              </div>
            ) : (
              <div className="rounded-2xl p-8" style={{ background: "#0A0F1A", border: "1px solid #1A2440" }}>
                <SeatsBar total={200} left={seatsLeft} />
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  {[
                    { field: "name", label: "Ваше имя", placeholder: "Иван Петров", type: "text" },
                    { field: "email", label: "Email", placeholder: "ivan@company.ru", type: "email" },
                    { field: "company", label: "Компания / предприятие", placeholder: "ООО «Ваше предприятие»", type: "text" },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field}>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "#556080" }}>{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                        style={{
                          background: "#060A14",
                          border: "1px solid #1A2440",
                          color: "#E0EAFF",
                          fontFamily: "'IBM Plex Sans', sans-serif"
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(255,107,0,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(255,107,0,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#1A2440"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}
                  <button type="submit" className="glow-btn w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wider mt-2"
                    style={{ color: "#050810", fontFamily: "'Oswald', sans-serif" }}>
                    Зарегистрироваться бесплатно
                  </button>
                  <p className="text-center text-xs" style={{ color: "#3A4A66" }}>
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" id="faq" style={{ background: "#060A14" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#00D4FF" }}>FAQ</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: "#E0EAFF" }}>
              Частые <span className="gradient-text-blue">вопросы</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── Footer / Contact ── */}
      <footer style={{ background: "#030608", borderTop: "1px solid #0D1626" }}>
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="text-xl font-bold uppercase mb-3 gradient-text-orange" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Автоматизация & ИИ
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#3A4A66" }}>
                Профессиональный вебинар для инженеров и технических руководителей производств
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: "#556080" }}>Навигация</div>
              <div className="flex flex-col gap-2">
                {[["#benefits", "Выгоды"], ["#program", "Программа"], ["#experts", "Эксперты"], ["#register", "Регистрация"], ["#faq", "Вопросы"]].map(([href, label]) => (
                  <a key={href} href={href} className="text-sm transition-colors hover:text-orange-400" style={{ color: "#3A4A66" }}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: "#556080" }}>Контакты</div>
              <div className="space-y-3">
                {[
                  { icon: "Mail", text: "webinar@automation.ru" },
                  { icon: "MessageCircle", text: "Telegram: @automationweb" },
                  { icon: "Phone", text: "+7 (800) 000-00-00" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon name={icon} fallback="Circle" size={16} style={{ color: "#FF6B00" }} />
                    <span className="text-sm" style={{ color: "#3A4A66" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid #0D1626" }}
          >
            <p className="text-xs" style={{ color: "#1A2440" }}>© 2026 Вебинар «Автоматизация и ИИ». Все права защищены.</p>
            <div className="flex gap-4">
              {["Политика конфиденциальности", "Условия использования"].map((t) => (
                <a key={t} href="#" className="text-xs hover:text-orange-400 transition-colors" style={{ color: "#1A2440" }}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}