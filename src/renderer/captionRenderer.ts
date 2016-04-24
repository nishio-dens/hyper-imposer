/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { FontTable } from "../fonts/fontTable";
import { VirtualCanvas } from "./virtualCanvas";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";
import { HorizontalTypeSetter } from "../captions/horizontalTypeSetter";
import { VerticalTypeSetter } from "../captions/verticalTypeSetter";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private fontTable: FontTable;
  private captionSafeZone: CaptionSafeZone;
  private outerFrameColor = "#00ff00";
  private boundingBoxColor = "#0000ff";
  private projectLineWidth: number = 1;
  private fontName: string;
  private fontSize: number;
  private verticalTypeSetter: VerticalTypeSetter;
  private horizontalTypeSetter: HorizontalTypeSetter;

  private renderingTexts: any;

  constructor(
    canvas: VirtualCanvas, fontTable: FontTable,
    captionSafeZone: CaptionSafeZone,
    fontName: string, fontSize: number
  ) {
    this.initialize(canvas, fontTable, captionSafeZone, fontName, fontSize);
  }

  public initialize(
    canvas: VirtualCanvas, fontTable: FontTable,
    captionSafeZone: CaptionSafeZone,
    fontName: string, fontSize: number
  ) {
    this.canvas = canvas;
    this.fontTable = fontTable;
    this.captionSafeZone = captionSafeZone;

    this.fontName = fontName;
    this.fontSize = fontSize;

    this.horizontalTypeSetter = new HorizontalTypeSetter(
      this.captionSafeZone,
      this.fontSize,
      this.fontTable
    );
    this.verticalTypeSetter = new VerticalTypeSetter(
      this.captionSafeZone,
      this.fontSize,
      this.fontTable
    );
  }

  public addCaptionText(
    text: string, position: CaptionPosition, alignment: CaptionAlignment,
    virtical: boolean = false, refresh: boolean = true
  ) {
    if (refresh) {
      this.renderingTexts = {};
    }

    if (virtical) {
      this.renderingTexts[position] = this.verticalTypeSetter
        .calcDrawingPosition(text, position, alignment);
    } else {
      this.renderingTexts[position] = this.horizontalTypeSetter
        .calcDrawingPosition(text, position, alignment);
    }
  }

  /**
  * 字幕をレンダリングする
  */
  public render() {
    for (var position in this.renderingTexts) {
      var ccs = this.renderingTexts[position];
      for (var i = 0; i < ccs.length; i++) {
        this.renderChar(ccs[i]);
      }
    }
  }

  public renderBoundingBox() {
    for (var position in this.renderingTexts) {
      var ccs = this.renderingTexts[position];
      for (var i = 0; i < ccs.length; i++) {
        this.renderCharBoundingBox(ccs[i]);
        this.renderCharOuterFrame(ccs[i]);
      }
    }
  }

  /**
  * 文字を描画
  */
  private renderChar(char: CaptionChar) {
    this.canvas.drawChar(char, this.fontSize);
  }

  /**
  * 文字外枠を描画
  */
  private renderCharOuterFrame(char: CaptionChar) {
    this.canvas.drawRect(
      char.renderingStartX, char.renderingStartY,
      char.ha, char.va,
      this.outerFrameColor, this.projectLineWidth
    );
  }

  /**
  * 文字のバウンディングボックスを描画する
  */
  private renderCharBoundingBox(char: CaptionChar) {
    var startX = char.renderingStartX;
    var startY = char.renderingStartY;
    if (char.degreeOfRotation === 90) {
      startX = startX + (char.metrics.va - char.metrics.vby - char.metrics.height);
      startY += char.metrics.hbx;
    } else {
      startX += char.metrics.hbx;
      startY += char.metrics.vby;
    }
    this.canvas.drawRect(
      startX, startY,
      char.width, char.height,
      this.boundingBoxColor, this.projectLineWidth
    );
  }
}
