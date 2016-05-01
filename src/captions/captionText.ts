/// <reference path="../../typings/main.d.ts" />

import {CaptionChar} from "./captionChar";

export class CaptionText {
  private _isRubyBefore: boolean = true;
  private _isGrouping: boolean = false;
  private _rubyText: CaptionChar[];
  private _chars: CaptionChar[];
}
