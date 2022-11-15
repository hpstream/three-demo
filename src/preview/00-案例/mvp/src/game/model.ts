import Event from '../utils/event'

export default class GameModel {
  stage: string;
  stageChanged: Event;

  constructor() {
    this.stage = ''
    this.stageChanged = new Event(this)
  }
  getStage() {
    return this.stage
  }

  setStage(stage: string) {
    this.stage = stage
    this.stageChanged.notify({
      stage: stage
    })
  }

}

