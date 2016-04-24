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
  private _metrics: Metrics;
  private _replaceFromChar: string;
  private _degreeOfRotation: number = 0;

  constructor(params: {
    char: string,
    startX: number,
    startY: number,
    charStartX: number,
    charStartY: number,
    width: number,
    height: number,
    va: number,
    ha: number,
    metrics: Metrics,
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
  get metrics(): Metrics { return this._metrics; }
  get replaceFromChar(): string { return this._replaceFromChar; }
  get degreeOfRotation(): number { return this._degreeOfRotation; }

  set startX(value: number) { this._startX = value; }
  set startY(value: number) { this._startY = value; }
  set charStartX(value: number) { this._charStartX = value; }
  set charStartY(value: number) { this._charStartY = value; }
  set width(value: number) { this._width = value; }
  set height(value: number) { this._height = value; }
  set va(value: number) { this._va = value; }
  set ha(value: number) { this._ha = value; }

  /**
  * 文字を90度右回転
  */
  public rotateRight() {
    this._degreeOfRotation = 90;
    var w = this.width;
    var h = this.height;

    this._width = h;
    this._height = w;
  }
}
