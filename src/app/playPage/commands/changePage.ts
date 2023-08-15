import { Api } from '../../shared/modules/api';
import { ApiAdapter } from '../../shared/modules/apiAdapter';
import { RaceListClass, WindowWinnersClass, LoadMode, ModeGetFragment, TableLeaders} from '../../shared/types/enums';
import { Render } from '../logic/render';
import { SearchSelectors } from '../logic/searchSelectors';
import { RaceList } from '../widgets/raceList/raceList';
import { WindowWinners } from '../widgets/windowWinners/windowWinners';

export class ChangePage {
  private readonly api = new Api();
  private readonly render = new Render();
  private readonly raceList = new RaceList();
  private readonly windowWinners = new WindowWinners();
  private readonly searchSelectors = new SearchSelectors();

  async changeRaceListPage(button: Element): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const pageNumberSeparator = '#';
    const page = selectors.raceListPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const isButtonPrev = button.classList.contains(RaceListClass.PaginationButtonPrev);
    const pageNumber = (isButtonPrev) ? +page - 1 : +page + 1;
    const carsPage = await ApiAdapter.adaptCarsData(LoadMode.Page, pageNumber);
    const raceListArgs = {
      mode: ModeGetFragment.DynamicContent,
      dataCars: carsPage,
      page: pageNumber,
    };
    const listCarsWrapper = this.raceList.getFragment(raceListArgs);

    this.render.draw(`.${RaceListClass.Main}`, listCarsWrapper);
  }

  async changeTableWinnersPage(button: Element): Promise<void> {
    const tableWinnersPageTitle = document.querySelector(`.${WindowWinnersClass.PageTitle}`);
    const pageNumberSeparator = '#';
    const page = tableWinnersPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    let pageNumber = +page;
    const sortParamsElement = document.querySelector(`.${TableLeaders.Sort}`);
    const sort = sortParamsElement?.innerHTML.split('__')[0] || 'id';
    const order = sortParamsElement?.innerHTML.split('__')[1] || 'ABC';

    if (button.classList.contains(WindowWinnersClass.PaginationButtonPrev)) {
      --pageNumber;
    } else {
      ++pageNumber;
    }

    const carsAll = await ApiAdapter.adaptCarsData(LoadMode.All);
    const winnersPageArgs = {
      loadMode: LoadMode.Page,
      page: pageNumber,
      sort: sort,
      order: order,
    };
    const winnersDataPage = await ApiAdapter.adaptWinnersData(winnersPageArgs);
    const tableWinnersWrapperArgs = {
      mode: ModeGetFragment.DynamicContent,
      winnersData: winnersDataPage,
      dataCars: carsAll,
      page: pageNumber,
      sort: sort,
      order: order,
    };
    const tableWinnersWrapper = this.windowWinners.getFragment(tableWinnersWrapperArgs);

    this.render.draw(`.${WindowWinnersClass.Main}`, tableWinnersWrapper);
  }
}