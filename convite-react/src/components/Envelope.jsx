import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Envelope.css'

export default function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [flapOpen, setFlapOpen] = useState(false)

  function handleClick() {
    if (opening) return
    setOpening(true)
    setTimeout(() => setFlapOpen(true), 300)
    setTimeout(() => onOpen(), 900)
  }

  return (
    <motion.div
      className="envelope-scene"
      initial={{ scale: 0.5, opacity: 0, y: 60 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.p
        className="hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        ✦ Toque para abrir ✦
      </motion.p>

      <motion.div
        className={`envelope ${opening ? 'shaking' : ''}`}
        onClick={handleClick}
        whileHover={{ scale: 1.04, y: -6 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Corpo do envelope */}
        <div className="env-body">
          {/* Foto de fundo dentro do envelope */}
          <div className="env-inner-photo">
            <img src="/foto1.jpeg" alt="convite" />
          </div>

          {/* Dobras laterais */}
          <div className="env-fold-left" />
          <div className="env-fold-right" />
          <div className="env-fold-bottom" />

          {/* Lacre */}
          <motion.div
            className="env-seal"
            animate={flapOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            💍
          </motion.div>
        </div>

        {/* Aba superior */}
        <motion.div
          className="env-flap"
          animate={flapOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
        />
      </motion.div>
    </motion.div>
  )
}
