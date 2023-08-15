import { ElementFactory } from '../../../shared/modules/elementFactory';
import { InputClass, DynamicClass, ButtonClass } from '../../../shared/types/enums';

export class FilterForm {
  private readonly elementFactory = new ElementFactory();

  getFragment(): Element {
    const sectionFilterForm = this.elementFactory.getElement('section', 'filter-form');
    const createWrapper = this.elementFactory.getElement('div', 'filter-form__wrapper');
    const inputSearchNameCar = this.elementFactory.getElement('input',
      `filter-form__text-input ${InputClass.SearchName}`, undefined, 'text', 'Name car...');
    const inputSearchColorCar = this.elementFactory.getElement('input',
      `filter-form__color-input ${InputClass.SearchColor}`, undefined, 'color');
    const buttonCreate = this.elementFactory.getElement('button',
      `filter-form__button ${ButtonClass.Create} ${DynamicClass.Inactive}`, 'Create');
    const updateWrapper = this.elementFactory.getElement('div', 'filter-form__wrapper');
    const inputNewNameCar = this.elementFactory.getElement('input',
      `filter-form__text-input ${InputClass.NewName}`, undefined, 'text', 'Update name car...');
    const inputNewColorCar = this.elementFactory.getElement('input',
      `filter-form__color-input ${InputClass.NewColor}`, undefined, 'color');
    const buttonUpdate = this.elementFactory.getElement('button',
      `filter-form__button ${ButtonClass.Update} ${DynamicClass.Inactive}`, 'Update');
    const buttonsWrapper = this.elementFactory.getElement('div', 'filter-form__wrapper');
    const buttonRace = this.elementFactory.getElement('button',
      `filter-form__button ${ButtonClass.Race}`, 'Race');
    const buttonReset = this.elementFactory.getElement('button',
      `filter-form__button button--reset ${DynamicClass.Inactive}`, 'Reset');
    const buttonGenerateCars = this.elementFactory.getElement('button',
      `filter-form__button ${ButtonClass.GenerateCars}`, 'Generate Cars');

    inputNewNameCar.setAttribute('disabled', 'disabled');
    inputNewColorCar.setAttribute('disabled', 'disabled');
    createWrapper.append(inputSearchNameCar, inputSearchColorCar, buttonCreate);
    updateWrapper.append(inputNewNameCar, inputNewColorCar, buttonUpdate);
    buttonsWrapper.append(buttonRace, buttonReset, buttonGenerateCars);
    sectionFilterForm.append(createWrapper, updateWrapper, buttonsWrapper);

    return sectionFilterForm;
  }
}