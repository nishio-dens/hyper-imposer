/// <reference path="../typings/main.d.ts" />

import { AspectRatio } from "./renderer/aspectRatio";
import { Renderer } from "./renderer/renderer";

declare function require(string): any;
var opentype = require("opentypejs");

export class Bootstrap {
  private debug = false;
  private renderer: Renderer;
  private opentype: any;

  constructor(debug: boolean) {
    this.debug = debug;
    if (this.isDebugMode()) {
      console.log("Initialize HyperImposer");
    }
  }

  public loadFont(fontPath: string, callback: any) {
    opentype.load(fontPath, (error, font) => {
      this.opentype = font;
      callback();
    });
  }

  public initializeRenderer(
    canvasId: string, width: number, height: number, aspect: AspectRatio,
    fontName: string, fontSize: number
  ) {
    this.renderer = new Renderer(
      canvasId, width, height, aspect, fontName, fontSize, this.opentype
    );
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
