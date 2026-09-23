import { randomInt } from '../utils/random'
import type {
  MathProblem,
  NumberRange,
} from './types'

export function generateAddition(
  range: NumberRange,
): MathProblem {
  const firstNumber = randomInt(
    range.min,
    range.max,
  )

  const secondNumber = randomInt(
    range.min,
    range.max,
  )

  return {
    firstNumber,
    secondNumber,
    operation: 'addition',
    answer: firstNumber + secondNumber,
  }
}

export function generateSubtraction(
  range: NumberRange,
): MathProblem {
  const firstNumber = randomInt(
    range.min,
    range.max,
  )

  const secondNumber = randomInt(
    range.min,
    range.max,
  )

  const largerNumber = Math.max(
    firstNumber,
    secondNumber,
  )

  const smallerNumber = Math.min(
    firstNumber,
    secondNumber,
  )

  return {
    firstNumber: largerNumber,
    secondNumber: smallerNumber,
    operation: 'subtraction',
    answer: largerNumber - smallerNumber,
  }
}

export function generateMultiplication(
  range: NumberRange,
): MathProblem {
  const firstNumber = randomInt(
    range.min,
    range.max,
  )

  const secondNumber = randomInt(
    range.min,
    range.max,
  )

  return {
    firstNumber,
    secondNumber,
    operation: 'multiplication',
    answer: firstNumber * secondNumber,
  }
}

export function generateDivision(
  range: NumberRange,
): MathProblem {
  const validDivisors: number[] = []

  for (
    let divisor = range.min;
    divisor <= range.max;
    divisor += 1
  ) {
    const maxQuotient = Math.floor(
      range.max / divisor,
    )

    if (maxQuotient >= range.min) {
      validDivisors.push(divisor)
    }
  }

  if (validDivisors.length === 0) {
    throw new Error(
      'The configured division range cannot generate a valid integer division.',
    )
  }

  const divisorIndex = randomInt(
    0,
    validDivisors.length - 1,
  )

  const divisor =
    validDivisors[divisorIndex]

  const maxQuotient = Math.floor(
    range.max / divisor,
  )

  const quotient = randomInt(
    range.min,
    maxQuotient,
  )

  const dividend = divisor * quotient

  return {
    firstNumber: dividend,
    secondNumber: divisor,
    operation: 'division',
    answer: quotient,
  }
}