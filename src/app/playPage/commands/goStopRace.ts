import { ButtonClass, DynamicClass, RaceListClass } from '../../shared/types/enums';
import { DriveCar } from './driveCar';

export class GoStopRace {
  private readonly driveCar = new DriveCar();

  async goRace(startRaceButton: Element): Promise<void> {
    const carStartButtons = document.querySelectorAll(`.${RaceListClass.MoveButtonStart}`);
    const resetRaceButton = document.querySelector(`.${ButtonClass.Reset}`);

    this.driveCar.isRace = true;
    await carStartButtons.forEach((button) => {
      this.driveCar.go(button);
    });

    resetRaceButton?.classList.toggle(DynamicClass.Inactive);
    startRaceButton?.classList.toggle(DynamicClass.Inactive);
  }

  async stopRace(resetRaceButton: Element): Promise<void> {
    const carStopButtons = document.querySelectorAll(`.${RaceListClass.MoveButtonStop}`);
    const startRaceButton = document.querySelector(`.${ButtonClass.Race}`);

    await carStopButtons.forEach((button) => {
      this.driveCar.stop(button);
    });

    resetRaceButton?.classList.toggle(DynamicClass.Inactive);
    startRaceButton?.classList.toggle(DynamicClass.Inactive);
  }
}