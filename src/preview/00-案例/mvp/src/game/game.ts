import GameController from './controller'

class Game {
  gameController: GameController;
  constructor() {
    this.gameController = new GameController();
  }

  init() {
    this.gameController.initPages()
  }
}

export default new Game()
