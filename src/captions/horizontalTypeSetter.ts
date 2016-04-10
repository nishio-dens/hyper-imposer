/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { MetricsTable } from "../fonts/metricsTable";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";

export class HorizontalTypeSetter {
  private captionSafeZone: CaptionSafeZone;
  private metricsTable: MetricsTable;
  private fontSize: number;

  // 基準文字 この文字の大きさを元に日本語の外枠を決める
  private baseJapaneseCharacter : string = "国";
  private baseJapaneseCharacterSize : number;

  constructor(captionSafeZone: CaptionSafeZone, fontSize: number, metricsTable: MetricsTable) {
    this.initialize(captionSafeZone, fontSize, metricsTable);
  }

  public initialize(
    captionSafeZone: CaptionSafeZone,
    fontSize: number,
    metricsTable: MetricsTable
  ) {
    this.captionSafeZone = captionSafeZone;
    this.fontSize = fontSize;
    this.metricsTable = metricsTable;

    this.calcBaseCharMetrics();
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

  private calcCharMetrics(text: string) : Metrics[] {
    var metrics : Metrics[] = [];
    for (var i = 0; i < text.length; i++) {
      metrics.push(this.metricsTable.getMetrics(text[i], this.fontSize));
    }
    return metrics;
  }

  /**
  * 横方向字幕レンダリングのポジション計算
  */
  public calcDrawingPosition(
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
}
