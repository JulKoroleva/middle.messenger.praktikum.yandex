interface ButtonProps {
  buttonText: string;
  buttonClass: string;
  buttonLink: string;
  type?: "submit" | "reset" | "button";
  onClick?: (e: Event) => void;
  events?: {
    onClick?: (e: Event) => void;
  };
}
