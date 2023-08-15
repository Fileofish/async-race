import { IdClass } from '../../shared/types/enums';
import { SearchSelectors } from '../logic/searchSelectors';
import { FilterListCars } from './filterListCars';

export class SelectCar {
  private readonly filterListCars = new FilterListCars();
  private readonly searchSelectors = new SearchSelectors();
  
  async select(target: Element): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const carId = parseInt(target.className.split('Id')[1]);
    const carNameSelector = document.querySelector(`.${IdClass.CarName}${carId}`);
    const car = document.querySelector(`.${IdClass.Car}${carId}`);
    const carColor = car?.getAttribute('fill');

    const isNotEqualInputValue = carNameSelector && selectors.searchTextInput && selectors.searchColorInput && carColor
      && selectors.searchTextInput.value !== carNameSelector.innerHTML;

    if (isNotEqualInputValue && selectors.searchColorInput && selectors.searchTextInput) {
      const carName = carNameSelector?.innerHTML;

      selectors.searchTextInput.value = '';
      selectors.searchTextInput.value = carName;
      selectors.searchColorInput.value = carColor;
      this.filterListCars.filterToWord(carName);
    }
  }
}