"use client";
import { Question } from "@/app/page";
import Grid from "@mui/material/Grid/Grid";
import AnswerButton, { AnswerButtonState } from "./AnswerButton";
import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import { Typography, useTheme } from "@mui/material";
import SuccessAnswerGif from "../../../public/dinosaur-dancing-dino.gif";
import FailedAnswerGif from "../../../public/dinosauro-chillhouse.gif";
import NextImage from "next/image";
import { useWindowSize } from "@/hooks";
import Confetti from "react-confetti";
import { AnswerDialog } from "./AnswerDialog";

export default function Answers({
  question,
  onAnswerQuestion,
}: {
  question: Question;
  onAnswerQuestion: (answer: string | null) => void;
}) {
  // const [answerState, setAnswerState] = useState(AnswerButtonState.default);
  const [answer, setAnswer] = useState<null | string>(null);
  const [showNextDialog, setShowNextDialog] = useState(false);
  const theme = useTheme();

  const [correctAnswerBtn, setCorrectAnswerBtn] = useState<null | string>(null);
  const [pendingStateBtn, setPendingAnswerBtn] = useState<null | string>(null);
  const [failedStateBtn, setFailedAnswerBtn] = useState<null | string>(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const winAudioRef = useRef<HTMLAudioElement>(null);
  const loseAudioRef = useRef<HTMLAudioElement>(null);

  const playWin = () => {
    if (winAudioRef.current) {
      winAudioRef.current.play();
    } else {
      // Throw error
    }
  };

  const playLose = () => {
    if (loseAudioRef.current) {
      loseAudioRef.current.play();
    } else {
      // Throw error
    }
  };

  function selectAnswer(isTrue: boolean, _answer: string) {
    const setRelevantStateBtn = isTrue
      ? setCorrectAnswerBtn
      : setFailedAnswerBtn;

    const setRelevantSound = isTrue ? playWin : playLose;
    setTimeout(() => {
      setRelevantStateBtn(_answer);
      setPendingAnswerBtn(null);
      setRelevantSound();
    }, 3000);
    setTimeout(() => {
      setPendingAnswerBtn(_answer);
      setRelevantStateBtn(null);
    }, 3500);
    setTimeout(() => {
      setRelevantStateBtn(_answer);
      setPendingAnswerBtn(null);
      if (!isTrue) setCorrectAnswerBtn(question.name);
    }, 4000);
    setTimeout(() => {
      if (isTrue) {
        setPendingAnswerBtn(_answer);
        setRelevantStateBtn(null);
      }

      if (!isTrue) setCorrectAnswerBtn(null);
    }, 4500);
    setTimeout(() => {
      if (isTrue) {
        setRelevantStateBtn(_answer);
        setPendingAnswerBtn(null);
      }

      if (!isTrue) setCorrectAnswerBtn(question.name);
    }, 5000);
  }
  const handleAnswerClick = (_answer: string) => {
    setAnswer(_answer);
    setPendingAnswerBtn(_answer);

    const isCorrect = _answer == question.name;

    selectAnswer(isCorrect, _answer);

    setTimeout(() => {
      setShowNextDialog(true);
      setCorrectAnswerBtn(null);
      setPendingAnswerBtn(null);
      setFailedAnswerBtn(null);
    }, 7000);
  };

  const onClickNext = () => {
    setAnswer(null);
    setShowNextDialog(false);
    onAnswerQuestion(answer);
  };

  const getButtonState = (name: string) => {
    if (name == correctAnswerBtn) {
      return AnswerButtonState.correct;
    }

    if (name == failedStateBtn) {
      return AnswerButtonState.false;
    }

    if (name == pendingStateBtn) {
      return AnswerButtonState.pending;
    }

    return AnswerButtonState.default;
  };

  return (
    <Grid container spacing={2}>
      {!!showConfetti && <Confetti width={width} height={height} />}
      <audio ref={winAudioRef} src="/win.mp3" />
      <audio ref={loseAudioRef} src="/lose.mp3" />
      <AnswerDialog
        isCorrect={answer === question.name}
        showDialog={showNextDialog}
        onClickNext={onClickNext}
      />

      {question.userAnswers.map((user, i) => {
        return (
          <Grid item xs={6} key={i}>
            <AnswerButton
              state={getButtonState(user)}
              userName={user}
              disabled={!!answer}
              correctAnswer={question.name}
              onClick={() => handleAnswerClick(user)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
