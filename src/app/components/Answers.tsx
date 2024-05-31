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
      {answer === question.name && (
        <Dialog
          open={showNextDialog}
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
              // boxShadow: "10px 5px 5px 3px green",
              border: "1px solid " + theme.palette.success.main,
            },
          }}
        >
          <Box maxHeight={"90%"}>
            <NextImage
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
              src={SuccessAnswerGif}
              alt="success-answer-gif"
            />

            <Box p={4}>
              <Typography variant="h5" mt={2}>
                Ez a beszéd!
              </Typography>
              <Typography variant="h4">
                Készen állsz a következő körre?
              </Typography>

              <Button
                color="secondary"
                variant="contained"
                onClick={onClickNext}
                sx={{
                  textAlign: "center",
                  margin: "auto",
                  mt: 3,
                }}
              >
                Következő kihívás
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
      {answer !== question.name && answer != null && (
        <Dialog
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
              border: "1px solid " + theme.palette.secondary.main,
            },
          }}
          open={showNextDialog}
        >
          <Box p={4}>
            <NextImage
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
              }}
              src={FailedAnswerGif}
              alt="failed-answer-gif"
            />
            <Typography variant="h5" mt={2}>
              Hát ez most nem sikerült! Na sebaj!
            </Typography>
            <Typography variant="h4">
              Készen állsz a következő körre?
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={onClickNext}
              sx={{
                textAlign: "center",
                margin: "auto",
                mt: 3,
              }}
            >
              Következő kihívás
            </Button>{" "}
          </Box>
        </Dialog>
      )}

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
