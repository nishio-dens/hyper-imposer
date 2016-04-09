/// <reference path="../../typings/main.d.ts" />

import { AspectRatio } from "./aspectRatio";
import { VirtualCanvasSize } from "./virtualCanvasSize";
import { Canvas } from "./canvas";

export class Renderer {
  // canvas
  private canvas: Canvas;
  private isDebug: boolean;
  // レンダリングするCanvasの幅
  private canvasWidth: number;
  // レンダリングするCanvasの高さ
  private canvasHeight: number;
  // 仮想canvasの幅
  private virtualCanvasWidth: number;
  // 仮想canvasの高さ
  private virtualCanvasHeight: number;

  constructor(canvasId: string, canvasWidth: number,
              canvasHeight: number, aspectRatio: AspectRatio) {
    this.canvas = new Canvas(canvasId);

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    if (aspectRatio === AspectRatio.AR16_9) {
      this.virtualCanvasWidth = VirtualCanvasSize.AR16_9_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR16_9_HEIGHT;
    } else {
      this.virtualCanvasWidth = VirtualCanvasSize.AR4_3_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR4_3_HEIGHT;
    }
  }

  public setDebugMode(isDebug: boolean) {
    this.isDebug = isDebug;
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  public xToVirtualX(point: number): number {
    // TODO: canvasの幅が16:9 または 4:3 ではない時の対応
    var scale: number = this.virtualCanvasWidth / this.canvasWidth;
    return point * scale;
  }

  public yToVirtualY(point: number): number {
    // TODO: canvasの幅が16:9 または 4:3 ではない時の対応
    var scale: number = this.virtualCanvasHeight / this.canvasHeight;
    return point * scale;
  }

  public virtualXToX(point: number): number {
    // TODO: canvasの幅が16:9 または 4:3 ではない時の対応
    var scale: number = this.canvasWidth / this.virtualCanvasWidth;
    return point * scale;
  }

  public virtualYToY(point: number): number {
    // TODO: canvasの幅が16:9 または 4:3 ではない時の対応
    var scale: number = this.canvasHeight / this.virtualCanvasHeight;
    return point * scale;
  }

  public clear() {
    this.canvas.clear(this.canvasWidth, this.canvasHeight);
  }

  public render() {
    var actionTime: number = 0;
    if (this.isDebug) { actionTime = new Date().getTime(); }

    // this.canvas.drawLine(10, 10, 100, 100, "#FF0000", 1);
    this.canvas.drawRect(
      this.virtualXToX(0),
      this.virtualYToY(0),
      this.virtualXToX(this.virtualCanvasWidth),
      this.virtualYToY(this.virtualCanvasHeight),
      "#00FF00", 2);

    if (this.isDebug) {
      var time: number = new Date().getTime() - actionTime;
      console.log("Rendering " + time + "ms");
    }
  }
}
