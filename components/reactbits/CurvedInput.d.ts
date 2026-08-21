import type { CSSProperties, ReactNode } from "react";

export type CurvedInputTheme = "dark" | "light";
export type CurvedInputShadowSize = "sm" | "md" | "lg";

export interface CurvedInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  name?: string;
  ariaLabel?: string;
  theme?: CurvedInputTheme;
  width?: number | string;
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  iconColor?: string;
  shadowSize?: CurvedInputShadowSize;
  shadowColor?: string;
  showButton?: boolean;
  showIcon?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

declare function CurvedInput(props: CurvedInputProps): JSX.Element;

export default CurvedInput;
