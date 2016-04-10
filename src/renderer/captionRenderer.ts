/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { MetricsTable } from "../fonts/metricsTable";
import { VirtualCanvas } from "./virtualCanvas";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";

export class CaptionRenderer {
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private captionSafeZone: CaptionSafeZone;
  private outerFrameColor = "#00ff00";
  private boundingBoxColor = "#0000ff";
  private projectLineWidth: number = 1;
  private fontName: string;
  private fontSize: number;

  // 基準文字 この文字の大きさを元に日本語の外枠を決める
  private baseJapaneseCharacter : string = "国";
  private baseJapaneseCharacterSize : number;

  private renderingTexts: any;

  // TODO: サイズ変更に対応
  constructor(
    canvas: VirtualCanvas, metricsTable: MetricsTable,
    captionSafeZone: CaptionSafeZone,
    fontName: string, fontSize: number
  ) {
    this.canvas = canvas;
    this.metricsTable = metricsTable;
    this.captionSafeZone = captionSafeZone;

    this.fontName = fontName;
    this.fontSize = fontSize;

    this.calcBaseCharMetrics();
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
    this.renderingTexts[position] = this.calcHorizontalDrawingPosition(text, position, alignment);
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
  * 日本語文字外枠を計算
  */
  private calcBaseCharMetrics() {
    var m = this.metricsTable.getMetrics(this.baseJapaneseCharacter, this.fontSize);
    var size = 0;
    if (m.ha > m.va) {
      size = m.ha;
    } else {
      size = m.va;
    }
    this.baseJapaneseCharacterSize = size;
  }

  /**
  * 横方向字幕レンダリングのポジション計算
  */
  private calcHorizontalDrawingPosition(
    text: string, position: CaptionPosition, alignment: CaptionAlignment
  ) : CaptionChar[] {
    var startX = 0, startY = 0;

    if (position === CaptionPosition.BOTTOM_LEFT && alignment === CaptionAlignment.START) {
      startX = this.captionSafeZone.getSafeStartX();
      startY = this.captionSafeZone.getSafeEndY();
    } else {
      console.log("Not Implemented Yet");
    }

    var textMetrics = this.calcCharMetrics(text);
    var renderText = [];
    var currentXPosition = startX;
    var currentYPosition = startY;

    for (var i = 0; i < text.length; i++) {
      var m : Metrics = textMetrics[i];
      var cc  = new CaptionChar({
        char: text[i],
        startX: currentXPosition,
        startY: currentYPosition - this.baseJapaneseCharacterSize,
        charStartX: currentXPosition,
        charStartY: currentYPosition + m.hby + m.vby - this.baseJapaneseCharacterSize,
        width: m.ha,
        height: m.va,
        metrics: m
      });
      renderText.push(cc);

      currentXPosition += m.ha;
    }

    return renderText;
  }

  private calcCharMetrics(text: string) : Metrics[] {
    var metrics : Metrics[] = [];
    for (var i = 0; i < text.length; i++) {
      metrics.push(this.metricsTable.getMetrics(text[i], this.fontSize));
    }
    return metrics;
  }

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
