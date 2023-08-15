import { RaceListClass, WindowWinnersClass, LoadMode, ModeGetFragment } from '../../shared/types/enums';
import { Api } from '../../shared/modules/api';
import { Render } from '../logic/render';
import { RaceList } from '../widgets/raceList/raceList';
import { WindowWinners } from '../widgets/windowWinners/windowWinners';
import { SearchSelectors } from '../logic/searchSelectors';
import { ApiAdapter } from '../../shared/modules/apiAdapter';

export class DeleteCar {
  private readonly api = new Api();
  private readonly render = new Render();
  private readonly raceList = new RaceList();
  private readonly windowWinners = new WindowWinners();
  private readonly searchSelectors = new SearchSelectors();

  async delete(target: Element): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const targetId = parseInt(target.className.split('Id')[1]);
    const pageNumberSeparator = '#';
    const pageRaceList = selectors.raceListPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const pageTableWinners = selectors.tableWinnersPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const sort = selectors.sortParamsElement?.innerHTML.split('__')[0] || 'id';
    const order = selectors.sortParamsElement?.innerHTML.split('__')[1] || 'ABC';

    await this.api.deleteApiDataCar(targetId);

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
  }
}