interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const safeTotal = Math.max(total, 1)

  const safeCurrent = Math.min(
    Math.max(current, 0),
    safeTotal,
  )

  const progress =
    safeCurrent / safeTotal

  return (
    <div
      className="progress"
      aria-label={`Questão ${current} de ${total}`}
    >
      <div className="progress__text">
        {current} / {total}
      </div>

      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div
          className="progress__fill"
          style={{
            width: `${progress * 100}%`,
          }}
        />
      </div>
    </div>
  )
}