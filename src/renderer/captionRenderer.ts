/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";
import { HorizontalTypeSetter } from "../captions/horizontalTypeSetter";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private captionSafeZone: CaptionSafeZone;
  private outerFrameColor = "#00ff00";
  private boundingBoxColor = "#0000ff";
  private projectLineWidth: number = 1;
  private fontName: string;
  private fontSize: number;
  private horizontalTypeSetter: HorizontalTypeSetter;

  private renderingTexts: any;

  // TODO: サイズ変更に対応
  constructor(
    canvas: VirtualCanvas, metricsTable: MetricsTable,
    captionSafeZone: CaptionSafeZone,
    fontName: string, fontSize: number
  ) {
    this.initialize(canvas, metricsTable, captionSafeZone, fontName, fontSize);
  }

  public initialize(
    canvas: VirtualCanvas, metricsTable: MetricsTable,
    captionSafeZone: CaptionSafeZone,
    fontName: string, fontSize: number
  ) {
    this.canvas = canvas;
    this.metricsTable = metricsTable;
    this.captionSafeZone = captionSafeZone;

    this.fontName = fontName;
    this.fontSize = fontSize;

    this.horizontalTypeSetter = new HorizontalTypeSetter(
      this.captionSafeZone,
      this.fontSize,
      this.metricsTable
    );
  }

  public addCaptionText(
    text: string, position: CaptionPosition, alignment: CaptionAlignment,
    virtical: boolean = false, refresh: boolean = true
  ) {
    if (refresh) {
      this.renderingTexts = {};
    }

    // TODO: 複数行対応
    // TODO: Align, Positionに対応
    this.renderingTexts[position] = this.horizontalTypeSetter
      .calcDrawingPosition(text, position, alignment);
  }

  /**
  * 字幕をレンダリングする
  */
  public render() {
    for (var position in this.renderingTexts) {
      var ccs = this.renderingTexts[position];
      for(var i = 0; i < ccs.length; i++) {
        this.renderChar(ccs[i]);
      }
    }
  }

  public renderBoundingBox() {
    for (var position in this.renderingTexts) {
      var ccs = this.renderingTexts[position];
      for(var i = 0; i < ccs.length; i++) {
        this.renderCharBoundingBox(ccs[i]);
        this.renderCharOuterFrame(ccs[i]);
      }
    }
  }

  /**
  * 文字を描画
  */
  private renderChar(char: CaptionChar) {
    this.canvas.drawChar(
      char.char, this.fontName, this.fontSize,
      char.charStartX, char.charStartY
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
