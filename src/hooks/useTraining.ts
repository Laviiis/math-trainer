import { useCallback, useState } from 'react'
import { generateProblem } from '../game/generator'
import type {
  MathProblem,
  TrainingConfig,
} from '../game/types'

export interface TrainingState {
  currentProblem: MathProblem
  currentQuestion: number
  correctAnswers: number
  wrongAnswers: number
  combo: number
  bestCombo: number
  isFinished: boolean
}

export interface AnswerResult {
  isCorrect: boolean
  isFinished: boolean
  correctAnswers: number
  wrongAnswers: number
  bestCombo: number
}

interface UseTrainingResult extends TrainingState {
  submitAnswer: (answer: number) => AnswerResult
  restart: () => void
}

function createInitialState(
  config: TrainingConfig,
): TrainingState {
  return {
    currentProblem: generateProblem(
      config.difficulty,
      config.operation,
    ),
    currentQuestion: 1,
    correctAnswers: 0,
    wrongAnswers: 0,
    combo: 0,
    bestCombo: 0,
    isFinished: false,
  }
}

export function useTraining(
  config: TrainingConfig,
): UseTrainingResult {
  const [state, setState] =
    useState<TrainingState>(() =>
      createInitialState(config),
    )

  const submitAnswer = useCallback(
    (answer: number): AnswerResult => {
      if (state.isFinished) {
        return {
          isCorrect: false,
          isFinished: true,
          correctAnswers: state.correctAnswers,
          wrongAnswers: state.wrongAnswers,
          bestCombo: state.bestCombo,
        }
      }

      const isCorrect =
        answer === state.currentProblem.answer

      const correctAnswers =
        state.correctAnswers +
        (isCorrect ? 1 : 0)

      const wrongAnswers =
        state.wrongAnswers +
        (isCorrect ? 0 : 1)

      const combo = isCorrect
        ? state.combo + 1
        : 0

      const bestCombo = Math.max(
        state.bestCombo,
        combo,
      )

      const isFinished =
        state.currentQuestion >=
        config.questionCount

      setState({
        currentProblem: isFinished
          ? state.currentProblem
          : generateProblem(
              config.difficulty,
              config.operation,
            ),
        currentQuestion: isFinished
          ? state.currentQuestion
          : state.currentQuestion + 1,
        correctAnswers,
        wrongAnswers,
        combo,
        bestCombo,
        isFinished,
      })

      return {
        isCorrect,
        isFinished,
        correctAnswers,
        wrongAnswers,
        bestCombo,
      }
    },
    [config, state],
  )

  const restart = useCallback(() => {
    setState(createInitialState(config))
  }, [config])

  return {
    ...state,
    submitAnswer,
    restart,
  }
}