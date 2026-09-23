import {
  useEffect,
  useRef,
  useState,
} from 'react'

interface TimerProps {
  isRunning: boolean
  onTimeUpdate?: (milliseconds: number) => void
}

export function Timer({
  isRunning,
  onTimeUpdate,
}: TimerProps) {
  const [elapsedTime, setElapsedTime] =
    useState(0)

  const elapsedRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    startTimeRef.current =
      performance.now() - elapsedRef.current

    const intervalId = window.setInterval(() => {
      if (startTimeRef.current === null) {
        return
      }

      const currentTime =
        performance.now() -
        startTimeRef.current

      elapsedRef.current = currentTime
      setElapsedTime(currentTime)
      onTimeUpdate?.(currentTime)
    }, 50)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isRunning, onTimeUpdate])

  const totalSeconds = Math.floor(
    elapsedTime / 1000,
  )

  const minutes = Math.floor(
    totalSeconds / 60,
  )

  const seconds = totalSeconds % 60

  const formattedTime =
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}`

  return (
    <time
      className="timer"
      dateTime={`PT${elapsedTime / 1000}S`}
      aria-label={`Tempo decorrido: ${formattedTime}`}
    >
      {formattedTime}
    </time>
  )
}