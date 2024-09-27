interface PropsButton {
  buttonText: string;
  buttonClass: string;
  buttonType?: "submit" | "reset" | "button";
  buttonImage?: string;
  imageAlt?: string;
  buttonImageClass?: string;
  onClick?: (e: MouseEvent) => void;
  events?: {
    click: (e: MouseEvent) => void;
  };
}
