import type {
  Difficulty,
  DifficultyConfig,
  Operation,
} from './types'

const range = (
  min: number,
  max: number,
) => ({
  min,
  max,
})

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  DifficultyConfig
> = {
  easy: {
    label: 'Fácil',
    color: '#22C55E',
    ranges: {
      addition: range(1, 10),
      subtraction: range(1, 10),
      multiplication: range(1, 10),
      division: range(1, 10),
    },
  },

  normal: {
    label: 'Normal',
    color: '#3B82F6',
    ranges: {
      addition: range(1, 50),
      subtraction: range(1, 50),
      multiplication: range(1, 20),
      division: range(1, 20),
    },
  },

  hard: {
    label: 'Difícil',
    color: '#F97316',
    ranges: {
      addition: range(1, 200),
      subtraction: range(1, 200),
      multiplication: range(1, 50),
      division: range(1, 50),
    },
  },

  veryHard: {
    label: 'Muito difícil',
    color: '#A855F7',
    ranges: {
      addition: range(1, 1_000),
      subtraction: range(1, 1_000),
      multiplication: range(1, 200),
      division: range(1, 200),
    },
  },

  insane: {
    label: 'Insano',
    color: '#EF4444',
    ranges: {
      addition: range(1, 10_000),
      subtraction: range(1, 10_000),
      multiplication: range(1, 1_000),
      division: range(1, 1_000),
    },
  },
}

export const OPERATIONS: readonly Operation[] = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
]