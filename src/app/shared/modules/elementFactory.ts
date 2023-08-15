export class ElementFactory {
  getElement(tagName: string, className?: string, innerHTML?: string, type?: string, placeholder?: string): Element {
    const element = document.createElement(tagName) as HTMLInputElement;

    if (className) element.className = className;

    if (innerHTML) element.innerHTML = innerHTML;

    if (type) element.type = type;

    if (placeholder) element.placeholder = placeholder;

    return element;
  }
}