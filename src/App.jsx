import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import './App.css'

export default function App() {
  const [stage, setStage] = useState('seal')
  function open() { playChime(); setStage('invite') }
  return (
    <AnimatePresence mode="wait">
      {stage === 'seal'
        ? <motion.div key="s" exit={{ opacity: 0, transition: { duration: 0.8 } }}><SealPage onOpen={open} /></motion.div>
        : <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }}><InvitePage onClose={() => setStage('seal')} /></motion.div>
      }
    </AnimatePresence>
  )
}

/* ── SEAL PAGE ── */
function SealPage({ onOpen }) {
  const [pressed, setPressed] = useState(false)
  function handleOpen() {
    if (pressed) return
    setPressed(true)
    playChime()
    setTimeout(onOpen, 900)
  }
  return (
    <div className="seal-page">
      <Dust />
      <motion.div className="seal-box"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
        <p className="seal-eyebrow">um convite especial</p>
        <motion.button className="seal-btn" onClick={handleOpen}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          animate={pressed ? { opacity: 0, y: -24, scale: 0.95 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
          <svg viewBox="0 0 480 320" fill="none" className="seal-svg">
            <rect x="2" y="72" width="476" height="246" rx="1" fill="#0d1b3e" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="2" y1="72" x2="240" y2="200" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.1" />
            <line x1="478" y1="72" x2="240" y2="200" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.1" />
            <line x1="2" y1="318" x2="240" y2="200" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.08" />
            <line x1="478" y1="318" x2="240" y2="200" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.08" />
            <motion.path d="M2 72 L240 202 L478 72 Z" fill="#162550"
              stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.45"
              animate={pressed ? { scaleY: -1 } : { scaleY: 1 }}
              style={{ transformOrigin: '240px 72px' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} />
            <motion.g style={{ transformOrigin: '240px 200px' }}
              animate={pressed ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <circle cx="240" cy="200" r="30" fill="#0d1b3e" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="240" cy="200" r="23" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.3" />
              <text x="240" y="206" textAnchor="middle" fontFamily="'Great Vibes', cursive"
                fontSize="14" fill="#c9a84c" opacity="0.9" letterSpacing="2">K &amp; J</text>
            </motion.g>
          </svg>
        </motion.button>
        <motion.p className="seal-hint"
          animate={pressed ? { opacity: 0 } : { opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
          toque para abrir
        </motion.p>
      </motion.div>
    </div>
  )
}

/* ── INVITE PAGE ── */
function InvitePage({ onClose }) {
  return (
    <div className="invite">
      <button className="close-btn" onClick={onClose} aria-label="fechar">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>
      <Hero />
      <Celebration />
      <Quote />
      <Venue />
      <Footer />
    </div>
  )
}

/* ── HERO ── */
function Hero() {
  const ref = useRef(null)
  const [zoomed, setZoomed] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section className="hero" ref={ref}>
      {zoomed && (
        <div className="hero-zoom-layer" onClick={() => setZoomed(false)}>
          <img src="/convite.jpeg" alt="Convite ampliado" className="hero-zoom-img" />
        </div>
      )}

      <div className="hero-photo-side">
        <motion.div style={{ position: 'absolute', inset: '-20%', y: imgY }}>
          <img src="/foto4.jpeg" alt="" />
        </motion.div>
        <div className="hero-photo-overlay" />
      </div>

      <motion.div className="hero-invite-side" style={{ opacity: fadeOut }}>
        <Rise delay={0.3}>
          <motion.div className="hero-invite-frame" onClick={() => setZoomed(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <img src="/convite.jpeg" alt="Convite de Noivado Karine e Jonas" className="hero-invite-img" />
          </motion.div>
        </Rise>
        <div className="hero-zoom-hint">
          toque para ampliar
        </div>
      </motion.div>

      <motion.div className="hero-arrow" style={{ opacity: fadeOut }}
        animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}>
        <span>deslize para explorar</span>
        <svg width="22" height="42" viewBox="0 0 22 42" fill="none" aria-hidden="true">
          <path d="M11 1v37M4 31l7 8 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  )
}

/* ── CELEBRATION — nomes + data ── */
function Celebration() {
  return (
    <section className="celebration">
      <Rise>
        <div className="celebration-inner">
          <span className="corner-tl" />
          <span className="corner-br" />
          <div className="rsvp-content">
            <p className="rsvp-title">confirme sua presença</p>
            <a className="rsvp-btn"
              href="https://docs.google.com/forms/d/e/1FAIpQLSc7MV54JAOYJEVeEj0s7QsyisgWqUhrxvbnLehkTeqJ_wxm5w/viewform"
              target="_blank"
              rel="noreferrer">
              clique aqui
            </a>
            <p className="rsvp-note">Até 30/08</p>
          </div>
        </div>
      </Rise>
    </section>
  )
}

/* ── QUOTE ── */
function Quote() {
  return (
    <section className="quote-sec">
      <Rise>
        <div className="quote-inner">
          <div className="quote-rule" />
          <blockquote className="quote-text">
            "E n&oacute;s conhecemos, e cremos no amor que Deus nos tem. Deus &eacute; amor;<br />
            e quem est&aacute; em amor est&aacute; em Deus, e Deus nele."
          </blockquote>
          <cite className="quote-cite">1 Jo&atilde;o 4:16</cite>
          <div className="quote-rule" />
        </div>
      </Rise>
    </section>
  )
}

/* ── VENUE ── */
function Venue() {
  return (
    <section className="venue">
      <div className="venue-img">
        <img src="/foto3.jpeg" alt="" />
        <div className="venue-scrim" />
      </div>
      <Rise>
        <div className="venue-info">
          <span className="label venue-label">onde nos encontrar</span>
          <address className="venue-addr">
            <span className="venue-name">Cerejeira Espaço de Eventos</span>
            <span>R. Indiana, 84 — Cidade Ariston</span>
            <span>Estela Azevedo, Carapicuíba — SP</span>
            <span>CEP 06395-090</span>
          </address>
          <div className="venue-maps">
            <a className="venue-map-btn"
              href="https://www.google.com/maps/search/?api=1&query=Cerejeira+Espa%C3%A7o+de+Eventos+R.+Indiana+84+Carapicu%C3%ADba+SP"
              target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>
                <strong>Google Maps</strong>
                <small>abrir rota</small>
              </span>
            </a>
            <a className="venue-map-btn"
              href="https://waze.com/ul?q=Cerejeira+Espa%C3%A7o+de+Eventos+Carapicu%C3%ADba+SP&navigate=yes"
              target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
              <span>
                <strong>Waze</strong>
                <small>navegar agora</small>
              </span>
            </a>
          </div>
        </div>
      </Rise>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="footer">
      <Rise>
        <span className="footer-pre">com amor</span>
        <h2 className="footer-names">Karine &amp; Jonas</h2>
        <span className="footer-rule" />
      </Rise>
    </footer>
  )
}

/* ── HELPERS ── */
function Rise({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

function Dust() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    s: 1 + Math.random() * 1.5,
    d: 10 + Math.random() * 14,
    dl: Math.random() * 16,
  }))
  return (
    <div className="dust" aria-hidden>
      {pts.map(p => (
        <motion.span key={p.id} className="dust-dot"
          style={{ left: `${p.x}%`, width: p.s, height: p.s }}
          animate={{ y: ['-2vh', '104vh'], opacity: [0, 0.45, 0] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: 'linear' }} />
      ))}
    </div>
  )
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ;[440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'; o.frequency.value = f
      const t = ctx.currentTime + i * 0.15
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.05, t + 0.05)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3)
      o.start(t); o.stop(t + 3)
    })
  } catch (_) {}
}
 