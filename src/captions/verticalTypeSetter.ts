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
    // TODO: 縦書き文字描画位置修正
    // TODO: 回転文字対応
    // TODO: テキストタグ対応 <G>23</G>や<RB VALUE="あ">嗚</RB>など
    // TODO: 複数行対応
    // TODO: ルビ
    // TODO: 組み文字
    // TODO: 先頭「 等の役物位置調整対応
    var verticalText = this.convertCharToVertChar(text);
    var textMetrics = this.calcCharMetrics(verticalText, true);

    var startPosition = this.calcOneLineInitialPoint(
      textMetrics, position, alignment
    );
    var startX = startPosition.x, startY = startPosition.y;

    var renderText = [];
    var currentXPosition = startX;
    var currentYPosition = startY;

    for (var i = 0; i < verticalText.length; i++) {
      var m : Metrics = textMetrics[i];
      var offsetX = (this.baseJapaneseCharacterSize - m.ha) / 2.0;
      var startX = currentXPosition - this.baseJapaneseCharacterSize + offsetX;
      var startY = currentYPosition;
      var charStartX = currentXPosition - this.baseJapaneseCharacterSize + offsetX;
      var charStartY = currentYPosition + m.hby + m.vby;
      if (m.isVertical) {
        charStartX = currentXPosition - m.vbx + m.hbx - this.baseJapaneseCharacterSize;
        charStartY = currentYPosition + m.va - m.vby;
      }
      var width = m.ha;
      var height = m.va;

      var cc  = new CaptionChar({
        char: verticalText[i],
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
  * 横書き用文字を縦書き文字に変換する
  */
  private convertCharToVertChar(text: string) : string {
    var convertedText = "";
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      var m = this.metricsTable.getMetrics(c, this.fontSize);
      if (m.vertGid) {
        var vm = this.metricsTable.getMetricsFromGid(m.vertGid, this.fontSize, false);
        if (vm.code) {
          c = String.fromCharCode(vm.code);
        }
      }
      convertedText += c;
    }
    return convertedText;
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
