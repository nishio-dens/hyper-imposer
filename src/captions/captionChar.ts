/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "../fonts/metrics";

export class CaptionChar {
  private _char: string;
  private _startX: number;
  private _startY: number;
  private _charStartX: number;
  private _charStartY: number;
  private _width: number;
  private _height: number;
  private _va: number;
  private _ha: number;
  private _renderingOffsetX: number;
  private _renderingOffsetY: number;
  private _metrics: Metrics;
  private _replaceFromChar: string;
  private _degreeOfRotation: number = 0;
  private _isBold : boolean = false;
  private _isItalic : boolean = false;
  private _isReturn: boolean = false;
  private _parentGroupNode: any;
  private _parentRubyNode: any;

  constructor(params: {
    char?: string,
    startX?: number,
    startY?: number,
    charStartX?: number,
    charStartY?: number,
    width?: number,
    height?: number,
    va?: number,
    ha?: number,
    renderingOffsetX?: number,
    renderingOffsetY?: number,
    metrics?: Metrics
  }) {
    this._char = params.char;
    this._startX = params.startX;
    this._startY = params.startY;
    this._charStartX = params.charStartX;
    this._charStartY = params.charStartY;
    this._width  = params.width;
    this._height = params.height;
    this._va = params.va;
    this._ha = params.ha;
    this._renderingOffsetX = params.renderingOffsetX;
    this._renderingOffsetY = params.renderingOffsetY;
    this._metrics = params.metrics;
  }

  get char():   string { return this._char; }
  get startX(): number { return this._startX; }
  get startY(): number { return this._startY; }
  get charStartX(): number { return this._charStartX; }
  get charStartY(): number { return this._charStartY; }
  get width():  number { return this._width; }
  get height(): number { return this._height; }
  get va(): number { return this._va; }
  get ha(): number { return this._ha; }
  get renderingOffsetX(): number { return this._renderingOffsetX; }
  get renderingOffsetY(): number { return this._renderingOffsetY; }
  get metrics(): Metrics { return this._metrics; }
  get replaceFromChar(): string { return this._replaceFromChar; }
  get degreeOfRotation(): number { return this._degreeOfRotation; }
  get isBold(): boolean { return this._isBold; }
  get isItalic(): boolean { return this._isItalic; }
  get isReturn(): boolean { return this._isReturn; }
  get parentRubyNode(): any { return this._parentRubyNode; }
  get parentGroupNode(): any { return this._parentGroupNode; }

  get renderingStartX(): number { return this._startX + this.renderingOffsetX; }
  get renderingStartY(): number { return this._startY + this.renderingOffsetY; }
  get renderingCharStartX(): number { return this._charStartX + this.renderingOffsetX; }
  get renderingCharStartY(): number { return this._charStartY + this.renderingOffsetY; }

  set startX(value: number) { this._startX = value; }
  set startY(value: number) { this._startY = value; }
  set charStartX(value: number) { this._charStartX = value; }
  set charStartY(value: number) { this._charStartY = value; }
  set width(value: number) { this._width = value; }
  set height(value: number) { this._height = value; }
  set va(value: number) { this._va = value; }
  set ha(value: number) { this._ha = value; }
  set renderingOffsetX(value: number) { this._renderingOffsetX = value; }
  set renderingOffsetY(value: number) { this._renderingOffsetY = value; }
  set isBold(value: boolean) { this._isBold = value; }
  set isItalic(value: boolean) { this._isItalic = value; }
  set isReturn(value: boolean) { this._isReturn = value; }
  set parentRubyNode(value: any) { this._parentRubyNode = value; }
  set parentGroupNode(value: any) { this._parentGroupNode = value; }

  /**
  * 文字を90度右回転
  */
  public rotateRight(baseJapaneseCharacterSize: number) {
    this._degreeOfRotation = 90;
    var w = this.width;
    var h = this.height;
    var va = this.va;
    var ha = this.ha;

    this._width = h;
    this._height = w;
    this._va = ha;
    this._ha = va;

    this._startX = 0 - baseJapaneseCharacterSize;
    this._startY = 0;
  }
}
