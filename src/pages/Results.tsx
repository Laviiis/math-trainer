import { Button } from '../components/Button'
import { DIFFICULTY_CONFIG } from '../game/difficulty'
import type { TrainingResult } from '../game/types'

interface ResultsProps {
  result: TrainingResult
  onRestart: () => void
  onHome: () => void
}

export function Results({
  result,
  onRestart,
  onHome,
}: ResultsProps) {
  const difficultyConfig =
    DIFFICULTY_CONFIG[result.difficulty]

  const accuracy =
    result.totalQuestions > 0
      ? Math.round(
          (result.correctAnswers /
            result.totalQuestions) *
            100,
        )
      : 0

  const totalSeconds = Math.floor(
    result.elapsedTime / 1000,
  )

  const minutes = Math.floor(
    totalSeconds / 60,
  )

  const seconds = totalSeconds % 60

  const formattedTime =
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}`

  return (
    <main className="results">
      <section className="results__content">
        <header className="results__header">
          <span
            className="results__difficulty"
            style={{
              color: difficultyConfig.color,
            }}
          >
            {difficultyConfig.label}
          </span>

          <h1>treino finalizado</h1>
        </header>

        <section
          className="results__summary"
          aria-label="Resultado de precisão"
        >
          <strong>{accuracy}%</strong>

          <span>
            {result.correctAnswers} /{' '}
            {result.totalQuestions}
          </span>
        </section>

        <section
          className="results__stats"
          aria-label="Estatísticas do treino"
        >
          <div>
            <span>tempo</span>
            <strong>{formattedTime}</strong>
          </div>

          <div>
            <span>acertos</span>
            <strong>
              {result.correctAnswers}
            </strong>
          </div>

          <div>
            <span>erros</span>
            <strong>
              {result.wrongAnswers}
            </strong>
          </div>

          <div>
            <span>melhor combo</span>
            <strong>
              {result.bestCombo}
            </strong>
          </div>
        </section>

        <section className="results__actions">
          <Button
            fullWidth
            onClick={onRestart}
          >
            tentar novamente
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={onHome}
          >
            voltar ao início
          </Button>
        </section>
      </section>
    </main>
  )
}