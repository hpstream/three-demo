import { GamePage } from './../pagas/game-page';
import { GameOverPage } from "../pagas/game-over-page";





export default class GameView {
  gamePage: GamePage;
  gameOverPage: GameOverPage;
  constructor() {

  }

  initGameOverPage(callbacks: any) {

    this.gameOverPage = new GameOverPage(callbacks);
    this.gamePage.init();

  }

  initGamePage(callbacks: any) {

    this.gamePage = new GamePage(callbacks);
    this.gamePage.init();

  }

  showGameOverPage() {
    this.gameOverPage.show();
  }

}

