"use client";
import { Question } from "@/app/page";
import Grid from "@mui/material/Grid/Grid";
import AnswerButton, { AnswerButtonState } from "./AnswerButton";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import { Typography, useTheme } from "@mui/material";
import SuccessAnswerGif from "../../public/dinosaur-dancing-dino.gif";
import FailedAnswerGif from "../../public/dinosauro-chillhouse.gif";
import NextImage from "next/image";


export default function Answers({
  question,
  onAnswerQuestion,
}: {
  question: Question;
  onAnswerQuestion: () => void;
}) {
  // const [answerState, setAnswerState] = useState(AnswerButtonState.default);
  const [answer, setAnswer] = useState<null | string>(null);
  const [showNextDialog, setShowNextDialog] = useState(false);
  const theme = useTheme();

  const handleAnswerClick = (answer: string) => {
    setAnswer(answer);
    setTimeout(() => {
      setShowNextDialog(true);
    }, 5000);
    // console.log({ answer });
    // if (answer == question.name) {
    //   setAnswerState(AnswerButtonState.correct);
    // } else {
    //   setAnswerState(AnswerButtonState.false);
    // }
  };

  const onClickNext = () => {
    setAnswer(null);
    setShowNextDialog(false);
    onAnswerQuestion();
  };

  console.log({ answer });
  return (
    <Grid container spacing={2}>
      {answer === question.name && (
        <Dialog
          open={showNextDialog}
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
              boxShadow: "10px 5px 5px 3px green",
              border: "1px solid " + theme.palette.success.main,
            },
          }}
        >
          <Box p={4}>
            <NextImage src={SuccessAnswerGif} alt="success-answer-gif" />

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
        </Dialog>
      )}
      {answer !== question.name && answer != null && (
        <Dialog
          PaperProps={{
            sx: {
              background: theme.palette.background.default,
              boxShadow: "10px 5px 5px 3px red",
              border: "1px solid " + theme.palette.error.main,
            },
          }}
          open={showNextDialog}
        >
          <Box p={4}>
            <NextImage
              style={{
                width: "100%",
                height: "300px",
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
