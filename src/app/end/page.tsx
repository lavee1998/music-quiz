"use client";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { AnswerContext } from "../context/AnswerContext";
import {
  CancelOutlined,
  CheckCircle,
  DoNotDisturbOn,
} from "@mui/icons-material";
import { AnswerButtonState } from "../components/AnswerButton";
import { useRouter } from "next/navigation";

export default function EndPage() {
  const { answers, setAnswer } = useContext(AnswerContext);
  const router = useRouter();

  useEffect(() => {
    if (!Object.keys(answers).length) {
      router.push("/");
    }
  }, []);
  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      p={6}
      color="white"
      flexDirection={"column"}
      alignContent={"center"}
      textAlign={"center"}
      position={"relative"}
    >
      <List dense>
        {Object.values(answers).map((answer, i) => {
          return (
            <ListItem
              key={i}
              sx={{
                borderBottom: "1px solid white",
              }}
            >
              <Box minWidth={25}> {i + 1}.</Box>
              <ListItemIcon sx={{ ml: 2 }}>
                {answer.state === AnswerButtonState.correct ? (
                  <CheckCircle color="success" />
                ) : answer.state === AnswerButtonState.false ? (
                  <CancelOutlined color="error" />
                ) : (
                  <DoNotDisturbOn />
                )}
              </ListItemIcon>
              <ListItemText> {answer.description}.</ListItemText>
            </ListItem>
          );
        })}
      </List>
      <Box textAlign={"end"} p={5}>
        <Button
          onClick={() => router.push("/start")}
          variant="outlined"
          color="secondary"
        >
          Elejére
        </Button>
      </Box>
    </Box>
  );
}
