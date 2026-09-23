import { useState } from 'react'
import { AnswerInput } from '../components/AnswerInput'
import { OperationDisplay } from '../components/OperationDisplay'
import { ProgressBar } from '../components/ProgressBar'
import { Timer } from '../components/Timer'
import { DIFFICULTY_CONFIG } from '../game/difficulty'
import { useTraining } from '../hooks/useTraining'
import type {
  TrainingConfig,
  TrainingResult,
} from '../game/types'

interface TrainingProps {
  config: TrainingConfig
  onFinish: (result: TrainingResult) => void
}

export function Training({
  config,
  onFinish,
}: TrainingProps) {
  const training = useTraining(config)
  const [elapsedTime, setElapsedTime] = useState(0)

  const difficultyConfig =
    DIFFICULTY_CONFIG[config.difficulty]

  function handleAnswer(answer: number) {
    const answerResult =
      training.submitAnswer(answer)

    if (!answerResult.isFinished) {
      return
    }

    const result: TrainingResult = {
      difficulty: config.difficulty,
      totalQuestions: config.questionCount,
      correctAnswers:
        answerResult.correctAnswers,
      wrongAnswers:
        answerResult.wrongAnswers,
      bestCombo: answerResult.bestCombo,
      elapsedTime,
    }

    onFinish(result)
  }

  return (
    <main className="training">
      <section className="training__content">
        <header className="training__header">
          <ProgressBar
            current={training.currentQuestion}
            total={config.questionCount}
          />

          <Timer
            isRunning={!training.isFinished}
            onTimeUpdate={setElapsedTime}
          />
        </header>

        <section className="training__problem">
          <OperationDisplay
            problem={training.currentProblem}
            color={difficultyConfig.color}
          />

          <AnswerInput
            onSubmit={handleAnswer}
            disabled={training.isFinished}
          />
        </section>

        <footer className="training__stats">
          <span>
            acertos: {training.correctAnswers}
          </span>

          <span>
            combo: {training.combo}
          </span>
        </footer>
      </section>
    </main>
  )
}