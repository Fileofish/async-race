export enum ModeGetFragment {
  All,
  DynamicContent
}

export enum LoadMode {
  All,
  Page
}

export enum TableHeadNameSort {
  Number,
  Time,
  Wins,
}

export enum PlayPage {
  Main = 'play-page',
}

export enum InputClass {
  SearchName = 'input--search-name-car',
  SearchColor = 'input--search-color-car',
  NewName = 'input--new-name-car',
  NewColor = 'input--new-color-car',
}

export enum ButtonClass {
  Create = 'button--create',
  Update = 'button--update',
  Reset = 'button--reset',
  Race = 'button--race',
  ToGarage = 'button--to-garage',
  ToWinners = 'button--to-winners',
  GenerateCars = 'button--generate-cars',
}

export enum IdClass {
  CarName = 'carNameId',
  Car = 'carId',
  ButtonStop = 'buttonStopId',
  ButtonStart = 'buttonStartId'
}

export enum RaceListClass {
  Main = 'race-list',
  PageTitle = `${Main}__page-title`,
  PaginationButtonPrev = `${Main}__pagination-button--prev`,
  ButtonSelect = `${Main}__button--select`,
  RowCar = `${Main}__row-car`,
  MoveButtonStart = `${Main}__move-button--start`,
  MoveButtonStop = `${Main}__move-button--stop`,
  ButtonRemove = `${Main}__button--remove`,
  PaginationButtonNext = `${Main}__pagination-button--next`,
}

export enum WindowWinnersClass {
  Main = 'window-winners',
  PageTitle = `${Main}__page-title`,
  PaginationButtonPrev = `${Main}__pagination-button--prev`,
  PaginationButtonNext = `${Main}__pagination-button--next`,
}

export enum TableLeaders {
  Sort = 'table-leaders__sort-params',
  NumberHead = 'table-leaders__number-head',
  TimeHead = 'table-leaders__time-head',
  WinsHead = 'table-leaders__wins-head',
}

export enum DynamicClass {
  Inactive = 'inactive',
  Active = 'active',
}
