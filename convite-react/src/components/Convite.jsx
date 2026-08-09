import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Convite.css'

const PAGES = ['capa', 'fotos', 'detalhes']

export default function Convite({ onClose }) {
  const [page, setPage] = useState(0)

  function next() { if (page < PAGES.length - 1) setPage(p => p + 1) }
  function prev() { if (page > 0) setPage(p => p - 1) }

  return (
    <motion.div
      className="convite-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="close-btn" onClick={onClose}>✕</button>

      <motion.div
        className="convite-card"
        initial={{ scale: 0.6, opacity: 0, y: 80 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <AnimatePresence mode="wait">
          {page === 0 && <PageCapa key="capa" />}
          {page === 1 && <PageFotos key="fotos" />}
          {page === 2 && <PageDetalhes key="detalhes" />}
        </AnimatePresence>

        {/* Navegação */}
        <div className="nav-dots">
          {PAGES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === page ? 'active' : ''}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>

        <div className="nav-btns">
          {page > 0 && (
            <button className="nav-btn" onClick={prev}>← Anterior</button>
          )}
          {page < PAGES.length - 1 && (
            <button className="nav-btn primary" onClick={next}>Próximo →</button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function PageCapa() {
  return (
    <motion.div
      className="page page-capa"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className="capa-photo-frame">
        <img src="/foto1.jpeg" alt="Convite" className="capa-photo" />
        <div className="capa-photo-overlay" />
      </div>

      <div className="capa-content">
        <span className="ornament">✦ ❧ ✦</span>
        <p className="subtitle">Com imensa alegria</p>
        <h1 className="names">
          <span>Jonin</span>
          <span className="amp">&</span>
          <span>Noiva</span>
        </h1>
        <div className="divider" />
        <p className="announce">anunciam o seu</p>
        <h2 className="event">NOIVADO</h2>
        <div className="divider" />
        <div className="date-block">
          <span className="date-num">06</span>
          <div className="date-text">
            <span>Setembro</span>
            <span>2025</span>
          </div>
        </div>
        <motion.span
          className="ring"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          💍
        </motion.span>
      </div>
    </motion.div>
  )
}

function PageFotos() {
  return (
    <motion.div
      className="page page-fotos"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <span className="ornament">✦ Nossas Memórias ✦</span>
      <div className="fotos-grid">
        <motion.div
          className="foto-item foto-main"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <img src="/foto2.jpeg" alt="Foto 2" />
        </motion.div>
        <motion.div
          className="foto-item"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src="/foto3.jpeg" alt="Foto 3" />
        </motion.div>
        <motion.div
          className="foto-item"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <img src="/foto1.jpeg" alt="Foto 1" />
        </motion.div>
      </div>
    </motion.div>
  )
}

function PageDetalhes() {
  return (
    <motion.div
      className="page page-detalhes"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className="detalhes-photo">
        <img src="/foto2.jpeg" alt="Casal" />
        <div className="detalhes-photo-overlay" />
      </div>

      <div className="detalhes-content">
        <span className="ornament">✦ ❧ ✦</span>
        <h2 className="detalhes-title">Venha Celebrar</h2>
        <div className="divider" />

        <div className="info-block">
          <span className="info-icon">📅</span>
          <div>
            <p className="info-label">Data</p>
            <p className="info-value">06 de Setembro de 2025</p>
          </div>
        </div>

        <div className="info-block">
          <span className="info-icon">💍</span>
          <div>
            <p className="info-label">Evento</p>
            <p className="info-value">Noivado de Jonin & Noiva</p>
          </div>
        </div>

        <div className="divider" />

        <motion.p
          className="final-msg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ✨ Sua presença é o nosso maior presente ✨
        </motion.p>

        <div className="hearts">
          {['💕', '💍', '💕'].map((h, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
            >
              {h}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
