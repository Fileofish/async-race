import { RaceListClass, LoadMode, ModeGetFragment, DynamicClass } from '../../shared/types/enums';
import { Api } from '../../shared/modules/api';
import { Render } from '../logic/render';
import { RaceList } from '../widgets/raceList/raceList';
import { CheckExistCar } from './checkExistCar';
import { SearchSelectors } from '../logic/searchSelectors';
import { ApiAdapter } from '../../shared/modules/apiAdapter';

export class FilterListCars {
  private readonly api = new Api();
  private readonly render = new Render();
  private readonly raceList = new RaceList();
  private readonly checkExistCar = new CheckExistCar();
  private readonly searchSelectors = new SearchSelectors();
  
  async filter(target: HTMLInputElement): Promise<void> {
    const filterWord = target.value;

    this.filterToWord(filterWord);
  }

  async filterToWord(word: string): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const pageNumberSeparator = '#';
    const page = selectors.raceListPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const dataCars = await ApiAdapter.adaptCarsData(LoadMode.Page, +page);
    const raceListArgs = {
      mode: ModeGetFragment.DynamicContent,
      dataCars: dataCars,
      page: +page,
      filterWord: word.trim().toLowerCase(),
    };
    const listCarsWrapper = this.raceList.getFragment(raceListArgs);
    const listCars = listCarsWrapper.querySelector('ul');
    const isUpdateInputActive = 
      (listCars?.childElementCount === 1 && !selectors.newTextInput?.classList.contains(DynamicClass.Active)) ? 'active'
      : (selectors.newTextInput && listCars?.childElementCount !== 1) ? 'inactive'
      : null;

    switch(isUpdateInputActive) {
      case('active'):
        selectors.newTextInput?.classList.add(DynamicClass.Active);
        selectors.newTextInput?.removeAttribute('disabled');
        selectors.newColorInput?.classList.add(DynamicClass.Active);
        selectors.newColorInput?.removeAttribute('disabled');
        break;
      case('inactive'):
        if (selectors.newTextInput) selectors.newTextInput.value = '';
        selectors.newTextInput?.classList.remove(DynamicClass.Active);
        selectors.newTextInput?.setAttribute('disabled', 'disabled');
        selectors.newColorInput?.classList.remove(DynamicClass.Active);
        selectors.newColorInput?.setAttribute('disabled', 'disabled');
        break;
    }
    this.render.draw(`.${RaceListClass.Main}`, listCarsWrapper);
    this.checkExistCar.checkExist(word, 'searchName');
  }
}