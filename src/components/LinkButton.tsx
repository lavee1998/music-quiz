import { Button } from "@mui/material";

export default function LinkButton({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return <Button variant="contained" size="large" href={href}>{text}</Button>;
}
