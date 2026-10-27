const rings = Array.from({ length: 18 }, (_, i) => i)

export default function Background() {
  return (
    <div className="stage" aria-hidden="true">
      <svg className="swirl" viewBox="-520 -520 1040 1040" fill="none">
        {rings.map((i) => (
          <ellipse
            key={i}
            rx={110 + i * 24}
            ry={50 + i * 15}
            transform={`rotate(${i * 10})`}
            stroke={i % 4 === 0 ? '#c9a45d' : '#3c8a6b'}
            strokeOpacity={i % 4 === 0 ? 0.1 : 0.12}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  )
}
