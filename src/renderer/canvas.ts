/// <reference path="../../typings/main.d.ts" />

export class Canvas {
  // canvas
  private canvas;
  private canvasContext;

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvasContext = this.canvas.getContext("2d");
  }

  public getCanvasContext() {
    return this.canvasContext;
  }

  public drawLine(fromX, fromY, toX, toY, color, lineWidth) {
    var ctx = this.getCanvasContext();
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }

  public drawRect(fromX, fromY, width, height, color, lineWidth) {
    var ctx = this.getCanvasContext();
    ctx.beginPath();
    ctx.rect(fromX, fromY, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }

  public clear(canvasWidth, canvasHeight) {
    var ctx = this.getCanvasContext();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }
}
