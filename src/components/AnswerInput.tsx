import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

interface AnswerInputProps {
  onSubmit: (answer: number) => void
  disabled?: boolean
}

export function AnswerInput({
  onSubmit,
  disabled = false,
}: AnswerInputProps) {
  const [value, setValue] = useState('')
  const inputRef =
    useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextValue = event.target.value

    if (/^\d*$/.test(nextValue)) {
      setValue(nextValue)
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (disabled || value === '') {
      return
    }

    const answer = Number(value)

    if (!Number.isSafeInteger(answer)) {
      return
    }

    onSubmit(answer)
    setValue('')

    if (!disabled) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }

  return (
    <form
      className="answer-input"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        aria-label="Sua resposta"
      />

      <button
        type="submit"
        disabled={disabled || value === ''}
      >
        responder
      </button>
    </form>
  )
}