/// <reference path="../../typings/main.d.ts" />

import { AspectRatio } from "./aspectRatio";
import { VirtualCanvasSize } from "./virtualCanvasSize";

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

    if (aspectRatio === AspectRatio.AR16_9) {
      this.virtualCanvasWidth = VirtualCanvasSize.AR16_9_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR16_9_HEIGHT;
    } else {
      this.virtualCanvasWidth = VirtualCanvasSize.AR4_3_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR4_3_HEIGHT;
    }
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
  }

  public render() {
  }
}
