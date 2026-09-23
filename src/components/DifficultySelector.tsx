import type { CSSProperties } from 'react'
import { DIFFICULTY_CONFIG } from '../game/difficulty'
import type { Difficulty } from '../game/types'

interface DifficultySelectorProps {
  value: Difficulty
  onChange: (difficulty: Difficulty) => void
}

const difficulties: readonly Difficulty[] = [
  'easy',
  'normal',
  'hard',
  'veryHard',
  'insane',
]

export function DifficultySelector({
  value,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="difficulty-selector">
      {difficulties.map((difficulty) => {
        const config =
          DIFFICULTY_CONFIG[difficulty]

        const isSelected =
          value === difficulty

        return (
          <button
            key={difficulty}
            type="button"
            className={
              isSelected
                ? 'difficulty-option difficulty-option--selected'
                : 'difficulty-option'
            }
            style={
              {
                '--difficulty-color':
                  config.color,
              } as CSSProperties
            }
            aria-pressed={isSelected}
            onClick={() =>
              onChange(difficulty)
            }
          >
            <span className="difficulty-option__label">
              {config.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}