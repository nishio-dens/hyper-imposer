/// <reference path="../../typings/main.d.ts" />

export class CharRenderingPosition {
  private _char: string;
  private _startX: number;
  private _startY: number;
  private _width: number;
  private _height: number;

  constructor(params: {
    char: string,
    startX: number,
    startY: number,
    width: number,
    height: number
  }) {
    this._char = params.char;
    this._startX = params.startX;
    this._startY = params.startY;
    this._width  = params.width;
    this._height = params.height;
  }

  get char():   string { return this._char; }
  get startX(): number { return this._startX; }
  get startY(): number { return this._startY; }
  get width():  number { return this._width; }
  get height(): number { return this._height; }
}
