import { Callback } from '../../shared/types/generics';

interface ElementListen {
  event: string,
  element: Element, 
  callback: Callback<Event>,
}

export class Listener {
  listen(...args: ElementListen[]): void {
    args.forEach((arg) => {
      arg.element.addEventListener(arg.event, arg.callback);
    });
  }
}