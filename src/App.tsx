import { useState } from 'react'
import { Home } from './pages/Home'
import { Results } from './pages/Results'
import { Training } from './pages/Training'
import type {
  TrainingConfig,
  TrainingResult,
} from './game/types'

type Screen =
  | 'home'
  | 'training'
  | 'results'

export default function App() {
  const [screen, setScreen] =
    useState<Screen>('home')

  const [trainingConfig, setTrainingConfig] =
    useState<TrainingConfig | null>(null)

  const [result, setResult] =
    useState<TrainingResult | null>(null)

  function handleStart(
    config: TrainingConfig,
  ) {
    setTrainingConfig(config)
    setResult(null)
    setScreen('training')
  }

  function handleFinish(
    trainingResult: TrainingResult,
  ) {
    setResult(trainingResult)
    setScreen('results')
  }

  function handleRestart() {
    setResult(null)
    setScreen('training')
  }

  function handleHome() {
    setTrainingConfig(null)
    setResult(null)
    setScreen('home')
  }

  if (
    screen === 'training' &&
    trainingConfig !== null
  ) {
    return (
      <Training
        config={trainingConfig}
        onFinish={handleFinish}
      />
    )
  }

  if (
    screen === 'results' &&
    trainingConfig !== null &&
    result !== null
  ) {
    return (
      <Results
        result={result}
        onRestart={handleRestart}
        onHome={handleHome}
      />
    )
  }

  return <Home onStart={handleStart} />
}