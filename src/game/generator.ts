import { randomItem } from '../utils/random'
import {
  DIFFICULTY_CONFIG,
  OPERATIONS,
} from './difficulty'
import {
  generateAddition,
  generateDivision,
  generateMultiplication,
  generateSubtraction,
} from './operations'
import type {
  Difficulty,
  MathProblem,
  Operation,
} from './types'

export function generateProblem(
  difficulty: Difficulty,
  operation?: Operation,
): MathProblem {
  const config =
    DIFFICULTY_CONFIG[difficulty]

  const selectedOperation =
    operation ?? randomItem(OPERATIONS)

  const range =
    config.ranges[selectedOperation]

  switch (selectedOperation) {
    case 'addition':
      return generateAddition(range)

    case 'subtraction':
      return generateSubtraction(range)

    case 'multiplication':
      return generateMultiplication(range)

    case 'division':
      return generateDivision(range)
  }
}