/// <reference path="../../typings/main.d.ts" />

import { AspectRatio } from "./aspectRatio";

export class Renderer {
  // レンダリングするCanvasの幅
  private canvasWidth: number;
  // レンダリングするCanvasの高さ
  private canvasHeight: number;
  // 仮想canvasの幅
  private virtualCanvasWidth: number;
  // 仮想canvasの高さ
  private virtualCanvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number, aspectRatio: AspectRatio) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
  }

  public render() {
  }
}
