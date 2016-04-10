/// <reference path="../../typings/main.d.ts" />

import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private outerFrameColor= "#00ff00";
  private boundingBoxColor = "#0000ff";
  private projectLineWidth: number = 1;

  constructor(canvas: VirtualCanvas, metricsTable: MetricsTable) {
    this.canvas = canvas;
    this.metricsTable = metricsTable;
  }

  /**
  * 文字の外枠補助線を描画する
  */
  public drawHorizontalCharOuterFrame(char, startX, startY) {
    var metrics = this.metricsTable.getMetrics(char);
    if (metrics) {
      this.canvas.drawRect(
        startX, startY,
        metrics.ha, metrics.va,
        this.outerFrameColor, this.projectLineWidth
      );
    }
  }

  /**
  * 文字のバウンディングボックスを描画する
  */
  public drawHorizontalCharBoundingBox(char, startX, startY) {
    var metrics = this.metricsTable.getMetrics(char);
    if (metrics) {
      this.canvas.drawRect(
        startX + metrics.hbx, startY + metrics.vby,
        metrics.width, metrics.height,
        this.boundingBoxColor, this.projectLineWidth
      );
    }
  }
}
