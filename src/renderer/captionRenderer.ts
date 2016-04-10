/// <reference path="../../typings/main.d.ts" />

import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private outerFrameColor= "#00ff00";
  private boundingBoxColor = "#0000ff";
  private projectLineWidth: number = 1;
  private fontName: string;
  private fontSize: number;

  private renderingTexts: any;

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
    text: string, position: CaptionPosition, alignment: CaptionAlignment,
    virtical: boolean = false, refresh: boolean = true
  ) {
    if (refresh) {
      this.renderingTexts = {};
    }

    // TODO: 追加
  }

  /**
  * 字幕をレンダリングする
  */
  public render() {
    var char = "う";
    // this.drawHorizontalCharBoundingBox(char, 10000, 1000);
    // this.drawHorizontalCharOuterFrame(char, 10000, 1000);
    // this.drawChar(char, 10000, 1000);
  }

  public renderBoundingBox() {
  }

  /**
  * 横方向字幕レンダリングのポジション計算
  */
  public calcHorizontalDrawingPosition(
    text: string, position: CaptionPosition, alignment: CaptionAlignment
  ) {
    // var metrics = this.metricsTable.getMetrics(char, this.fontSize);
    // var position = new CharRenderingPosition({
    //   char: char,
    //   startX: startX,
    //   startY: startY + metrics.hby + metrics.vby,
    //   width: metrics.ha,
    //   height: metrics.va
    // });
  }

  private renderChar(char: CaptionChar) {
    this.canvas.drawChar(
      char.char, this.fontName, this.fontSize,
      char.startX, char.startY
    );
  }

  /**
  * 文字外枠を描画
  */
  private renderCharOuterFrame(char: CaptionChar) {
    this.canvas.drawRect(
      char.startX, char.startY,
      char.metrics.ha, char.metrics.va,
      this.outerFrameColor, this.projectLineWidth
    );
  }

  /**
  * 文字のバウンディングボックスを描画する
  */
  private renderCharBoundingBox(char: CaptionChar) {
    this.canvas.drawRect(
      char.startX + char.metrics.hbx, char.startY + char.metrics.vby,
      char.metrics.width, char.metrics.height,
      this.boundingBoxColor, this.projectLineWidth
    );
  }
}
