/// <reference path="../typings/main.d.ts" />

module HyperImposer {
  export class Bootstrap {

    private debug = false;

    constructor(debug: boolean) {
      this.debug = debug;
      if (this.isDebugMode()) {
        console.log('Initialize HyperImposer');
      }
    }

    public isDebugMode() {
      return this.debug;
    }
  }
}

(function() {
  (<any>window).HyperImposer = HyperImposer.Bootstrap;
})();
