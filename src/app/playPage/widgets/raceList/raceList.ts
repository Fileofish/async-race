import { ElementFactory } from '../../../shared/modules/elementFactory';
import { IdClass, RaceListClass, DynamicClass, ModeGetFragment } from '../../../shared/types/enums';
import { ApiDataCars } from '../../../shared/types/interfaces';

interface GetFragmentArguments {
  mode: ModeGetFragment,
  dataCars: ApiDataCars,
  page: number,
  filterWord?: string,
}

export class RaceList {
  private readonly elementFactory = new ElementFactory();
  getFragment(args: GetFragmentArguments): Element {
    const sectionRaceList = this.elementFactory.getElement('section', RaceListClass.Main);
    const listTitle = this.elementFactory.getElement('h2', 'race-list__title', `Garage (${args.dataCars.count})`);
    const pageTitle = this.elementFactory.getElement('h3', RaceListClass.PageTitle, `Page #${args.page}`);
    const listCarsWrapper = this.elementFactory.getElement('div', 'race-list__wrapper');
    const listCars = this.createListCars(args.dataCars, args.filterWord);
    const paginationWrapper = this.elementFactory.getElement('div', 'race-list__pagination-wrapper');
    const buttonPrevPage = this.elementFactory.getElement('button', 
      `race-list__pagination-button ${RaceListClass.PaginationButtonPrev}`, 'Prev');
    const buttonNextPage = this.elementFactory.getElement('button', 
      `race-list__pagination-button ${RaceListClass.PaginationButtonNext}`, 'Next');

      if (args.page === 1) buttonPrevPage.classList.add(DynamicClass.Inactive);

      if (args.dataCars.count && args.page * 7 >= args.dataCars.count) {
        buttonNextPage.classList.add(DynamicClass.Inactive);
      }
      paginationWrapper.append(buttonPrevPage, buttonNextPage);
      listCarsWrapper.append(listTitle, pageTitle, listCars, paginationWrapper);

    switch (args.mode) {
      case (ModeGetFragment.All):
        sectionRaceList.append(listCarsWrapper);
    
        return sectionRaceList;
      case (ModeGetFragment.DynamicContent):
        return listCarsWrapper;
    }
  }

  private createListCars(dataCars: ApiDataCars, filterWord?: string): Element{
    const listCars = document.createElement('ul');
    const carTemplate = document.querySelector('.car-path__template') as HTMLTemplateElement;

    dataCars.cars.forEach((elem) => {
      const isEqualName = filterWord && elem.name.toLowerCase().substr(0, filterWord.length) === filterWord;
      const isFilterWord = !filterWord || filterWord && isEqualName;

      if (isFilterWord) {
        const rowCar = this.elementFactory.getElement('li', RaceListClass.RowCar);
        const carWrapper = this.elementFactory.getElement('div', 'race-list__car-wrapper');
        const selectWrapper = this.elementFactory.getElement('div', 'race-list__common-wrapper');
        const buttonSelect = this.elementFactory.getElement('button',
          `race-list__button ${RaceListClass.ButtonSelect} buttonSelectId${elem.id}`, 'Select');
        const buttonRemove = this.elementFactory.getElement('button',
          `race-list__button ${RaceListClass.ButtonRemove} buttonRemoveId${elem.id}`, 'Remove');
        const carName = this.elementFactory.getElement('h4',
          `race-list__car-name ${IdClass.CarName}${elem.id}`, `${elem.name}`);
        const commonWrapper = this.elementFactory.getElement('div', 'race-list__common-wrapper');
        const buttonStart = this.elementFactory.getElement('button',
          `race-list__move-button ${RaceListClass.MoveButtonStart} ${IdClass.ButtonStart}${elem.id}`, 'A');
        const buttonStop = this.elementFactory.getElement('button',
          `race-list__move-button ${RaceListClass.MoveButtonStop} ${IdClass.ButtonStop}${elem.id} 
          ${DynamicClass.Inactive}`, 'B');
        const cloneCar = carTemplate.content.cloneNode(true) as Element;
        const car = cloneCar.querySelector('svg') as Element;
        const flag = this.elementFactory.getElement('div', 'race-list__flag');
        
        car.setAttribute('fill', String(elem.color));
        car.classList.add(`${IdClass.Car}${elem.id}`);
        commonWrapper.append(buttonStart, buttonStop, car);
        selectWrapper.append(buttonSelect, buttonRemove, carName);
        carWrapper.append(selectWrapper, commonWrapper);
        rowCar.append(carWrapper, flag);
        listCars.append(rowCar);
      }
    });

    return listCars;
  }
}