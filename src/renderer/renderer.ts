/// <reference path="../../typings/main.d.ts" />

import { AspectRatio } from "./aspectRatio";
import { VirtualCanvasSize } from "./virtualCanvasSize";
import { VirtualCanvas } from "./virtualCanvas";

export class Renderer {
  // canvas
  private canvas: VirtualCanvas;
  private isDebug: boolean;

  private virtualCanvasWidth: number;
  private virtualCanvasHeight: number;

  constructor(canvasId: string, canvasWidth: number,
              canvasHeight: number, aspectRatio: AspectRatio) {
    if (aspectRatio === AspectRatio.AR16_9) {
      this.virtualCanvasWidth = VirtualCanvasSize.AR16_9_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR16_9_HEIGHT;
    } else {
      this.virtualCanvasWidth = VirtualCanvasSize.AR4_3_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR4_3_HEIGHT;
    }

    // TODO: 実際のcanvasの大きさが16:9 または 4:3 でないときは OffsetX, OffsetYを渡さなければならない
    this.canvas = new VirtualCanvas(
      canvasId, canvasWidth, canvasHeight, this.virtualCanvasWidth, this.virtualCanvasHeight
    );
  }

  public setDebugMode(isDebug: boolean) {
    this.isDebug = isDebug;
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    this.canvas.setCanvasSize(canvasWidth, canvasHeight);
  }

  public clear() {
    this.canvas.clear();
  }

  public render() {
    var actionTime: number = 0;
    if (this.isDebug) { actionTime = new Date().getTime(); }

    this.canvas.drawLine(10, 10, 10000, 10000, "#FF0000", 1);
    this.canvas.drawRect(0, 0, this.virtualCanvasWidth, this.virtualCanvasHeight, "#00FF00", 2);

    if (this.isDebug) {
      var time: number = new Date().getTime() - actionTime;
      console.log("Rendering " + time + "ms");
    }
  }
}
