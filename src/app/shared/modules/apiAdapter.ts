import { LoadMode } from '../types/enums';
import { ApiDataCars, ApiDataWinners, GetApiDataWinnersArgs } from '../types/interfaces';
import { Api } from './api';

export class ApiAdapter extends Api {
  static async adaptWinnersData(winnersArgs: GetApiDataWinnersArgs): Promise<ApiDataWinners> {
    const api = new Api();
    const winnersData = await api.getApiDataWinners(winnersArgs);

    return {
      winners: winnersData[0],
      count: winnersData[1],
    };
  }

  static async adaptCarsData(mode: LoadMode, page?: number): Promise<ApiDataCars> {
    const api = new Api();
    const winnersData = await api.getApiDataCars(mode, page);

    return {
      cars: winnersData[0],
      count: winnersData[1],
    };
  }
}
