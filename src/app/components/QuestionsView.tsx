"use client";
import { Question } from "@/app/page";
import QuestionView from "./QuestionView";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnswerContext } from "../context/AnswerContext";
import { AnswerButtonState } from "./AnswerButton";

export default function QuestionsView({
  questions,
}: {
  questions: Question[];
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();
  const { answers, setAnswers, setAnswer } = useContext(AnswerContext);

  useEffect(() => {
    const answersObject: Record<
      string,
      { state: AnswerButtonState; description: string }
    > = {};
    questions.forEach((question, i) => {
      answersObject[i] = {
        state: AnswerButtonState.default,
        description: question.description,
      };
    });

    setAnswers(answersObject);
  }, []);

  if (!questions || !questions[questionIndex]) return null;

  const onAnswer = (answer: string | null) => {
    if (questionIndex == questions.length - 1) {
      return router.push("/end");
    }
    const currentQuestion = questions[questionIndex];

    if (!answer) {
      setAnswer(questionIndex, AnswerButtonState.default);
    } else {
      setAnswer(
        questionIndex,
        answer === currentQuestion.name
          ? AnswerButtonState.correct
          : AnswerButtonState.false
      );
    }
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <QuestionView
      question={questions[questionIndex]}
      onAnswerQuestion={onAnswer}
    />
  );
}
