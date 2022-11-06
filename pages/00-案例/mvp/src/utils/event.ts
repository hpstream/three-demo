export default class Event {

  _listeners: any[];
  _sender: any;
  constructor(sender: any) {
    this._sender = sender
    this._listeners = []
  }

  attach(callback) {
    this._listeners.push(callback)
  }

  notify(args) {
    for (let i = 0; i < this._listeners.length; i++) {
      this._listeners[i](this._sender, args)
    }
  }
}

