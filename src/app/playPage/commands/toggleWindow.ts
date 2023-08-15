import { ButtonClass, DynamicClass, PlayPage, WindowWinnersClass } from '../../shared/types/enums';
import { ToggleManager } from '../logic/toggleManager';

export class ToggleWindow {
  private readonly toggleManager = new ToggleManager();

  toggle = (event: Event): void => {
    const target = event.target as Element;
    const isToWinnersOrToGarageButton = target.classList.contains(ButtonClass.ToGarage) 
      || target.classList.contains(ButtonClass.ToWinners);

    if (isToWinnersOrToGarageButton && (!target.classList.contains(DynamicClass.Active))) {
      this.toggleManager.toggleClass(
        {classElement: `.${ButtonClass.ToWinners}`, toggleClass: DynamicClass.Active},
        {classElement: `.${ButtonClass.ToGarage}`, toggleClass: DynamicClass.Active},
        {classElement: `.${WindowWinnersClass.Main}`, toggleClass: DynamicClass.Active},
        {classElement: `.${PlayPage.Main}`, toggleClass: 'scrollOff'}
    );}
    window.scrollTo(0, 0);
  };
}