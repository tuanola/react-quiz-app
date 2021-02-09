import React, { useState } from 'react';
import { fetchQuizQuestions } from './api';

import QuestionCard from './components/QuestionCard';
import { QuestionState, Difficulty } from './api';
import { GlobalStyle, Wrapper, NextStepWrapper } from './App.styles';

export type AnswerObject = {
    question: string;
    answer: string;
    isCorrect: boolean;
    correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY,
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
      if( gameOver ){
          return;
      }

      const currentQuestion = questions[number];
      const answer = event.currentTarget.value;
      const isCorrect = currentQuestion.correct_answer === answer;

      if(isCorrect) setScore( prev => prev + 1 );

      const answerObject = {
          question: currentQuestion.question,
          answer,
          isCorrect,
          correctAnswer: currentQuestion.correct_answer,
      }
      setUserAnswers( prev => [...prev, answerObject]);
  }

  const nextQuestion = () => {
      const nextNumber = number + 1;

      if ( nextNumber === TOTAL_QUESTIONS ) {
          setGameOver(true);
          return;
      }

      setNumber(nextNumber);
  }

  return (
      <>
          <GlobalStyle />
      <Wrapper>
          <h1>Quiz</h1>

          { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <NextStepWrapper>
                <button className="{start-button}" onClick={startQuiz}>
                    Start
                </button>
              </NextStepWrapper>
          ) : null }
          { !gameOver && <p className="score">Score: {score}</p> }
          { loading && <p>Loading Questions ...</p> }
          {!loading && !gameOver && (
            <QuestionCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={ userAnswers ? userAnswers[number] : undefined }
                callback={checkAnswer}
            />
          ) }
          { !gameOver && !loading
            && userAnswers.length === number + 1
            && number !== TOTAL_QUESTIONS - 1 ? (
              <NextStepWrapper>
                  <button
                    className="next-button"
                    onClick={nextQuestion}
                  >
                    Next Question
                  </button>
              </NextStepWrapper>
            ) : null }
      </Wrapper>
      </>
  );
}

export default App;
