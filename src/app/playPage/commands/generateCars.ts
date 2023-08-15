import { Api } from '../../shared/modules/api';
import { ApiAdapter } from '../../shared/modules/apiAdapter';
import { RaceListClass, LoadMode, ModeGetFragment } from '../../shared/types/enums';
import { CarRandomizer } from '../logic/carRandomizer';
import { Render } from '../logic/render';
import { SearchSelectors } from '../logic/searchSelectors';
import { RaceList } from '../widgets/raceList/raceList';

export class GenerateCars {
  private readonly api = new Api();
  private readonly render = new Render();
  private readonly raceList = new RaceList();
  private readonly carRandomizer = new CarRandomizer();
  private readonly searchSelectors = new SearchSelectors();

  async generate(): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const pageNumberSeparator = '#';
    const pageRaceList = selectors.raceListPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const dataCars = await ApiAdapter.adaptCarsData(LoadMode.All);
    const carsNameArray = dataCars.cars.map((car) => car.name);
    const randomCarArr = this.carRandomizer.getArrCar(carsNameArray);

    this.api.postApiDataCar(...randomCarArr);

    const newCarsPage = await ApiAdapter.adaptCarsData(LoadMode.Page, +pageRaceList);
    const raceListArgs = {
      mode: ModeGetFragment.DynamicContent,
      dataCars: newCarsPage,
      page: +pageRaceList,
    };
    const listCarsWrapper = this.raceList.getFragment(raceListArgs);

    this.render.draw(`.${RaceListClass.Main}`, listCarsWrapper);
  }
}