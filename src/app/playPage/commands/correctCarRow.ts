import { Api } from '../../shared/modules/api';
import { ApiAdapter } from '../../shared/modules/apiAdapter';
import { RaceListClass, WindowWinnersClass, DynamicClass, LoadMode, ModeGetFragment } from '../../shared/types/enums';
import { Render } from '../logic/render';
import { SearchSelectors } from '../logic/searchSelectors';
import { RaceList } from '../widgets/raceList/raceList';
import { WindowWinners } from '../widgets/windowWinners/windowWinners';
import { FilterListCars } from './filterListCars';

export class CorrectCarRow {
  private readonly api = new Api();
  private readonly render = new Render();
  private readonly raceList = new RaceList();
  private readonly windowWinners = new WindowWinners();
  private readonly filterListCars = new FilterListCars();
  private readonly searchSelectors = new SearchSelectors();

  async correct(buttonUpdate: Element): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const carId = selectors.selectButton?.className.split('Id')[1];
    const newName = selectors.newTextInput?.value;
    const newColor = selectors.newColorInput?.value;
    const responseBody = (newName && newColor) ? {name: newName, color: newColor} : null;
    const pageNumberSeparator = '#';
    const pageRaceList = selectors.raceListPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const pageTableWinners = selectors.tableWinnersPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const sort = selectors.sortParamsElement?.innerHTML.split('__')[0] || 'id';
    const order = selectors.sortParamsElement?.innerHTML.split('__')[1] || 'ABC';

    carId && responseBody && this.api.patchApiDataCar(parseInt(carId), responseBody);

    const carsPage = await ApiAdapter.adaptCarsData(LoadMode.Page, +pageRaceList);
    const carsAll = await ApiAdapter.adaptCarsData(LoadMode.All);
    const winnersArgs = {
      loadMode: LoadMode.Page,
      page: +pageTableWinners,
      sort: sort,
      order: order,
    };
    const winnersData = await ApiAdapter.adaptWinnersData(winnersArgs);
    const raceListArgs = {
      mode: ModeGetFragment.DynamicContent,
      dataCars: carsPage,
      page: +pageRaceList,
    };
    const listCarsWrapper = this.raceList.getFragment(raceListArgs);
    const tableWinnersWrapperArgs = {
      mode: ModeGetFragment.DynamicContent,
      winnersData: winnersData,
      dataCars: carsAll,
      page: +pageTableWinners,
      sort: sort,
      order: order,
    };
    const tableWinnersWrapper = this.windowWinners.getFragment(tableWinnersWrapperArgs);

    this.render.draw(`.${RaceListClass.Main}`, listCarsWrapper);
    this.render.draw(`.${WindowWinnersClass.Main}`, tableWinnersWrapper);

    if (selectors.searchTextInput && selectors.searchColorInput && selectors.newTextInput && newName && newColor) {
      selectors.searchTextInput.value = newName;
      selectors.searchColorInput.value = newColor;
      selectors.newTextInput.value = '';
    }
    buttonUpdate.classList.add(DynamicClass.Inactive);
  }
}