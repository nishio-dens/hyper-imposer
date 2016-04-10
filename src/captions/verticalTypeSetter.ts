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
    // TODO: 縦書き用文字置換対応
    // TODO: 回転文字対応
    // TODO: テキストタグ対応 <G>23</G>や<RB VALUE="あ">嗚</RB>など
    // TODO: 複数行対応
    // TODO: ルビ
    // TODO: 組み文字
    // TODO: 先頭「 等の役物位置調整対応
    var textMetrics = this.calcCharMetrics(text);

    var startPosition = this.calcOneLineInitialPoint(
      textMetrics, position, alignment
    );
    var startX = startPosition.x, startY = startPosition.y;

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

  /**
  * レンダリング開始ポイントを計算して返す
  * テキストは1行のみ対応
  */
  private calcOneLineInitialPoint(
    textMetrics, position: CaptionPosition, alignment: CaptionAlignment,
    xOffset: number = 0, yOffset: number = 0
  ) {
    var startX = 0, startY = 0;

    if (position === CaptionPosition.TOP_RIGHT && alignment === CaptionAlignment.START) {
      startX = this.captionSafeZone.getSafeEndX() + xOffset;
      startY = this.captionSafeZone.getSafeStartY() + yOffset;
    } else {
      console.log("Not Implemented Yet");
    }

    return {
      x: startX,
      y: startY
    };
  }
}
