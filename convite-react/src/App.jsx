import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

export default function App() {
  const [aberto, setAberto] = useState(false)

  function abrir() {
    playSound()
    setAberto(true)
  }

  return (
    <div className="bg">
      <AnimatePresence mode="wait">
        {!aberto ? (
          <motion.div
            key="envelope"
            className="envelope-scene"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.7 }}
          >
            <p className="hint">toque para abrir</p>
            <Envelope onOpen={abrir} />
          </motion.div>
        ) : (
          <motion.div
            key="convite"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Convite onClose={() => setAberto(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Envelope({ onOpen }) {
  const [abrindo, setAbrindo] = useState(false)

  function click() {
    if (abrindo) return
    setAbrindo(true)
    setTimeout(onOpen, 900)
  }

  return (
    <motion.div className="envelope" onClick={click} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
      <motion.div
        className="env-aba"
        animate={abrindo ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'top center' }}
      />
      <div className="env-corpo">
        <div className="env-flores-topo" />
        <motion.div
          className="env-lacre"
          animate={abrindo ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <span>K <span className="env-e">&</span> J</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Convite({ onClose }) {
  return (
    <div className="convite">
      <button className="fechar" onClick={onClose}>✕</button>

      {/* Flores canto superior esquerdo */}
      <div className="flores-tl" />
      {/* Flores canto inferior direito */}
      <div className="flores-br" />

      {/* Conteúdo */}
      <div className="convite-body">
        <motion.h1
          className="nome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Karine
        </motion.h1>

        <motion.p
          className="ampersand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          &
        </motion.p>

        <motion.h1
          className="nome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Jonas
        </motion.h1>

        <motion.p
          className="subtitulo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          CONVIDAMOS VOCÊ PARA O NOSSO NOIVADO
        </motion.p>

        <motion.div
          className="data-bloco"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <span className="data-mes">SET</span>
          <div className="data-linha">
            <div className="data-lado">
              <span className="data-label">DOMINGO</span>
              <div className="data-traço" />
            </div>
            <motion.span
              className="data-dia"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              06
            </motion.span>
            <div className="data-lado">
              <div className="data-traço" />
              <span className="data-label">13H</span>
            </div>
          </div>
          <span className="data-ano">2026</span>
        </motion.div>

        <motion.p
          className="versiculo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          "As muitas águas não apagariam este amor,<br />
          nem os rios o afogariam." Cânticos 8:7
        </motion.p>

        <motion.p
          className="endereco"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          R. INDIANA, 84 - CIDADE ARISTON<br />
          ESTELA AZEVEDO, CARAPICUÍBA - SP
        </motion.p>
      </div>
    </div>
  )
}

function playSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ;[261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq
      const t = ctx.currentTime + i * 0.1
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.07, t + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2)
      osc.start(t); osc.stop(t + 2)
    })
  } catch (e) {}
}
