export type Difficulty =
  | 'easy'
  | 'normal'
  | 'hard'
  | 'veryHard'
  | 'insane'

export type Operation =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'

export interface NumberRange {
  min: number
  max: number
}

export interface DifficultyConfig {
  label: string
  color: string
  ranges: Record<Operation, NumberRange>
}

export interface MathProblem {
  firstNumber: number
  secondNumber: number
  operation: Operation
  answer: number
}

export interface TrainingConfig {
  difficulty: Difficulty
  operation?: Operation
  questionCount: number
}

export interface TrainingResult {
  difficulty: Difficulty
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  bestCombo: number
  elapsedTime: number
}