class EventObserver<TSub extends Function , TArgs extends unknown> {

    private observers: TSub[];

    constructor () {
      this.observers = []
    }
  
    subscribe (fn: TSub) {
      this.observers.push(fn)
    }
  
    unsubscribe (fn: TSub) {
      this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }
  
    broadcast (args: TArgs) {
      this.observers.forEach(subscriber => subscriber(args))
    }
}

export default EventObserver;