/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { MetricsTable } from "../fonts/metricsTable";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";
import { TypeSetter } from "../captions/typeSetter";

export class VerticalTypeSetter extends TypeSetter {
  constructor(captionSafeZone: CaptionSafeZone, fontSize: number, metricsTable: MetricsTable) {
    super(
      captionSafeZone, fontSize, metricsTable
    );
  }

  /**
  * 縦方向字幕レンダリングのポジション計算
  */
  public calcDrawingPosition(
    text: string, position: CaptionPosition, alignment: CaptionAlignment
  ) : CaptionChar[] {
    var startX = 0, startY = 0;

    if (position === CaptionPosition.TOP_RIGHT && alignment === CaptionAlignment.START) {
      startX = this.captionSafeZone.getSafeEndX();
      startY = this.captionSafeZone.getSafeStartY();
    } else {
      console.log("Not Implemented Yet");
    }

    var textMetrics = this.calcCharMetrics(text);
    var renderText = [];
    var currentXPosition = startX;
    var currentYPosition = startY;

    for (var i = 0; i < text.length; i++) {
      var m : Metrics = textMetrics[i];
      var offsetX = (this.baseJapaneseCharacterSize - m.ha) / 2.0;
      var cc  = new CaptionChar({
        char: text[i],
        startX: currentXPosition - this.baseJapaneseCharacterSize + offsetX,
        startY: currentYPosition,
        charStartX: currentXPosition - this.baseJapaneseCharacterSize + offsetX,
        charStartY: currentYPosition + m.hby + m.vby,
        width: m.ha,
        height: m.va,
        metrics: m
      });
      renderText.push(cc);

      currentYPosition += m.va;
    }

    return renderText;
  }
}
