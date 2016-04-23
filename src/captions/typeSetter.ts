/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { FontTable } from "../fonts/fontTable";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";

export class TypeSetter {
  protected captionSafeZone: CaptionSafeZone;
  protected fontTable: FontTable;
  protected fontSize: number;

  // 基準文字 この文字の大きさを元に日本語の外枠を決める
  protected baseJapaneseCharacter : string = "国";
  protected baseJapaneseCharacterSize : number;

  constructor(captionSafeZone: CaptionSafeZone, fontSize: number, fontTable: FontTable) {
    this.initialize(captionSafeZone, fontSize, fontTable);
  }

  public initialize(
    captionSafeZone: CaptionSafeZone,
    fontSize: number,
    fontTable: FontTable
  ) {
    this.captionSafeZone = captionSafeZone;
    this.fontSize = fontSize;
    this.fontTable = fontTable;

    this.calcBaseCharMetrics();
  }

  /**
  * 日本語文字外枠を計算
  */
  protected calcBaseCharMetrics() {
    var m = this.fontTable.getMetrics(this.baseJapaneseCharacter, this.fontSize);
    var size = 0;
    if (m.ha > m.va) {
      size = m.ha;
    } else {
      size = m.va;
    }
    this.baseJapaneseCharacterSize = size;
  }

  protected calcCharMetrics(text: string, vertical: boolean = false) : Metrics[] {
    var metrics : Metrics[] = [];
    for (var i = 0; i < text.length; i++) {
      metrics.push(this.fontTable.getMetrics(text[i], this.fontSize, vertical));
    }
    return metrics;
  }
}
