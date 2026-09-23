import { useCallback, useState } from 'react';
import { generateProblem } from '../game/generator';
function createInitialState(config) {
    return {
        currentProblem: generateProblem(config.difficulty, config.operation),
        currentQuestion: 1,
        correctAnswers: 0,
        wrongAnswers: 0,
        combo: 0,
        bestCombo: 0,
        isFinished: false,
    };
}
export function useTraining(config) {
    const [state, setState] = useState(() => createInitialState(config));
    const submitAnswer = useCallback((answer) => {
        if (state.isFinished) {
            return {
                isCorrect: false,
                isFinished: true,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                bestCombo: state.bestCombo,
            };
        }
        const isCorrect = answer === state.currentProblem.answer;
        const correctAnswers = state.correctAnswers +
            (isCorrect ? 1 : 0);
        const wrongAnswers = state.wrongAnswers +
            (isCorrect ? 0 : 1);
        const combo = isCorrect
            ? state.combo + 1
            : 0;
        const bestCombo = Math.max(state.bestCombo, combo);
        const isFinished = state.currentQuestion >=
            config.questionCount;
        setState({
            currentProblem: isFinished
                ? state.currentProblem
                : generateProblem(config.difficulty, config.operation),
            currentQuestion: isFinished
                ? state.currentQuestion
                : state.currentQuestion + 1,
            correctAnswers,
            wrongAnswers,
            combo,
            bestCombo,
            isFinished,
        });
        return {
            isCorrect,
            isFinished,
            correctAnswers,
            wrongAnswers,
            bestCombo,
        };
    }, [config, state]);
    const restart = useCallback(() => {
        setState(createInitialState(config));
    }, [config]);
    return {
        ...state,
        submitAnswer,
        restart,
    };
}
