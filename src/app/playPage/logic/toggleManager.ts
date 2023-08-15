interface ToggleObject {
  classElement: string,
  toggleClass: string,
}

export class ToggleManager {
  toggleClass(...args: ToggleObject[]): void {
    args.forEach((obj) => {
      const objElement = document.querySelector(obj.classElement) as Element;

      objElement.classList.toggle(obj.toggleClass);
    });
  }
}