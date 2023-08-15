import { playPage } from './playPage/playPage';

export class App {
  private readonly playPage = new playPage();

  start(): void {
    this.playPage.initPlayPage();
  }
}