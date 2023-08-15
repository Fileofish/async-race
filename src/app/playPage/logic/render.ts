export class Render {
  draw(parentClass: string, ...elements: Element[]): void {
    const parent = document.querySelector(parentClass) as Element;

    parent.innerHTML = '';
    parent?.append(...elements);
  }
}