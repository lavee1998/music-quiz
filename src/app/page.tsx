import Image from "next/image";
import styles from "./page.module.css";
import data from "@/assets/data.json";
import { promises as fs } from "fs";
import { Box, Button, Typography } from "@mui/material";
import LinkButton from "@/app/components/LinkButton";

export type Question = {
  id: string;
  name: string;
  description: string;
  video: string;
  start: number;
  end: number;
  "project-reference": null | string;
  userAnswers: string[];
};

export default async function Home() {
  return (
    <main>
      <Box
        justifyContent={"center"}
        alignContent={"center"}
        height="100vh"
        color="white"
        p={4}
        textAlign={"center"}
      >
        <Typography mb={4} variant="h2">
          Hey Consteel!
        </Typography>
        <Typography mb={4}>
          <code className={styles.code}>
            A következő játékban zenéket fogunk hallgatni amiket <b>TI</b>{" "}
            küldtetek! A kérdés már csak az, ismeritek-e egymás zenei izlését?
          </code>
        </Typography>
        <LinkButton text="Kezdés!" href="/start" />
      </Box>
    </main>
  );
}
