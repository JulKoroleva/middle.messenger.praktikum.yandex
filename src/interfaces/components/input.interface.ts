interface InputProps {
  inputName: string;
  inputLabel: string;
  inputType: string;
  inputMainClass: string;
  inputClass: string;
  labelClass: string;
  inputValue: unknown;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}
