/// <reference path="../typings/main.d.ts" />

namespace HyperImposer {
  export class Bootstrap {

    private debug = false;

    constructor(debug: boolean) {
      (<any>window).HyperImporserDebug = debug;
      if (this.isDebugMode()) {
        console.log('Initialize HyperImposer');
      }
    }

    public isDebugMode() {
      return (<any>window).HyperImporserDebug;
    }
  }
}

(function() {
  (<any>window).HyperImposer = HyperImposer.Bootstrap;
})();
