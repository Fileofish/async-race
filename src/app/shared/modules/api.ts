import { LoadMode } from '../types/enums';
import { Car, EngineParams, SwitchEngine, Winner, ApiDataNewCar, PutWinner, GetApiDataWinnersArgs } from '../types/interfaces';

export class Api {
  async getApiDataCars(loadMode: LoadMode, page?: number): Promise<[Car[], number]>{
    let response: Response;

    switch (loadMode) {
      case LoadMode.Page:
        response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);
        break;
      case LoadMode.All:
        response = await fetch(`http://127.0.0.1:3000/garage`);
    }

    const cars = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
  
    return [cars, count];
  }

  async getApiDataCar(id: number): Promise<[Car]>{
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
    const car = await response.json();
  
    return [car];
  }

  async deleteApiDataCar(id: number): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {method: 'DELETE',});
    try {
      await fetch(`http://127.0.0.1:3000/winners/${id}`, {method: 'DELETE',});
    } catch {
      console.log('winner not found');
    }
  }

  async patchApiDataCar(id: number, body: ApiDataNewCar): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  async postApiDataCar(...body: ApiDataNewCar[]): Promise<void> {
    await body.forEach((car) => (fetch(`http://127.0.0.1:3000/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })));
  }

  async startOrStopCarEngine(id: number, status: string): Promise<EngineParams> {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {method: 'PATCH'});
    const engineParams = await response.json();

    return engineParams;
  }

  async switchCarEngine(id: number): Promise<SwitchEngine> {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {method: 'PATCH'});
    const isSuccess = await response.json();

    return isSuccess;
  }

  async getApiDataWinners(args: GetApiDataWinnersArgs): Promise<[Winner[], number]> {
    let response: Response;

    switch (args.loadMode) {
      case LoadMode.Page:
        response = await fetch(
          `http://127.0.0.1:3000/winners?_page=${args.page}&_limit=10&_sort=${args.sort}&_order=${args.order}`
        );
        break;
      case LoadMode.All:
        response = await fetch(`http://127.0.0.1:3000/winners`);
    }
    
    const winners = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
  
    return [winners, count];
  }

  async postApiDataWinner(body: PutWinner): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  async putApiDataWinner(id: number, body: PutWinner): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}