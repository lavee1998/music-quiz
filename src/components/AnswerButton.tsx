import { useTheme } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { useState } from "react";

export enum AnswerButtonState {
  default,
  correct,
  false,
  pending,
}

export default function AnswerButton({
  userName,
  // state = AnswerButtonState.default,
  correctAnswer,
  onClick,
  disabled,
}: {
  // state?: AnswerButtonState;
  userName: string;
  correctAnswer: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();
  const [state, setAnswerState] = useState(AnswerButtonState.default);

  const handleAnswerClick = () => {
    setTimeout(() => {
      setAnswerState(AnswerButtonState.pending);
    });
    setTimeout(() => {
      setAnswerState(AnswerButtonState.default);
    }, 800);
    setTimeout(() => {
      setAnswerState(AnswerButtonState.pending);
    }, 1600);
    setTimeout(() => {
      setAnswerState(AnswerButtonState.default);
    }, 2400);
    setTimeout(() => {
      if (userName == correctAnswer) {
        setAnswerState(AnswerButtonState.correct);
      } else {
        setAnswerState(AnswerButtonState.false);
      }
    }, 3200);
    setTimeout(() => {
      setAnswerState(AnswerButtonState.default)
    }, 7000)


    // console.log({ answer });
    // if (userName == correctAnswer) {
    //   setAnswerState(AnswerButtonState.correct);
    // } else {
    //   setAnswerState(AnswerButtonState.false);
    // }

    onClick();
  };

  const getColorByState = () => {
    switch (state) {
      case AnswerButtonState.correct:
        return { backgroundColor: theme.palette.success.main, text: "#ffffff" };

      case AnswerButtonState.false:
        return { backgroundColor: theme.palette.error.main, text: "white" };

      case AnswerButtonState.pending:
        return { backgroundColor: theme.palette.warning.main, text: "white" };
      default:
        return { backgroundColor: "transparent", text: "current" };
    }
  };
  return (
    <Button
      onClick={handleAnswerClick}
      disabled={disabled}
      sx={{
        borderRadius: 12,
        p: 1,
        transition: "all 0.5s ease",
        backgroundColor: getColorByState().backgroundColor,
        color: getColorByState().text + " !important",
      }}
      fullWidth
      variant="outlined"
    >
      {userName}
    </Button>
  );
}
