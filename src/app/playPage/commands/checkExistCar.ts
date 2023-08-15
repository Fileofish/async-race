import { Api } from '../../shared/modules/api';
import { DynamicClass, LoadMode } from '../../shared/types/enums';
import { SearchSelectors } from '../logic/searchSelectors';

enum SwitchName {
  ActiveUpdateButton,
  ActiveCreateButton,
  InactiveCreateButton,
  InactiveUpdateButton,
}

export class CheckExistCar {
  private readonly api = new Api();
  private readonly searchSelectors = new SearchSelectors();

  async checkExist(name: string, inputName: string): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const selectedName = name.trim().toLowerCase();
    const pageNumberSeparator = '#';
    const page = selectors.raceListPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const cars = await Promise.all(await this.api.getApiDataCars(LoadMode.Page, +page));
    const arrayNames = cars[0].map((car) => car.name.toLowerCase());
    const searchName = selectors.searchTextInput?.value.trim().toLowerCase();
    const switchName = 
      ((inputName === 'newName' && selectedName === searchName) || (selectedName &&
        inputName === 'newName' && !arrayNames.includes(selectedName))) ? SwitchName.ActiveUpdateButton
      : (selectedName && inputName === 'searchName' && !arrayNames.includes(selectedName))
        ? SwitchName.ActiveCreateButton
      : (inputName === 'searchName' && !selectors.createButton?.classList.contains(DynamicClass.Inactive))
        ? SwitchName.InactiveCreateButton
      : (inputName === 'newName' && !selectors.updateButton?.classList.contains(DynamicClass.Inactive))
        ? SwitchName.InactiveUpdateButton
      : null;

    switch(switchName) {
      case SwitchName.ActiveCreateButton:
        selectors.createButton?.classList.remove(DynamicClass.Inactive);
        break;
      case SwitchName.ActiveUpdateButton:
        selectors.updateButton?.classList.remove(DynamicClass.Inactive);
        break;
      case SwitchName.InactiveUpdateButton:
        selectors.updateButton?.classList.add(DynamicClass.Inactive);
        break;
      case SwitchName.InactiveCreateButton:
        selectors.createButton?.classList.add(DynamicClass.Inactive);
        break;
    }
  }
}