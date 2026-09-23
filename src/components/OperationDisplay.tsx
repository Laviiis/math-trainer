import type { MathProblem } from '../game/types'

interface OperationDisplayProps {
  problem: MathProblem
  color: string
}

const operationSymbols: Record<
  MathProblem['operation'],
  string
> = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
}

export function OperationDisplay({
  problem,
  color,
}: OperationDisplayProps) {
  const symbol =
    operationSymbols[problem.operation]

  return (
    <div
      className="operation-display"
      style={{ color }}
      aria-label={
        `${problem.firstNumber} ` +
        `${symbol} ` +
        `${problem.secondNumber}`
      }
    >
      <span>{problem.firstNumber}</span>

      <span aria-hidden="true">
        {symbol}
      </span>

      <span>{problem.secondNumber}</span>
    </div>
  )
}