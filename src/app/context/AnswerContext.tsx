"use client";

import { createContext, ReactNode, useState } from "react";
import { AnswerButtonState } from "../components/AnswerButton";

export const AnswerContext = createContext<{
  answers: Record<string, { state: AnswerButtonState; description: string }>;
  setAnswers: (
    value: Record<string, { state: AnswerButtonState; description: string }>
  ) => void;
  setAnswer: (
    index: number,
    answer: AnswerButtonState,
    description?: string
  ) => void;
}>({
  answers: {},
  setAnswers: ({}) => {},
  setAnswer: (
    index: number,
    answer: AnswerButtonState,
    description?: string
  ) => {},
});

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<
    Record<string, { state: AnswerButtonState; description: string }>
  >({});

  function setAnswer(
    index: number,
    answer: AnswerButtonState,
    description?: string
  ) {
    setAnswers({
      ...answers,
      [index.toString()]: {
        description: description || answers[index].description,
        state: answer,
      },
    });
  }
  return (
    <AnswerContext.Provider value={{ answers, setAnswer, setAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};
