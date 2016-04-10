/// <reference path="../../typings/main.d.ts" />

import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private projectLineColor = "#0000ff";
  private projectLineWidth: number = 1;

  constructor(canvas: VirtualCanvas, metricsTable: MetricsTable) {
    this.canvas = canvas;
    this.metricsTable = metricsTable;
  }

  public drawHorizontalCharProjectionLine(char, startX, startY) {
    var metrics = this.metricsTable.getMetrics(char);
    if (metrics) {
      this.canvas.drawRect(
        startX, startY, metrics.width, metrics.height,
        this.projectLineColor, this.projectLineWidth
      );
    }
  }
}
