import { Rocket, Menu, X, Sparkles, Book } from "lucide-react";

export const Icons = {
  rocket: Rocket,
  menu: Menu,
  close: X,
  sparkles: Sparkles,
  book: Book,
};

export type IconName = keyof typeof Icons;
