/// <reference path="../../typings/main.d.ts" />

import { VirtualCanvas } from "./virtualCanvas";

export class CaptionSafeZoneRenderer {
  private canvas: VirtualCanvas;
  private safeZoneColor = "#ff0000";
  private safeZoneWidth = 1;
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

  public drawSafeZone() {
    this.drawSafeZoneVirticalLeft();
    this.drawSafeZoneVirticalRight();
    this.drawSafeZoneHorizontalTop();
    this.drawSafeZoneHorizontalBottom();
  }

  private drawSafeZoneVirticalLeft() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetX = (width * ((100 - this.safeZoneXPercent) / 100)) / 2;

    this.canvas.drawLine(
      offsetX,
      0,
      offsetX,
      height,
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }

  private drawSafeZoneVirticalRight() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetX = (width * ((100 - this.safeZoneXPercent) / 100)) / 2;

    this.canvas.drawLine(
      width - offsetX,
      0,
      width - offsetX,
      height,
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }

  private drawSafeZoneHorizontalTop() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetY = (height * ((100 - this.safeZoneYPercent) / 100)) / 2;

    this.canvas.drawLine(
      0,
      offsetY,
      width,
      offsetY,
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }

  private drawSafeZoneHorizontalBottom() {
    var width = this.canvas.getVirtualCanvasWidth();
    var height = this.canvas.getVirtualCanvasHeight();
    var offsetY = (height * ((100 - this.safeZoneYPercent) / 100)) / 2;

    this.canvas.drawLine(
      0,
      height - offsetY,
      width,
      height - offsetY,
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }
}
