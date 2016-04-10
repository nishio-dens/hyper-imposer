/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { MetricsTable } from "../fonts/metricsTable";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";
import { TypeSetter } from "../captions/typeSetter";

export class HorizontalTypeSetter extends TypeSetter {
  constructor(captionSafeZone: CaptionSafeZone, fontSize: number, metricsTable: MetricsTable) {
    super(
      captionSafeZone, fontSize, metricsTable
    );
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
