/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";
import { FontTable } from "../fonts/fontTable";
import { CaptionChar } from "../captions/captionChar";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";
import { TypeSetter } from "../captions/typeSetter";
import { VerticalRotateCharacter } from "./verticalRotateCharacter";

export class VerticalTypeSetter extends TypeSetter {
  constructor(captionSafeZone: CaptionSafeZone, fontSize: number, fontTable: FontTable) {
    super(
      captionSafeZone, fontSize, fontTable
    );
  }

  /**
  * 縦方向字幕レンダリングのポジション計算
  */
  public calcDrawingPosition(
    text: string, position: CaptionPosition, alignment: CaptionAlignment
  ) : CaptionChar[] {
    // TODO: テキストタグ対応 <G>23</G>や<RB VALUE="あ">嗚</RB>など
    // TODO: 複数行対応
    // TODO: ルビ
    // TODO: 組み文字
    // TODO: 先頭「 等の約物位置調整対応
    var verticalText = this.convertCharToVertChar(text);
    var textMetrics = this.getTextMetrics(verticalText, true);
    var renderText = this.convertMetricsToCaptionCharWithoutRenderOffset(verticalText, textMetrics);
    this.convertVerticalRotateMetrics(renderText);

    var startPosition = this.calcOneLineInitialPoint(
      textMetrics, position, alignment
    );
    var startX = startPosition.x, startY = startPosition.y;
    this.setCaptionCharRenderingPoint(renderText, startX, startY);

    return renderText;
  }

  /**
  * 横書き用文字を縦書き文字に変換する
  */
  private convertCharToVertChar(text: string) : string {
    var convertedText = "";
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      var m = this.fontTable.getMetrics(c, this.fontSize);
      if (m.vertGid) {
        var vm = this.fontTable.getMetricsFromGid(m.vertGid, this.fontSize, false);
        if (vm.code) {
          c = String.fromCharCode(vm.code);
        }
      }
      convertedText += c;
    }
    return convertedText;
  }

  /**
  * MetricsをCaptionCharに変換する
  * ただし、レンダリング開始ポイントは左上として仮の値を設定する
  */
  private convertMetricsToCaptionCharWithoutRenderOffset(
    verticalText: string, textMetrics: Metrics[]
  ) : CaptionChar[] {
    var renderText : CaptionChar[] = [];

    for (var i = 0; i < verticalText.length; i++) {
      var m : Metrics = textMetrics[i];
      var offsetX = (this.baseJapaneseCharacterSize - m.ha) / 2.0;
      var startX = offsetX - this.baseJapaneseCharacterSize;
      var startY = 0;
      var charStartX = offsetX - this.baseJapaneseCharacterSize;
      var charStartY = m.hby + m.vby;
      var width = m.width;
      var height = m.height;

      var cc  = new CaptionChar({
        char: verticalText[i],
        startX: startX,
        startY: startY,
        charStartX: charStartX,
        charStartY: charStartY,
        width: width,
        height: height,
        va: m.va,
        ha: m.ha,
        renderingOffsetX: 0,
        renderingOffsetY: 0,
        metrics: m
      });
      renderText.push(cc);
    }

    return renderText;
  }

  /**
  * 90度回転対象の文字を回転する
  */
  private convertVerticalRotateMetrics(text: CaptionChar[]) {
    for (var i = 0; i < text.length; i++) {
      var char : string = String.fromCharCode(text[i].metrics.code);
      if (VerticalRotateCharacter.isRotateCharacter(char)) {
        text[i].rotateRight(this.baseJapaneseCharacterSize);
        console.log("CALL " + String.fromCharCode(text[i].metrics.code) + " " + text[i].height);
      }
    }
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
      y: startY,
    };
  }

  private setCaptionCharRenderingPoint(
    renderText: CaptionChar[], renderStartX: number, renderStartY: number
  ) {
    var currentXPosition = renderStartX;
    var currentYPosition = renderStartY;

    for (var i = 0; i < renderText.length; i++) {
      var cc : CaptionChar = renderText[i];
      cc.renderingOffsetX = currentXPosition;
      cc.renderingOffsetY = currentYPosition;

      currentYPosition += cc.va;
    }
  }
}
