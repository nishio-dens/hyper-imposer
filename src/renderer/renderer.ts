/// <reference path="../../typings/main.d.ts" />

namespace HyperImposer {
  export class Renderer {

    // レンダリングするCanvasの幅
    private canvasWidth: number;
    // レンダリングするCanvasの高さ
    private canvasHeight: number;
    // 仮想canvasの幅
    private virtualCanvasWidth: number;
    // 仮想canvasの高さ
    private virtualCanvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number, aspectRatio:any) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.canvasScale = canvasScale;

      this.virtualCanvasWidth = this.canvasScale * this.canvasWidth;
      this.virtualCanvasHeight = this.canvasScale * this.canvasHeight;
    }

    public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    }

    public render() {
    }
  }
}
