import Block from "../../framework/Block.ts";

export function render(query: string, block: Block) {
  const root = document.querySelector(query)!;

  root.innerHTML = "";

  root.append(block.getContent()!);

  return root;
}
