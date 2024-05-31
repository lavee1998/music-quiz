import { Question } from "../page";
import { promises as fs } from "fs";
import QuestionsView from "@/app/components/QuestionsView";

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
  const questions = Object.values(data);
  // shuffle(questions);

  if (!questions) return null;
  return <QuestionsView questions={questions} />;
}
