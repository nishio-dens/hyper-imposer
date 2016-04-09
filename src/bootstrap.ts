/// <reference path="../typings/main.d.ts" />

import { AspectRatio } from "./renderer/aspectRatio";
import { Renderer } from "./renderer/renderer";

export class Bootstrap {
  private debug = false;
  private renderer: Renderer;

  constructor(debug: boolean) {
    (<any>window).HyperImporserDebug = debug;
    if (this.isDebugMode()) {
      console.log("Initialize HyperImposer");
    }
  }

  public initializeRenderer(width: number, height: number, aspect: AspectRatio) {
    this.renderer = new Renderer(width, height, aspect);
  }

  public isDebugMode() {
    return (<any>window).HyperImporserDebug;
  }
}

(function() {
  (<any>window).HyperImposer = {
    Bootstrap: Bootstrap,
    AspectRatio: AspectRatio
  };
})();
