/// <reference path="../../typings/main.d.ts" />

import {CaptionChar} from "./captionChar";

export class CaptionText {
  private _isRubyBefore: boolean = true;
  private _isGrouping: boolean = false;
  private _rubyText: CaptionChar[];
  private _chars: CaptionChar[];

  get isRubyBefore(): boolean { return this._isRubyBefore; }
  get isGrouping(): boolean { return this._isGrouping; }
  get rubyText(): CaptionChar[] { return this._rubyText; }
  get chars(): CaptionChar[] { return this._chars; }

  set isRubyBefore(value: boolean) { this._isRubyBefore = value; }
  set isGrouping(value: boolean) { this._isGrouping = value; }
  set rubyText(value: CaptionChar[]) { this._rubyText = value; }
  set chars(value: CaptionChar[]) { this._chars = value; }
}
