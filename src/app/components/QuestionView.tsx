import YouTubePlayer from "@/app/components/YoutubePlayer";
import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import NextImage from "next/image";
import backgroundImage from "../../../public/z19.jpg";
import Answers from "@/app/components/Answers";
import { Question } from "@/app/page";

export default function QuestionView({
  question,
  onAnswerQuestion,
}: {
  question: Question;
  onAnswerQuestion: (answer: string | null) => void;
}) {
  if (!question) return null;

  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      py={6}
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
          <Box textAlign={"end"} p={5}>
            <Button
              onClick={() => onAnswerQuestion(null)}
              variant="outlined"
              color="secondary"
            >
              Következő
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
