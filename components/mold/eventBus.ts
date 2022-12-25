export default class EventBus {
  listeners: any;

    constructor() {
      this.listeners = {};
    }
  
    on(event: string, callback: any) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
  
      this.listeners[event].push(callback);
    }
  
    off(event: string, callback: any) {
          if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        (listener:string) => listener !== callback
      );
    }
  
      emit(event:string, ...args: string[]) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      
      this.listeners[event].forEach(function(listener: (...args: string[]) => void) {
        listener(...args);
      });
    }
}