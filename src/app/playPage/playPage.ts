import { InputClass, DynamicClass, LoadMode, ModeGetFragment, RaceListClass, WindowWinnersClass, ButtonClass, PlayPage, TableLeaders, TableHeadNameSort} from '../shared/types/enums';
import { Api } from '../shared/modules/api';
import { DeleteCar } from './commands/deleteCar';
import { FilterListCars } from './commands/filterListCars';
import { SelectCar } from './commands/selectCar';
import { ToggleWindow } from './commands/toggleWindow';
import { Listener } from './logic/listener';
import { Render } from './logic/render';
import { FilterForm } from './widgets/filterForm/filterForm';
import { RaceList } from './widgets/raceList/raceList';
import { WindowNavigation } from './widgets/windowNavigation/windowNavigation';
import { WindowWinners } from './widgets/windowWinners/windowWinners';
import { CheckExistCar } from './commands/checkExistCar';
import { CorrectCarRow } from './commands/correctCarRow';
import { AddCarRow } from './commands/addCarRow';
import { GenerateCars } from './commands/generateCars';
import { ChangePage } from './commands/changePage';
import { DriveCar } from './commands/driveCar';
import { GoStopRace } from './commands/goStopRace';
import { SortWinnerTable } from './commands/sortWinnerTable';
import { ApiAdapter } from '../shared/modules/apiAdapter';

export class playPage {
  private readonly api = new Api();
  private readonly render = new Render();
  private readonly listener = new Listener();
  private readonly toggleWindow = new ToggleWindow();
  private readonly filterListCars = new FilterListCars();
  private readonly checkExistCar = new CheckExistCar();
  private readonly selectCar = new SelectCar();
  private readonly deleteCar = new DeleteCar();
  private readonly correctCarRow = new CorrectCarRow();
  private readonly addCarRow = new AddCarRow();
  private readonly generateCars = new GenerateCars();
  private readonly changePage = new ChangePage();
  private readonly driveCar = new DriveCar();
  private readonly goStopRace = new GoStopRace();
  private readonly sortWinnerTable = new SortWinnerTable();
  private readonly windowNavigation = new WindowNavigation();
  private readonly filterForm = new FilterForm();
  private readonly raceList = new RaceList();
  private readonly windowWinners = new WindowWinners();

  async initPlayPage(): Promise<void> {
    const windowNavigation = this.windowNavigation.getFragment();
    const filterForm = this.filterForm.getFragment();
    const page = 1;
    const sort = 'id';
    const order = 'ABC';
    const carsPage = await ApiAdapter.adaptCarsData(LoadMode.Page, page);
    const carsAll = await ApiAdapter.adaptCarsData(LoadMode.All);
    const winnersArgs = {
      loadMode: LoadMode.Page,
      page: page,
      sort: sort,
      order: order,
    };
    const winnersData = await ApiAdapter.adaptWinnersData(winnersArgs);
    const raceListArgs = {
      mode: ModeGetFragment.All,
      dataCars: carsPage,
      page: page,
    };
    const raceList = this.raceList.getFragment(raceListArgs);
    const tableWinnersWrapperArgs = {
      mode: ModeGetFragment.All,
      winnersData: winnersData,
      dataCars: carsAll,
      page: page,
      sort: sort,
      order: order,
    };
    const windowWinners = this.windowWinners.getFragment(tableWinnersWrapperArgs);

    this.render.draw(`.${PlayPage.Main}`, windowNavigation, filterForm, raceList, windowWinners);
    this.listener.listen(
      {event: 'click', element: windowNavigation, callback: this.toggleWindow.toggle},
      {event: 'click', element: filterForm, callback: this.filterFormClick},
      {event: 'input', element: filterForm, callback: this.filterFormInput},
      {event: 'click', element: raceList, callback: this.raceListClick},
      {event: 'click', element: windowWinners, callback: this.tableLeaderClick},
      );
  }

  private readonly filterFormClick = (event: Event): void => {
    const target = event.target as Element;

    if (target.classList.contains(ButtonClass.Update) && !target.classList.contains(DynamicClass.Inactive)) {
      this.correctCarRow.correct(target);
    }

    if (target.classList.contains(ButtonClass.Create) && !target.classList.contains(DynamicClass.Inactive)) {
      this.addCarRow.add(target);
    }

    if (target.classList.contains(ButtonClass.Race) && !target.classList.contains(DynamicClass.Inactive)) {
      this.goStopRace.goRace(target);
    }

    if (target.classList.contains(ButtonClass.Reset) && !target.classList.contains(DynamicClass.Inactive)) {
      this.goStopRace.stopRace(target);
    }
    target.classList.contains(ButtonClass.GenerateCars) && this.generateCars.generate();
  };

  private readonly filterFormInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    target.classList.contains(InputClass.SearchName) && this.filterListCars.filter(target);
    target.classList.contains(InputClass.NewName) && this.checkExistCar.checkExist(target.value, 'newName');
  };

  private readonly raceListClick = (event: Event): void => {
    const target = event.target as Element;

    target.classList.contains(RaceListClass.ButtonSelect) && this.selectCar.select(target);
    target.classList.contains(RaceListClass.ButtonRemove) && this.deleteCar.delete(target);
    target.classList.contains(RaceListClass.MoveButtonStart) && this.driveCar.go(target);
    target.classList.contains(RaceListClass.MoveButtonStop) && this.driveCar.stop(target);

    if (!target.classList.contains(DynamicClass.Inactive) 
      && (target.classList.contains(RaceListClass.PaginationButtonPrev) 
      || target.classList.contains(RaceListClass.PaginationButtonNext))) {
        this.changePage.changeRaceListPage(target);
      }
  };

  private readonly tableLeaderClick = (event: Event): void => {
    const target = event.target as Element;

    target.classList.contains(TableLeaders.NumberHead) && this.sortWinnerTable.sort(TableHeadNameSort.Number);
    target.classList.contains(TableLeaders.TimeHead) && this.sortWinnerTable.sort(TableHeadNameSort.Time);
    target.classList.contains(TableLeaders.WinsHead) && this.sortWinnerTable.sort(TableHeadNameSort.Wins);

    if (!target.classList.contains(DynamicClass.Inactive) 
    && (target.classList.contains(WindowWinnersClass.PaginationButtonPrev) 
    || target.classList.contains(WindowWinnersClass.PaginationButtonNext))) {
      this.changePage.changeTableWinnersPage(target);
    }
  };
}