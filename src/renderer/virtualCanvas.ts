/// <reference path="../../typings/main.d.ts" />

import { CaptionChar } from "../captions/captionChar";

export class VirtualCanvas {
  // canvas
  private canvas;
  private canvasContext;

  // レンダリングするCanvasの幅
  private canvasWidth: number;
  // レンダリングするCanvasの高さ
  private canvasHeight: number;
  // 仮想canvasの幅
  private virtualCanvasWidth: number;
  // 仮想canvasの高さ
  private virtualCanvasHeight: number;
  // 仮想canvas offset
  private canvasOffsetX: number;
  private canvasOffsetY: number;

  private opentype;

  constructor(
    canvasId: string, canvasWidth: number, canvasHeight: number,
    virtualCanvasWidth: number, virtualCanvasHeight: number,
    opentype: any,
    canvasOffsetX: number = 0, canvasOffsetY: number = 0
  ) {
    this.canvas = document.getElementById(canvasId);
    this.canvasContext = this.canvas.getContext("2d");

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.virtualCanvasWidth = virtualCanvasWidth;
    this.virtualCanvasHeight = virtualCanvasHeight;
    this.canvasOffsetX = canvasOffsetX;
    this.canvasOffsetY = canvasOffsetY;

    this.opentype = opentype;
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  public getCanvasContext() {
    return this.canvasContext;
  }

  public drawLine(fromX, fromY, toX, toY, color, lineWidth) {
    var ctx = this.getCanvasContext();

    var x1 = this.virtualXToX(fromX);
    var y1 = this.virtualYToY(fromY);
    var x2 = this.virtualXToX(toX);
    var y2 = this.virtualYToY(toY);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }

  public drawRect(fromX, fromY, width, height, color, lineWidth) {
    var ctx = this.getCanvasContext();
    ctx.beginPath();

    var x1 = this.virtualXToX(fromX);
    var y1 = this.virtualYToY(fromY);
    var vWidth = this.virtualXToX(width);
    var vHeight = this.virtualYToY(height);

    ctx.rect(x1, y1, vWidth, vHeight);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }

  //
  // Deprecated
  //
  // public drawChar(char, fontName, fontSize, startX, startY) : void {
  //   var ctx = this.getCanvasContext();
  //   ctx.font = fontSize + "px " + fontName;
  //   ctx.textBaseline = "center";
  //   var x = this.virtualXToX(startX);
  //   var y = this.virtualYToY(startY);
  //   ctx.fillText(char, x, y);
  // }

  public drawChar(char: CaptionChar, fontSize: number) {
    var glyph = this.opentype.glyphs.get(char.metrics.gid);
    var ctx = this.getCanvasContext();
    glyph.draw(
      ctx,
      this.virtualXToX(char.charStartX),
      this.virtualYToY(char.charStartY),
      fontSize
    );
  }

  public xToVirtualX(point: number): number {
    var scale: number = (this.virtualCanvasWidth - (this.canvasOffsetX * 2)) / this.canvasWidth;
    return point * scale;
  }

  public yToVirtualY(point: number): number {
    var scale: number = (this.virtualCanvasHeight - (this.canvasOffsetY * 2)) / this.canvasHeight;
    return point * scale;
  }

  public virtualXToX(point: number): number {
    var scale: number = this.canvasWidth / (this.virtualCanvasWidth - (this.canvasOffsetX * 2));
    return point * scale;
  }

  public virtualYToY(point: number): number {
    var scale: number = this.canvasHeight / (this.virtualCanvasHeight - (this.canvasOffsetY * 2));
    return point * scale;
  }

  public getVirtualCanvasScale() : number {
    // X と Y 方向のスケールが違っていてはダメ
    var scale: number = (this.virtualCanvasWidth - (this.canvasOffsetX * 2)) / this.canvasWidth;
    return scale;
  }

  public getVirtualCanvasWidth(): number {
    return this.virtualCanvasWidth;
  }

  public getVirtualCanvasHeight(): number {
    return this.virtualCanvasHeight;
  }

  public clear() {
    var ctx = this.getCanvasContext();
    ctx.clearRect(0, 0, this.canvasWidth + 100, this.canvasHeight + 100);
  }
}
