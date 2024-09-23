
class EventBus {
    private listeners: Record<string, EventCallback[]> = {}
  
    on<T extends any[]>(event: string, callback: EventCallback<T>): void {
      if (this.listeners[event] === undefined) {
        this.listeners[event] = []
      }
      this.listeners[event].push(callback as EventCallback)
    }
  
    off<T extends any[]>(event: string, callback: EventCallback<T>): void {
      if (this.listeners[event] === undefined) {
        throw new Error(`Нет события: ${event}`)
      }
  
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      )
    }
  
    emit<T extends any[]>(event: string, ...args: T): void {
      if (this.listeners[event] === undefined) {
        throw new Error(`Нет события: ${event}`)
      }
  
      this.listeners[event].forEach(listener => {
        listener(...args)
      })
    }
  }
  
  export { EventBus }