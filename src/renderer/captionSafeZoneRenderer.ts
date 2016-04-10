/// <reference path="../../typings/main.d.ts" />

import { VirtualCanvas } from "./virtualCanvas";
import { CaptionSafeZone } from "../captions/captionSafeZone";

export class CaptionSafeZoneRenderer {
  private canvas: VirtualCanvas;
  private captionSafeZone: CaptionSafeZone;
  private safeZoneColor = "#ff0000";
  private safeZoneWidth = 1;

  constructor(
    canvas: VirtualCanvas, captionSafeZone: CaptionSafeZone
  ) {
    this.canvas = canvas;
    this.captionSafeZone = captionSafeZone;
  }
  public drawSafeZone() {
    this.drawSafeZoneVirticalLeft();
    this.drawSafeZoneVirticalRight();
    this.drawSafeZoneHorizontalTop();
    this.drawSafeZoneHorizontalBottom();
  }

  private drawSafeZoneVirticalLeft() {
    this.canvas.drawLine(
      this.captionSafeZone.getSafeStartX(),
      0,
      this.captionSafeZone.getSafeStartX(),
      this.canvas.getVirtualCanvasHeight(),
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }

  private drawSafeZoneVirticalRight() {
    this.canvas.drawLine(
      this.captionSafeZone.getSafeEndX(),
      0,
      this.captionSafeZone.getSafeEndX(),
      this.canvas.getVirtualCanvasHeight(),
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }

  private drawSafeZoneHorizontalTop() {
    this.canvas.drawLine(
      0,
      this.captionSafeZone.getSafeStartY(),
      this.canvas.getVirtualCanvasWidth(),
      this.captionSafeZone.getSafeStartY(),
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }

  private drawSafeZoneHorizontalBottom() {
    this.canvas.drawLine(
      0,
      this.captionSafeZone.getSafeEndY(),
      this.canvas.getVirtualCanvasWidth(),
      this.captionSafeZone.getSafeEndY(),
      this.safeZoneColor,
      this.safeZoneWidth
    );
  }
}
