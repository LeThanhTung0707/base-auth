"use client";
import { Button } from "@/components/ui/button";

interface Props {
  text: string;
  fullWidth?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}

export const FormButton = ({
  text,
  fullWidth = true,
  type = "submit",
  onClick,
}: Props) => (
  <Button
    type={type}
    onClick={onClick}
    className={`${fullWidth ? "w-full" : ""}`}
  >
    {text}
  </Button>
);
