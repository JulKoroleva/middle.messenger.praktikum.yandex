interface PopupProps {
  onClick: () => void;
  visibility: string;
  events: {
    click: (event: MouseEvent) => void;
  };
}
