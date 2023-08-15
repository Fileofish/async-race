import { Api } from '../../shared/modules/api';
import { IdClass, DynamicClass, RaceListClass } from '../../shared/types/enums';
import { GetWinner } from './getWinner';

type TimeFraction = number;
interface animateCar {
  duration: number,
  timing: (timeFraction: TimeFraction) => TimeFraction,
  draw: (progress: number) => void,
}

export class DriveCar {
  private readonly api = new Api();
  private readonly getWinner = new GetWinner();
  private readonly animationMap: Record<number, number> = {};
  private readonly stopCarMap: Record<number, boolean> = {};
  isRace = false;

  async go(startButton: Element): Promise<void> {
    const carId = parseInt(startButton.className.split('Id')[1]);
    const stopButton = document.querySelector(`.${IdClass.ButtonStop}${carId}`);
    const carName = document.querySelector(`.${IdClass.CarName}${carId}`);
    const car = document.querySelector(`.${IdClass.Car}${carId}`) as HTMLElement;
    const track = document.querySelector(`.${RaceListClass.RowCar}`) as HTMLElement;
    const widthTrack = track?.offsetWidth;
    const widthStart = 170;
    const engineParams = await this.api.startOrStopCarEngine(carId, 'started');
    const time = engineParams.distance / engineParams.velocity;
    const animationId = this.animateCar({
      duration: time,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        if (car) car.style.marginLeft = progress * (widthTrack - widthStart) + 'px';
      }
    }, carId);

    this.getWinner.isFirstCar = this.isRace;
    this.animationMap[carId] = animationId;
    this.stopCarMap[carId] = true;
    !startButton.classList.contains(DynamicClass.Inactive) && startButton.classList.add(DynamicClass.Inactive);
    stopButton?.classList.remove(DynamicClass.Inactive);
    
    try {
      await this.api.switchCarEngine(carId);

      if (this.stopCarMap[carId]) this.stopCarMap[carId] = true;

      if (this.getWinner.isFirstCar) {
        this.getWinner.resultsTable(carId, time);
        this.getWinner.isFirstCar = false;
      }
    } catch {
      this.stopAnimation(carId);

      if (this.stopCarMap[carId]) {
        console.warn(`Engine ${carName?.innerHTML} broke!!!`);
        this.stopCarMap[carId] = true;
      }
    }
  }

  async stop(stopButton: Element): Promise<void> {
    const carId = parseInt(stopButton.className.split('Id')[1]);
    const startButton = document.querySelector(`.${IdClass.ButtonStart}${carId}`);
    const car = document.querySelector(`.${IdClass.Car}${carId}`) as HTMLElement;

    this.stopAnimation(carId);
  
    try {
      await this.api.startOrStopCarEngine(carId, 'stopped');
      this.stopCarMap[carId] = false;
      this.animateCar({
        duration: 0,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          if (car) car.style.marginLeft = progress * 0 + 'px';
        }
      }, -1);
      !stopButton.classList.contains(DynamicClass.Inactive) && stopButton.classList.add(DynamicClass.Inactive);
      startButton?.classList.remove(DynamicClass.Inactive);
    } catch (error) {
      console.warn('Failed to stop the car');
    }
  }

  private animateCar({ duration, timing, draw }: animateCar, carId: number): number {
    const start = performance.now();
    const animate = (time: number) => {

      let timeFraction = (time - start) / duration;

      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) this.animationMap[carId] = requestAnimationFrame(animate);

    };
    const animationId = requestAnimationFrame(animate);

    return animationId;
  }

  private stopAnimation(carId: number): void {
    const animationId = this.animationMap[carId];

    if (animationId) {
      cancelAnimationFrame(animationId);
      delete this.animationMap[carId];
    }
  }
}