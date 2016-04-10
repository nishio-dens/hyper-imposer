/// <reference path="../../typings/main.d.ts" />

import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private outerFrameColor= "#00ff00";
  private boundingBoxColor = "#0000ff";
  private projectLineWidth: number = 1;
  private fontName: string;
  private fontSize: number;

  constructor(
    canvas: VirtualCanvas, metricsTable: MetricsTable,
    fontName: string, fontSize: number
  ) {
    this.canvas = canvas;
    this.metricsTable = metricsTable;

    this.fontName = fontName;
    this.fontSize = fontSize;
  }

  /**
  * 横書き用 横並びの文字を書く
  * @return {number} レンダリングした文字の横送り幅を返す
  */
  public drawHorizontalChar(char, startX, startY) : number {
    var metrics = this.metricsTable.getMetrics(char);
    this.canvas.drawChar(
      char, this.fontName, this.fontSize,
      startX, startY + metrics.hby + metrics.vby
    );
    return metrics.ha;
  }

  /**
  * 横書き用 文字の外枠補助線を描画する
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
  * 横書き用 文字のバウンディングボックスを描画する
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
