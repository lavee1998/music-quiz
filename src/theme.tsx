"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    background: {
      // default: "#16db65",
      paper: "#16db65",
      default: "#020202"
    },
    mode: "dark",
    primary: {
      main: "#058c42",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
