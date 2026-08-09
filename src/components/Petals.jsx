import { useEffect, useState } from 'react'

const EMOJIS = ['🌸', '🌹', '✨', '💫', '🌺', '💐']

export default function Petals() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const list = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      size: 14 + Math.random() * 14,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    }))
    setPetals(list)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      {petals.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-40px',
            fontSize: p.size,
            animation: `petalFall ${p.duration}s ${p.delay}s linear forwards`
          }}
        >
          {p.emoji}
        </span>
      ))}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
