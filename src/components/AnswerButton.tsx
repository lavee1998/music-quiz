import { useTheme } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Confetti from "react-confetti";

export enum AnswerButtonState {
  default,
  correct,
  false,
  pending,
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
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
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false)
  const winAudioRef = useRef<HTMLAudioElement>(null);
  const loseAudioRef = useRef<HTMLAudioElement>(null);

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
        playWin()
        setShowConfetti(true)
        setTimeout(() => {
          setShowConfetti(false)
        }, 5000)
      } else {
        playLose()
        setAnswerState(AnswerButtonState.false);
      }
    }, 3200);
    setTimeout(() => {
      setAnswerState(AnswerButtonState.default);
    }, 7000);

    // console.log({ answer });
    // if (userName == correctAnswer) {
    //   setAnswerState(AnswerButtonState.correct);
    // } else {
    //   setAnswerState(AnswerButtonState.false);
    // }

    onClick();
  };


  const playWin = () => {
    if (winAudioRef.current) {
      winAudioRef.current.play()
    } else {
      // Throw error
    }
  }

  const playLose = () => {
    if (loseAudioRef.current) {
      loseAudioRef.current.play()
    } else {
      // Throw error
    }
  }


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
      {!!showConfetti && <Confetti width={width} height={height} />}
      <audio ref={winAudioRef} src='/win.mp3' />
      <audio ref={loseAudioRef} src='/lose.mp3' />


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
    </React.Fragment>
  );
}
