/// <reference path="../../typings/main.d.ts" />

import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";
import { CharRenderingPosition } from "./charRenderingPosition";

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

  public addCaptionText(
    text: string, position, alignment,
    virtical: boolean = false, refresh: boolean = true
  ) {
  }

  /**
  * 字幕をレンダリングする
  */
  public render() {
    var char = "う";
    this.drawHorizontalCharBoundingBox(char, 10000, 1000);
    this.drawHorizontalCharOuterFrame(char, 10000, 1000);
    this.drawChar(char, 10000, 1000);
  }

  /**
  * 字幕の外枠、バウンディングボックス補助線をレンダリングする
  */
  public renderBoundingBox() {
  }

  /**
  * 横方向に文字を書く
  */
  private drawHorizontalText(text, startX, startY) {
  }

  /**
  * 文字を書く
  * @return {CharRenderingPosition} レンダリングした文字の位置情報を返す
  */
  private drawChar(char, startX, startY) : CharRenderingPosition {
    var metrics = this.metricsTable.getMetrics(char, this.fontSize);
    var position = new CharRenderingPosition({
      char: char,
      startX: startX,
      startY: startY + metrics.hby + metrics.vby,
      width: metrics.ha,
      height: metrics.va
    });

    this.canvas.drawChar(
      char, this.fontName, this.fontSize,
      position.startX, position.startY
    );

    return position;
  }

  /**
  * 横書き用 文字の外枠補助線を描画する
  */
  private drawHorizontalCharOuterFrame(char, startX, startY) {
    var metrics = this.metricsTable.getMetrics(char, this.fontSize);
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
  private drawHorizontalCharBoundingBox(char, startX, startY) {
    var metrics = this.metricsTable.getMetrics(char, this.fontSize);
    if (metrics) {
      this.canvas.drawRect(
        startX + metrics.hbx, startY + metrics.vby,
        metrics.width, metrics.height,
        this.boundingBoxColor, this.projectLineWidth
      );
    }
  }
}
