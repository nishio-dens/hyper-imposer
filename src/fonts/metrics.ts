/// <reference path="../../typings/main.d.ts" />

export class Metrics {
  private _code: string;

  constructor(params: { code: string }) {
    this._code = params.code;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }
}
