import YouTubePlayer from "@/components/YoutubePlayer";
import { Button, colors, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import { Question } from "../page";
import { promises as fs } from "fs";
import NextImage from "next/image";
import backgroundImage from "../../../public/z19.jpg";
import Answers from "@/components/Answers";
import { useState } from "react";
import QuestionView from "@/components/QuestionView";
import QuestionsView from "@/components/QuestionsView";

function shuffle(array: Question[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export default async function Start({
  params,
}: {
  params: { userId: string };
}) {
  const file = await fs.readFile(
    process.cwd() + "/src/assets/data.json",
    "utf8"
  );
  const data = JSON.parse(file) as Record<string, Question>;
  console.log({ data });
  const questions = Object.values(data);
  shuffle(questions);

  if (!questions) return null
  return <QuestionsView questions={questions} />;
}
