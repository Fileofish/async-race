import { ButtonClass, InputClass, RaceListClass, TableLeaders, WindowWinnersClass } from '../../shared/types/enums';

interface GetSelectors {
  searchTextInput: HTMLInputElement | null,
  searchColorInput: HTMLInputElement | null,
  newTextInput: HTMLInputElement | null,
  newColorInput: HTMLInputElement | null,
  raceListPageTitle: HTMLElement | null,
  tableWinnersPageTitle: HTMLElement | null,
  sortParamsElement: HTMLElement | null,
  createButton: HTMLElement | null,
  updateButton: HTMLElement | null,
  selectButton: HTMLElement | null,
}

export class SearchSelectors {
  getSelectors(): GetSelectors {
    const selectors = {
      searchTextInput: document.querySelector(`.${InputClass.SearchName}`) as HTMLInputElement,
      searchColorInput: document.querySelector(`.${InputClass.SearchColor}`) as HTMLInputElement,
      newTextInput: document.querySelector(`.${InputClass.NewName}`) as HTMLInputElement,
      newColorInput: document.querySelector(`.${InputClass.NewColor}`) as HTMLInputElement,
      raceListPageTitle: document.querySelector(`.${RaceListClass.PageTitle}`) as HTMLElement,
      tableWinnersPageTitle: document.querySelector(`.${WindowWinnersClass.PageTitle}`) as HTMLElement,
      sortParamsElement: document.querySelector(`.${TableLeaders.Sort}`) as HTMLElement,
      createButton: document.querySelector(`.${ButtonClass.Create}`) as HTMLElement,
      updateButton: document.querySelector(`.${ButtonClass.Update}`) as HTMLElement,
      selectButton: document.querySelector(`.${RaceListClass.ButtonSelect}`) as HTMLElement,
    };

    return selectors;
  }
}