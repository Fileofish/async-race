import { Api } from '../../shared/modules/api';
import { ApiAdapter } from '../../shared/modules/apiAdapter';
import { ElementFactory } from '../../shared/modules/elementFactory';
import { IdClass, WindowWinnersClass, LoadMode, ModeGetFragment, PlayPage } from '../../shared/types/enums';
import { Render } from '../logic/render';
import { SearchSelectors } from '../logic/searchSelectors';
import { WindowWinners } from '../widgets/windowWinners/windowWinners';

export class GetWinner {
  private readonly api = new Api();
  private readonly windowWinners = new WindowWinners();
  private readonly render = new Render();
  private readonly elementFactory = new ElementFactory();
  private readonly searchSelectors = new SearchSelectors();
  isFirstCar = false;

  async resultsTable(carId: number, time: number): Promise<void> {
    if (this.isFirstCar) {
      const selectors = this.searchSelectors.getSelectors();
      const playPage = document.querySelector(`.${PlayPage.Main}`);
      const winnersAll = await Promise.all(await this.api.getApiDataWinners({loadMode: LoadMode.All}));
      const arrId = winnersAll[0].map((winner) => winner.id);
      const carName = document.querySelector(`.${IdClass.CarName}${carId}`);
      const indexWinner = arrId.indexOf(carId);
      const timeSec = +(time/1000).toFixed(2);
      const pageNumberSeparator = '#';
      const page = selectors.tableWinnersPageTitle?.innerHTML.split(pageNumberSeparator)[1] || 1;
      const sort = selectors.sortParamsElement?.innerHTML.split('__')[0] || 'id';
      const order = selectors.sortParamsElement?.innerHTML.split('__')[1] || 'ABC';

      if (indexWinner > -1) {
        const wins = winnersAll[0][indexWinner].wins + 1;
        const prevBestTime = winnersAll[0][indexWinner].time;
        const bestTime = (prevBestTime*1000 <= timeSec) ? prevBestTime : timeSec;
        const winnerBodyResponse = {wins: wins, time: bestTime};

        this.api.putApiDataWinner(carId, winnerBodyResponse);
      } else {
        const winnerBodyResponse = {id: carId, wins: 1, time: timeSec};

        this.api.postApiDataWinner(winnerBodyResponse);
      }

      const winMessage = this.elementFactory.getElement('div', 'win-message',
      `${carName?.innerHTML} won with time: ${timeSec} sec!!!`);
      const carsAll = await ApiAdapter.adaptCarsData(LoadMode.All);
      const winnersPageArgs = {
        loadMode: LoadMode.Page,
        page: +page,
        sort: sort,
        order: order,
      };
      const winnersDataPage = await ApiAdapter.adaptWinnersData(winnersPageArgs);
      const tableWinnersWrapperArgs = {
        mode: ModeGetFragment.DynamicContent,
        winnersData: winnersDataPage,
        dataCars: carsAll,
        page: +page,
        sort: sort,
        order: order,
      };
      const tableWinnersWrapper = this.windowWinners.getFragment(tableWinnersWrapperArgs);

      setTimeout(() => winMessage.remove(), 8000);
      this.render.draw(`.${WindowWinnersClass.Main}`, tableWinnersWrapper);
      playPage?.append(winMessage);
    }
  }
}