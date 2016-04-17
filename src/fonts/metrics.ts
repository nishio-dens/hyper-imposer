/// <reference path="../../typings/main.d.ts" />

export class Metrics {
  private _code: number;
  private _minX: number;
  private _minY: number;
  private _maxX: number;
  private _maxY: number;
  private _width: number;
  private _height: number;
  private _hbx: number;
  private _hby: number;
  private _vbx: number;
  private _vby: number;
  private _ha: number;
  private _va: number;
  private _vertGid: number;

  constructor(params: {
     code: number,
     minX?: number,
     minY?: number,
     maxX?: number,
     maxY?: number,
     width?: number,
     height?: number,
     hbx?: number,
     hby?: number,
     vbx?: number,
     vby?: number,
     ha?: number,
     va?: number,
     vertGid?: number
   }) {
    this._code = params.code;
    this._minX = params.minX;
    this._minY = params.minY;
    this._maxX = params.maxX;
    this._maxY = params.maxY;
    this._width = params.width;
    this._height = params.height;
    this._hbx = params.hbx;
    this._hby = params.hby;
    this._vbx = params.vbx;
    this._vby = params.vby;
    this._ha = params.ha;
    this._va = params.va;
    this._vertGid = params.vertGid;
  }

  get code(): number { return this._code; }
  get minX(): number { return this._minX; }
  get minY(): number { return this._minY; }
  get maxX(): number { return this._maxX; }
  get maxY(): number { return this._maxY; }
  get width(): number  { return this._width; }
  get height(): number { return this._height; }
  get hbx(): number { return this._hbx; }
  get hby(): number { return this._hby; }
  get vbx(): number { return this._vbx; }
  get vby(): number { return this._vby; }
  get ha(): number { return this._ha; }
  get va(): number { return this._va; }
  get vertGid(): number { return this._vertGid; }

  set code(value: number) { this._code = value; }
  set minX(value: number) { this._minX = value; }
  set minY(value: number) { this._minY = value; }
  set maxX(value: number) { this._maxX = value; }
  set maxY(value: number) { this._maxY = value; }
  set width(value: number) { this._width = value; }
  set height(value: number) { this._height = value; }
  set hbx(value: number) { this._hbx = value; }
  set hby(value: number) { this._hby = value; }
  set vbx(value: number) { this._vbx = value; }
  set vby(value: number) { this._vby = value; }
  set ha(value: number) { this._ha = value; }
  set va(value: number) { this._va = value; }
  set vertGid(value: number) { this._vertGid = value; }
}
