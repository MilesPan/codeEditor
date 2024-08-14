import { makeAutoObservable } from 'mobx';

class DebugStore {
  debugActive: boolean = false;
  setDebugActive(status: boolean) {
    this.debugActive = status;
  }

  isDebugging: boolean = false;
  setIsDebugging(status: boolean) {
    this.isDebugging = status;
  }
  breakPoints: Set<number> = new Set();
  constructor() {
    makeAutoObservable(this);
  }
}

export default new DebugStore();
