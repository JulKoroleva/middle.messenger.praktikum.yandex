interface ButtonProps {
  text: string;
  class: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}
