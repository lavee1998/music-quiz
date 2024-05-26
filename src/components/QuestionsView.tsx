"use client";
import { Question } from "@/app/page";
import QuestionView from "./QuestionView";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionsView({
  questions,
}: {
  questions: Question[];
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter()

  if (!questions || !questions[questionIndex]) return null;

  return (
    <QuestionView
      question={questions[questionIndex]}
      onAnswerQuestion={() => {
        if (questionIndex == questions.length -1) {
          return router.push('/')
        }
        setQuestionIndex(questionIndex + 1);
      }}
    />
  );
}
