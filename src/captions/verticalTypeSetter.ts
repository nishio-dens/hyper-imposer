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
    // TODO: 小書きの仮名 縦の場合は外枠の天地中央で右寄りに配置
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
      var verticalOffsetX = -1.0 * (m.hbx - m.vbx);
      var verticalOffsetY = -1.0 * (m.hby + m.vby);

      var startX = currentXPosition - this.baseJapaneseCharacterSize + offsetX;
      var startY = currentYPosition;
      var charStartX = currentXPosition - this.baseJapaneseCharacterSize + offsetX;
      var charStartY = currentYPosition + m.hby + m.vby;
      var width = m.ha;
      var height = m.va;

      var cc  = new CaptionChar({
        char: text[i],
        startX: startX,
        startY: startY,
        charStartX: charStartX,
        charStartY: charStartY,
        width: width,
        height: height,
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
