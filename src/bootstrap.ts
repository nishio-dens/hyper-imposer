/// <reference path="../typings/main.d.ts" />

import { AspectRatio } from "./renderer/aspectRatio";
import { Renderer } from "./renderer/renderer";

export class Bootstrap {
  private debug = false;
  private renderer: Renderer;

  constructor(debug: boolean) {
    this.debug = debug;
    if (this.isDebugMode()) {
      console.log("Initialize HyperImposer");
    }
  }

  public initializeRenderer(
    canvasId: string, width: number, height: number, aspect: AspectRatio, metricsCsv: string
  ) {
    this.renderer = new Renderer(canvasId, width, height, aspect, metricsCsv);
    this.renderer.setDebugMode(this.isDebugMode());

    return this.renderer;
  }

  public isDebugMode() {
    return this.debug;
  }
}

(function() {
  (<any>window).HyperImposer = {
    Bootstrap: Bootstrap,
    AspectRatio: AspectRatio
  };
})();
