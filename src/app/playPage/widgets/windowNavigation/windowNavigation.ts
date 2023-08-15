import { ElementFactory } from '../../../shared/modules/elementFactory';

export class WindowNavigation {
  private readonly elementFactory = new ElementFactory();

  getFragment(): Element {
    const sectionWindowNavigation = this.elementFactory.getElement('section', 'window-navigation');
    const buttonToGarage = this.elementFactory.getElement('button',
      'window-navigation__button button--to-garage active', 'To Garage');
    const buttonToWinners = this.elementFactory.getElement('button',
      'window-navigation__button button--to-winners', 'To Winners');

    sectionWindowNavigation.append(buttonToGarage, buttonToWinners);

    return sectionWindowNavigation;
  }
}