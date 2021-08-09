import React from 'react';
import { AnswerObject } from '../App';

import { Wrapper, ButtonWrapper } from '../App.styles';

type Props = {
    question: string;
    answers: string[];
    callback: ( event: React.MouseEvent<HTMLButtonElement> ) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> =
    ({
        question,
        answers,
        callback,
        userAnswer,
        questionNumber,
        totalQuestions,
    }) => (
    <Wrapper className="question-card">
        <p className="question-number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }}/>
        <div>
            { answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    correct={ userAnswer?.correctAnswer === answer }
                    userClicked={ userAnswer?.answer === answer }
                >
                    <button
                        value={answer}
                        disabled={ Boolean(userAnswer) }
                        onClick={callback}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
            )) }
        </div>
    </Wrapper>
);

export default QuestionCard;
