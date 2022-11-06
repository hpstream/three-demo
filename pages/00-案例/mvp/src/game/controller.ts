import GameView from './view'
import GameModel from './model'

class GameController {
  gameView: GameView
  gameModel: GameModel;

  constructor() {
    this.gameView = new GameView();
    this.gameModel = new GameModel();

  }
  initPages() {
    const gamePageCallbacks = {
      showGameOverPage: this.showGameOverPage
    }

    const gameOverPageCallbacks = {
      gameRestart: this.restarGame
    }



    this.gameView.initGamePage(gamePageCallbacks)
    this.gameView.initGameOverPage(gameOverPageCallbacks)
  }
  showGameOverPage = () => {
    this.gameView.showGameOverPage();
  }
  restarGame = () => {
    this.gameView.gamePage.restart();
  }

}

export default new GameController()