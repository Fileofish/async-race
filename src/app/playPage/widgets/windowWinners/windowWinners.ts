import { ElementFactory } from '../../../shared/modules/elementFactory';
import { WindowWinnersClass, DynamicClass, ModeGetFragment, TableLeaders } from '../../../shared/types/enums';
import { ApiDataCars, ApiDataWinners } from '../../../shared/types/interfaces';

interface GetFragmentArgs {
  mode: ModeGetFragment,
  winnersData: ApiDataWinners,
  dataCars: ApiDataCars,
  page: number,
  sort: string,
  order: string,
}

export class WindowWinners {
  private readonly elementFactory = new ElementFactory();

  getFragment(args: GetFragmentArgs): Element {
    const sectionWindowWinners = this.elementFactory.getElement('section', WindowWinnersClass.Main);
    const wrapperWindowWinners = this.elementFactory.getElement('div', 'window-winners__wrapper');
    const sortParams = this.elementFactory.getElement('div', TableLeaders.Sort, `${args.sort}__${args.order}`);
    const tableTitle = this.elementFactory.getElement('h2', 'window-winners__title',
      `Winners (${args.winnersData.count})`);
    const pageTitle = this.elementFactory.getElement('h3', WindowWinnersClass.PageTitle, `Page #${args.page}`);
    const tableLeaders = this.createTableLeaders(args.winnersData, args.dataCars);
    const paginationWrapper = this.elementFactory.getElement('div', 'window-winners__pagination-wrapper');
    const buttonPrevPage = this.elementFactory.getElement('button',
      `window-winners__pagination-button ${WindowWinnersClass.PaginationButtonPrev}`, 'Prev');
    const buttonNextPage = this.elementFactory.getElement('button',
    `window-winners__pagination-button ${WindowWinnersClass.PaginationButtonNext}`, 'Next');

    if (args.page === 1) buttonPrevPage.classList.add(DynamicClass.Inactive);

    if (args.page * 7 >= args.winnersData.count) buttonNextPage.classList.add(DynamicClass.Inactive);
    paginationWrapper.append(buttonPrevPage, buttonNextPage);
    wrapperWindowWinners.append(sortParams, tableTitle, pageTitle, tableLeaders, paginationWrapper);

    switch (args.mode) {
      case (ModeGetFragment.All):
        sectionWindowWinners.append(wrapperWindowWinners);
    
        return sectionWindowWinners;
      case (ModeGetFragment.DynamicContent):
        return wrapperWindowWinners;
    }
  }

  private createTableLeaders(winnersData: ApiDataWinners, 
    dataCars: ApiDataCars): Element {
    const tableLeaders = this.elementFactory.getElement('table', 'table-leaders');
    const headRowTable = this.elementFactory.getElement('tr', 'table-leaders__header-row');
    const cellHeadNumber = this.elementFactory.getElement('th', TableLeaders.NumberHead, 'Number');
    const cellHeadCar = this.elementFactory.getElement('th', 'table-leaders__car-head', 'Car');
    const cellHeadName = this.elementFactory.getElement('th', 'table-leaders__name-head', 'Name');
    const cellHeadWins = this.elementFactory.getElement('th', TableLeaders.WinsHead, 'Wins');
    const cellHeadBestTime = this.elementFactory.getElement('th', TableLeaders.TimeHead, 'Best Time');
    const carArr = dataCars.cars;
    const carTemplate = document.querySelector('.car-path__template') as HTMLTemplateElement;

    headRowTable.append(cellHeadNumber, cellHeadCar, cellHeadName, cellHeadWins, cellHeadBestTime);
    tableLeaders.append(headRowTable);

    winnersData.winners.forEach((winner, index) => {
      const carIndex = carArr.map((car) => car.id).indexOf(winner.id);
      const rowTable = this.elementFactory.getElement('tr', `table-leaders__row carRowId${winner.id}`);
      const cellNumber = this.elementFactory.getElement('td', '', String(index + 1));
      const cellCar = document.createElement('td');
      const cellName = this.elementFactory.getElement('td', '', carArr[carIndex].name);
      const cellWins = this.elementFactory.getElement('td', '', String(winner.wins));
      const cellBestTime = this.elementFactory.getElement('td', '', String(winner.time));
      const cloneCar = carTemplate.content.cloneNode(true) as Element;
      const car = cloneCar.querySelector('svg') as Element;

      car.setAttribute('fill', String(carArr[carIndex].color));
      car.classList.add('table-car');
      cellCar.append(car);
      rowTable.append(cellNumber, cellCar, cellName, cellWins, cellBestTime);
      tableLeaders.append(rowTable);
    });

    return tableLeaders;
  }
}