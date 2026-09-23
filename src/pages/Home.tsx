import { useState } from 'react'
import { Button } from '../components/Button'
import { DifficultySelector } from '../components/DifficultySelector'
import type {
  Difficulty,
  Operation,
} from '../game/types'

export interface TrainingConfig {
  difficulty: Difficulty
  operation?: Operation
  questionCount: number
}

interface HomeProps {
  onStart: (config: TrainingConfig) => void
}

const questionOptions = [10, 20, 30, 50]

const operationOptions: Array<{
  value: Operation | 'random'
  label: string
}> = [
  { value: 'random', label: 'Aleatório' },
  { value: 'addition', label: 'Adição' },
  { value: 'subtraction', label: 'Subtração' },
  { value: 'multiplication', label: 'Multiplicação' },
  { value: 'division', label: 'Divisão' },
]

export function Home({ onStart }: HomeProps) {
  const [difficulty, setDifficulty] =
    useState<Difficulty>('easy')

  const [operation, setOperation] =
    useState<Operation | 'random'>('random')

  const [questionCount, setQuestionCount] =
    useState(20)

  function handleStart() {
    onStart({
      difficulty,
      operation:
        operation === 'random'
          ? undefined
          : operation,
      questionCount,
    })
  }

  return (
    <main className="home">
      <section className="home__content">
        <header className="home__header">
          <h1>Math</h1>
          <p>treine sua velocidade de cálculo mental.</p>
        </header>

        <section className="home__settings">
          <div className="setting">
            <h2>Dificuldade</h2>

            <DifficultySelector
              value={difficulty}
              onChange={setDifficulty}
            />
          </div>

          <div className="setting">
            <h2>Operação</h2>

            <select
              value={operation}
              onChange={(event) =>
                setOperation(
                  event.target.value as
                    | Operation
                    | 'random',
                )
              }
            >
              {operationOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="setting">
            <h2>Questões</h2>

            <div className="question-options">
              {questionOptions.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={
                    amount === questionCount
                      ? 'question-option question-option--selected'
                      : 'question-option'
                  }
                  aria-pressed={amount === questionCount}
                  onClick={() =>
                    setQuestionCount(amount)
                  }
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
        </section>

        <Button
          fullWidth
          onClick={handleStart}
        >
          começar treino
        </Button>
      </section>
    </main>
  )
}