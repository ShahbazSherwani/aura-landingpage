import { cn } from "@/lib/utils";
import { whoWeAreGraphicMarkup } from "./whoWeAreGraphicMarkup";

import styles from "./WhoWeAreGraphic.module.css";

export interface WhoWeAreGraphicProps {
  className?: string;
}

export function WhoWeAreGraphic({ className }: WhoWeAreGraphicProps) {
  return (
    <div
      className={cn(styles.container, className)}
      dangerouslySetInnerHTML={{ __html: whoWeAreGraphicMarkup }}
    />
  );
}
