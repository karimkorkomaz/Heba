import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

/**
 * =========================
 * EDIT THESE (CUSTOMIZATION)
 * =========================
 */
const CONFIG = {
  herName: "Heba Annan",
  yourName: "Karim",
  dateLine: "Christmas 2025",
  heroTitle: "My Princess",
  heroSubtitle:
    "This website is a tiny universe I built as a christmas gift since I am broke. ",
  loveLetter: `Hey you,

I know this year was one of the worst. You've been through a lot of downs, and struggled through a lot. 

I want to remind you that I'm always here to support you, and make you become the best version of yourself.

You're smart, funny, kind hearted and the best gym partner i've ever had.Overall, you're an amazing person.

kteer cringe hayda shi yele 3melto bas I couldn't think of any better ideas.

Thank you for being you.
Merry Christmas, my favorite person.

— ${"Karim"}`,
  // Add/replace reasons:
  reasons: [
    "Your cheeks are my favourite things to play with ",
    "You listen with your whole heart.",
    "You’re one of the very few people I can trust",
    "You're the best gym partner anyone could ever ask for",
    "You inspire me to be better.",
    "You're YOU",
  ],
  // Add your images here (put files in /public/memories and reference them like below)
  // Or use external URLs.
  memories: [
    {
      src: "/memories/memory1.jpg",
      title: "Bowling",
      note: "You suck at bowling",
      date: "6 December 2025",
    },
    {
      src: "/memories/placeholder2.jpeg",
      title: "Leg Days",
      note: "Leg days are your favourite days",
      date: "28 November 2025",
    },
    {
      src: "/memories/placeholder3.jpeg",
      title: "Farm Stuff you look cute in",
      note: "The cutest Argiculture engineer in lebanon",
      date: "—",
    },
    {
      src: "/memories/placeholder4.jpeg",
      title: "Our Random Gym pics",
      note: "Shoulder Workouts are your worst nightmare",
      date: "—",
    },

    {
      src: "/memories/placeholder5.jpeg",
      title: "Your cheeks",
      note: "I could eat your cheeks raw",
      date: "—",
    },
    {
      src: "/memories/placeholder6.jpeg",
      title: "The day you beat me at darts",
      note: "Next time i'll beat your ass",
      date: "—",
    },
    {
      src: "/memories/placeholder7.jpeg",
      title: "Our Random Gym pics",
      note: "You have progressed a lot",
      date: "—",
    },
     
  ],

  video: {
    src: "/memories/our-video.mp4",
    title: "Our Funniest gym video",
    note: "One more memory, in motion 🤍",
    poster: "/memories/video-poster.jpg", // optional
  },
  
};

function useTypewriter(text, speed = 22) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}

function SnowCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const flakes = Array.from({ length: Math.min(220, Math.floor(w / 6)) }).map(
      () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.6,
        s: 0.3 + Math.random() * 1.2,
        d: Math.random() * Math.PI * 2,
      })
    );

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.beginPath();
      for (const f of flakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      }
      ctx.fill();

      for (const f of flakes) {
        f.y += f.s;
        f.x += Math.sin(f.d) * 0.6;
        f.d += 0.01;

        if (f.y > h + 10) {
          f.y = -10;
          f.x = Math.random() * w;
        }
        if (f.x > w + 10) f.x = -10;
        if (f.x < -10) f.x = w + 10;
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}

