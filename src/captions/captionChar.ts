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
  private _metrics: Metrics;

  constructor(params: {
    char: string,
    startX: number,
    startY: number,
    charStartX: number,
    charStartY: number,
    width: number,
    height: number,
    metrics: Metrics
  }) {
    this._char = params.char;
    this._startX = params.startX;
    this._startY = params.startY;
    this._charStartX = params.charStartX;
    this._charStartY = params.charStartY;
    this._width  = params.width;
    this._height = params.height;
    this._metrics = params.metrics;
  }

  get char():   string { return this._char; }
  get startX(): number { return this._startX; }
  get startY(): number { return this._startY; }
  get charStartX(): number { return this._charStartX; }
  get charStartY(): number { return this._charStartY; }
  get width():  number { return this._width; }
  get height(): number { return this._height; }
  get metrics(): Metrics { return this._metrics; }
}
