class EventBus<TArgs> {

    private subscribers: ((...args: TArgs[]) => void)[];

    constructor () {
        this.subscribers = []
      }
    
      on (fn: (...args: TArgs[]) => void) {
        this.subscribers.push(fn)
      }
    
      off (fn: (...args: TArgs[]) => void) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn)
      }
    
      trigger (arg: TArgs) {
        this.subscribers.forEach(subscriber => subscriber(arg))
      }
}

export default EventBus;