function Lightbox({ open, onClose, memory }) {
  return (
    <AnimatePresence>
      {open && memory && (
        <motion.div
          className="lightboxBack"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="lightbox"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 25, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 25, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <img src={memory.src} alt={memory.title} />
            <div className="lightboxMeta">
              <div>
                <h3>{memory.title}</h3>
                <p className="muted">{memory.date}</p>
              </div>
              <p className="note">{memory.note}</p>
            </div>
            <button className="btn ghost closeBtn" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const typed = useTypewriter(CONFIG.heroSubtitle, 18);

  const [letterOpen, setLetterOpen] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(0);

  const [lbOpen, setLbOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const reasons = useMemo(() => CONFIG.reasons, []);
  const memories = useMemo(() => CONFIG.memories, []);

  const nextReason = () => setReasonIndex((i) => (i + 1) % reasons.length);
  const prevReason = () =>
    setReasonIndex((i) => (i - 1 + reasons.length) % reasons.length);

  const openMemory = (m) => {
    setSelected(m);
    setLbOpen(true);
  };

  return (
    <div className="page">
      <SnowCanvas />

      <header className="topbar">
        <div className="brand">
          <span className="dot" />
          <span className="brandText">
            For <b>{CONFIG.herName}</b>
          </span>
        </div>
        <div className="chip">{CONFIG.dateLine}</div>
      </header>

      {/* HERO */}
      <section className="hero">
        <motion.div
          className="heroCard"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="kicker">A Christmas page, for Heba</p>
          <h1>{CONFIG.heroTitle}</h1>
          <p className="subtitle">{typed}</p>

          <div className="heroActions">
            <a className="btn" href="#letter">
              Open your gift 🎁
            </a>
            <a className="btn ghost" href="#memories">
              Our memories ✨
            </a>
          </div>

          <div className="signature">
            <span className="muted">— from</span> {CONFIG.yourName}
          </div>
        </motion.div>

        <motion.div
          className="floating"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
        </motion.div>
      </section>

      {/* LETTER */}
      <section className="section" id="letter">
        <div className="sectionHead">
          <h2>Your letter</h2>
          <p className="muted">
            Tap to open. This is the part that’s meant to stay with you.
          </p>
        </div>

        <div className="grid2">
          <motion.button
            className={`envelope ${letterOpen ? "open" : ""}`}
            onClick={() => setLetterOpen((v) => !v)}
            whileTap={{ scale: 0.98 }}
            aria-label="Open letter"
          >
            <div className="envTop" />
            <div className="envBody">
              <div className="stamp">★</div>
              <div className="envText">
                <div className="toLine">To: {CONFIG.herName}</div>
                <div className="fromLine">From: {CONFIG.yourName}</div>
              </div>
            </div>
            <div className="envShadow" />
          </motion.button>

          <AnimatePresence mode="wait">
            {letterOpen ? (
              <motion.div
                key="letter-open"
                className="paper"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35 }}
              >
                <pre className="letterText">{CONFIG.loveLetter}</pre>
                <div className="paperFooter">
                  <span className="muted">P.S.</span> You’re my favorite constant.
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="letter-closed"
                className="paper hint"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35 }}
              >
                <p className="bigHint">Tap the envelope to open your letter 💌</p>
               
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* REASONS */}
      <section className="section">
        <div className="sectionHead">
          <h2>Reasons you’re my princess</h2>
          <p className="muted">A few… out of a thousand.</p>
        </div>

        <div className="reasons">
          <button className="btn ghost small" onClick={prevReason}>
            ◀
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={reasonIndex}
              className="reasonCard"
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <div className="reasonBadge">#{String(reasonIndex + 1).padStart(2, "0")}</div>
              <p className="reasonText">{reasons[reasonIndex]}</p>
              <div className="dots">
                {reasons.map((_, i) => (
                  <span
                    key={i}
                    className={`dotMini ${i === reasonIndex ? "active" : ""}`}
                    onClick={() => setReasonIndex(i)}
                    role="button"
                    tabIndex={0}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="btn ghost small" onClick={nextReason}>
            ▶
          </button>
        </div>
      </section>

      {/* MEMORIES */}
      <section className="section" id="memories">
        <div className="sectionHead">
          <h2>Our Gallery</h2>
         
        </div>

        <div className="gallery">
          {memories.map((m, idx) => (
            <motion.button
              key={idx}
              className="tile"
              onClick={() => openMemory(m)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
            >
              <img src={m.src} alt={m.title} />
              <div className="tileOverlay">
                <div className="tileTitle">{m.title}</div>
                <div className="tileNote">{m.note}</div>
              </div>
            </motion.button>
          ))}
        </div>

        <Lightbox
          open={lbOpen}
          onClose={() => setLbOpen(false)}
          memory={selected}
        />
      </section>


      {/* VIDEO */}
<div className="videoBlock">
  <div className="videoHead">
    <h3>{CONFIG.video.title}</h3>
    <p className="muted">{CONFIG.video.note}</p>
  </div>

  <div className="videoFrame">
    <video
      controls
      playsInline
      preload="metadata"
      poster={CONFIG.video.poster}
    >
      <source src={CONFIG.video.src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>


      {/* PROMISE */}
      <section className="section">
        <div className="promise">
          <h2>Always, in every season.</h2>
          <p className="muted">
            No matter what the year brings—good days, hard days, loud days, quiet
            days—I’m always here. This is only the beginning of more great memories.
          </p>
          <div className="promiseRow">
            <div className="pill">✨ Support</div>
            <div className="pill">🧠 Understanding</div>
            <div className="pill">😂 Laughs</div>
            <div className="pill">🫶 Loyalty</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerCard">
          <div>
            <div className="footerTitle">
              Made for <b>{CONFIG.herName}</b>
            </div>
            <div className="muted">with love — {CONFIG.yourName}</div>
          </div>
          <a className="btn small" href="#top" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:"smooth"})}}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
