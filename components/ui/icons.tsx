import { Rocket, Menu, X, Sparkles } from "lucide-react";

export const Icons = {
  rocket: Rocket,
  menu: Menu,
  close: X,
  sparkles: Sparkles,
};

export type IconName = keyof typeof Icons;
