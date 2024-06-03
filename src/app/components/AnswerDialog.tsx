"use client;";

import { Button, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Dialog from "@mui/material/Dialog/Dialog";
import NextImage from "next/image";
import WinDino1 from "../../../public/win-dino-1.gif";
import WinDino2 from "../../../public/win-dino-2.gif";
import WinDino3 from "../../../public/win-dino-3.gif";
import WinDino4 from "../../../public/win-dino-4.gif";
import WinDino5 from "../../../public/win-dino-5.gif";
import LoseDino1 from "../../../public/failed-dino-1.gif";
import LoseDino2 from "../../../public/failed-dino-2.gif";
import LoseDino3 from "../../../public/failed-dino-3.gif";
import LoseDino4 from "../../../public/failed-dino-4.gif";
import LoseDino5 from "../../../public/failed-dino-5.gif";
import { useEffect, useState } from "react";

type AnswerDialogProps = {
  showDialog: boolean;
  onClickNext: () => void;
  isCorrect: boolean;
};

const winDinoImages = [WinDino1, WinDino2, WinDino3, WinDino4, WinDino5];
const loseDinoImages = [LoseDino1, LoseDino2, LoseDino3, LoseDino4, LoseDino5];

const getDialogImage = (isCorrect: boolean) => {
  if (isCorrect) {
    return winDinoImages[Math.floor(Math.random() * winDinoImages.length)];
  } else {
    return loseDinoImages[Math.floor(Math.random() * loseDinoImages.length)];
  }
};

export function AnswerDialog({
  showDialog,
  onClickNext,
  isCorrect,
}: AnswerDialogProps) {
  const theme = useTheme();
  const [image, setImage] = useState(getDialogImage(isCorrect));

  useEffect(() => {
    setImage(getDialogImage(isCorrect));
  }, [showDialog]);

  const getDialogTitle = () => {
    if (isCorrect) {
      return "Ez a beszéd!";
    } else {
      return "Hát ez most nem sikerült! Na sebaj!";
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          background: theme.palette.background.default,
          border: "1px solid " + theme.palette.secondary.main,
        },
      }}
      open={showDialog}
    >
      <Box p={4}>
        <NextImage
          style={{
            width: "100%",
            maxHeight: "350px",
            objectFit: "contain",
          }}
          src={image}
          alt="failed-answer-gif"
        />
        <Typography variant="h5" mt={2}>
          {getDialogTitle()}
        </Typography>
        <Typography variant="h4"> Készen állsz a következő körre?</Typography>
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
  );
}
