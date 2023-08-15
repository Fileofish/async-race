import { ApiDataNewCar } from '../../shared/types/interfaces';

export class CarRandomizer {
  getArrCar(cars: string[]): ApiDataNewCar[] {
    const currentCarsCount = cars.length;
    const allArray = new Set(cars);
    const carBrands = [
      'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Volkswagen',
      'Hyundai', 'Kia', 'Subaru', 'Lexus', 'Mazda', 'Tesla', 'Volvo', 'Porsche', 'Jaguar', 'Land Rover',
      'Ferrari', 'Lamborghini', 'Bugatti', 'Maserati', 'Alfa Romeo', 'Bentley', 'Rolls-Royce', 'Aston Martin',
      'McLaren', 'Mini', 'Jeep', 'Dodge', 'Chrysler', 'Fiat', 'Peugeot', 'Renault', 'Citroen', 'Skoda', 'Seat',
      'Suzuki', 'Mitsubishi', 'Infiniti', 'Genesis', 'Buick', 'Cadillac', 'Lincoln', 'Acura', 'Smart', 'Saab'
    ];
    const englishAlphabet = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    const numbers = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    const countNumbers = 3 + Math.floor(currentCarsCount / 1000);

    while (allArray.size < currentCarsCount + 100) {
      let randomCarModel = carBrands[Math.floor(Math.random() * 48)] + ' ';

      for(let i = 0; i < 3; i++) {
        randomCarModel += englishAlphabet[Math.floor(Math.random() * 26)];
      }

      for(let i = 0; i < countNumbers; i++) {
        randomCarModel += numbers[Math.floor(Math.random() * 10)];
      }

      allArray.add(randomCarModel);
    }

    const response = Array.from(allArray).slice(currentCarsCount).map((carName) => {
      return {
        name: carName,
        color: this.getRandomColor()
      };
    });

    return response;
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}