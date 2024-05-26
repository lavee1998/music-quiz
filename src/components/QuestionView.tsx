import YouTubePlayer from "@/components/YoutubePlayer";
import { Button, colors, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import NextImage from "next/image";
import backgroundImage from "../../public/z19.jpg";
import Answers from "@/components/Answers";
import { Question } from "@/app/page";
// 7b480491-ab48-4d3d-8603-6505185ef689

// 3d7bb65d-6201-4835-90b3-6560493c8789

// 2ee4816c-07e3-438d-a9b7-d3f6c6769217

// 5d05bd17-53e1-43c3-b286-2ad4f18c5766

// 8418f250-2e95-47df-a8bf-d8e4b9a23230

// 0503633c-8182-41b8-ba24-e9018683ecfe

// 51c40b86-6bbd-46d5-91e1-a4557fc46ba5

// 873ab79a-cb9b-42a4-a01b-d03ecb3fe1cc

// 9319706e-cc7d-4767-b712-07f4a923f5c9

// 2ddb5581-3f80-4b85-87f3-bfce2d3a1274

// 52ecfd16-48bf-43b3-9d6c-fd2aeb728a9c

// 46a280ef-0892-4c4a-956e-0cb2bbaeb784

// 68aa5020-8b50-4854-bfe0-d6e126cf2110

// bcc25a3d-cc5e-45b2-af94-c6db602afec8

// c9f2d028-4b4a-4873-98f6-928aefb528f4

// 23924045-1327-4e13-aa45-4863833d77ff

// 58b694df-a001-4a42-a101-6895e1db16b8

// 0a1f5ccc-e779-4384-99ac-732b8233542a

export default function QuestionView({
  question,
  onAnswerQuestion,
}: {
  question: Question;
  onAnswerQuestion: () => void;
}) {
  if (!question) return null;

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      p={6}
      // bgcolor={"#72efdd"}
      flexDirection={"column"}
      alignContent={"center"}
      textAlign={"center"}
      position={"relative"}
    >
      <NextImage
        style={{
          opacity: 0.8,
          zIndex: -3,
        }}
        fill
        src={backgroundImage}
        alt="background"
      />
      <Box flex={1}>
        <Container>
          <YouTubePlayer
            start={question.start}
            end={question.end}
            id={question.video}
          />
          <Box p={8} textAlign={"center"}>
            <Typography color="white" variant="h4">
              {question.description}
            </Typography>
          </Box>
          <Answers onAnswerQuestion={onAnswerQuestion} question={question} />
        </Container>
      </Box>
    </Box>
  );
}
