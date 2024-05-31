import { useTheme } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React from "react";

export enum AnswerButtonState {
  default,
  correct,
  false,
  pending,
}

export default function AnswerButton({
  userName,
  state = AnswerButtonState.default,
  correctAnswer,
  onClick,
  disabled,
}: {
  state?: AnswerButtonState;
  userName: string;
  correctAnswer: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();

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
    <React.Fragment>
      <Button
        onClick={onClick}
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
    </React.Fragment>
  );
}
