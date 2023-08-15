import { LoadMode } from './enums';

export interface Car {
  name: string,
  color: string,
  id: number,
}

export interface EngineParams {
  velocity: number,
  distance: number,
}

export interface SwitchEngine {
  success: boolean,
}

export interface Winner {
  id: number,
  wins: number,
  time: number,
}

export interface PutWinner {
  wins: number,
  time: number,
}

export interface ApiDataNewCar {
  name: string,
  color: string,
}

export interface GetApiDataWinnersArgs {
  loadMode: LoadMode,
  page?: number,
  sort?: string,
  order?: string
}

export interface ApiDataWinners {
  winners: Winner[],
  count: number,
}

export interface ApiDataCars {
  cars: Car[],
  count?: number,
}