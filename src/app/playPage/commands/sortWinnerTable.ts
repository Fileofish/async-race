import { Api } from '../../shared/modules/api';
import { ApiAdapter } from '../../shared/modules/apiAdapter';
import { WindowWinnersClass, LoadMode, ModeGetFragment, TableLeaders, TableHeadNameSort } from '../../shared/types/enums';
import { Render } from '../logic/render';
import { SearchSelectors } from '../logic/searchSelectors';
import { WindowWinners } from '../widgets/windowWinners/windowWinners';

export class SortWinnerTable {
  private readonly api = new Api();
  private readonly windowWinners = new WindowWinners();
  private readonly render = new Render();
  private readonly searchSelectors = new SearchSelectors();

  async sort(headName: TableHeadNameSort): Promise<void> {
    const selectors = this.searchSelectors.getSelectors();
    const pageNumberSeparator = '#';
    const pageTableWinners = selectors.tableWinnersPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
    const sortParamsElement = document.querySelector(`.${TableLeaders.Sort}`);
    let sort = sortParamsElement?.innerHTML.split('__')[0] || 'id';
    let order = sortParamsElement?.innerHTML.split('__')[1] || 'ABC';
    const carsAll = await ApiAdapter.adaptCarsData(LoadMode.All);

    switch (headName) {
      case TableHeadNameSort.Number:
        order = (sort === 'id' && order === 'ABC') ? 'DESC' : 'ABC';
        sort = 'id';
        break;
      case TableHeadNameSort.Time:
        order = (sort === 'time' && order === 'ABC') ? 'DESC' : 'ABC';
        sort = 'time';
        break;
      case TableHeadNameSort.Wins:
        order = (sort === 'wins' && order === 'ABC') ? 'DESC' : 'ABC';
        sort = 'wins';
        break;
    }

    const winnersArgs = {
      loadMode: LoadMode.Page,
      page: +pageTableWinners,
      sort: sort,
      order: order,
    };
    const winnersData = await ApiAdapter.adaptWinnersData(winnersArgs);
    const tableWinnersWrapperArgs = {
      mode: ModeGetFragment.DynamicContent,
      winnersData: winnersData,
      dataCars: carsAll,
      page: +pageTableWinners,
      sort: sort,
      order: order,
    };
    const tableWinnersWrapper = this.windowWinners.getFragment(tableWinnersWrapperArgs);

    this.render.draw(`.${WindowWinnersClass.Main}`, tableWinnersWrapper);
  }
}