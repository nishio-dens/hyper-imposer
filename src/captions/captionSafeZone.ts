/// <reference path="../../typings/main.d.ts" />

import { VirtualCanvas } from "../renderer/virtualCanvas";

export class CaptionSafeZone {
  private canvas: VirtualCanvas;

  private _safeZoneXPercent: number;
  private _safeZoneYPercent: number;

  constructor(
    canvas: VirtualCanvas, safeZoneXPercent: number = 90, safeZoneYPercent: number = 90
  ) {
    this.canvas = canvas;
    this._safeZoneXPercent = safeZoneXPercent;
    this._safeZoneYPercent = safeZoneYPercent;
  }

  get safeZoneXPercent(): number { return this._safeZoneXPercent; }
  get safeZoneYPercent(): number { return this._safeZoneYPercent; }

  set safeZoneXPercent(value: number) { this._safeZoneXPercent = value; }
  set safeZoneYPercent(value: number) { this._safeZoneYPercent = value; }

  public getSafeStartX() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetX = (width * ((100 - this.safeZoneXPercent) / 100)) / 2;
    return offsetX;
  }

  public getSafeStartY() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetY = (height * ((100 - this.safeZoneYPercent) / 100)) / 2;
    return offsetY;
  }

  public getSafeEndX() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetX = (width * ((100 - this.safeZoneXPercent) / 100)) / 2;
    return width - offsetX;
  }

  public getSafeEndY() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetY = (height * ((100 - this.safeZoneYPercent) / 100)) / 2;
    return height - offsetY;
  }
}
