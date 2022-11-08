import GameView from './view'
import GameModel from './model'

class GameController {
  gameView: GameView
  gameModel: GameModel;

  constructor() {
    this.gameView = new GameView();
    this.gameModel = new GameModel();
    this.gameModel.stageChanged.attach((sender, args) => {
      const stageName = args.stage
      switch (stageName) {
        case 'game-over':
          this.gameView.showGameOverPage()
          break
        case 'game':
          this.gameView.showGamePage()
          break
        default:
      }
    })

  }
  initPages() {
    const startPageCallbacks = {
      gameRestart: () => {
        this.gameModel.setStage('game')
      }
    }

    const gamePageCallbacks = {
      showGameOverPage: () => {
        this.gameModel.setStage('game-over')
      }
    }

    const gameOverPageCallbacks = {
      gameRestart: () => {
        this.gameModel.setStage('game')
      }
    }


    this.gameView.initGamePage(startPageCallbacks)
    this.gameView.initGameOverPage(gamePageCallbacks)
  }
  showGameOverPage = () => {
    this.gameView.showGameOverPage();
  }
  restarGame = () => {
    this.gameView.gamePage.restart();
  }

}

export default GameController