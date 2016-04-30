/// <reference path="../../typings/main.d.ts" />

import {CaptionChar} from "./captionChar";

export class CaptionText {
  private _rubyText: string;
  private _isRubyBefore: boolean = true;
  private _chars: CaptionChar;
  private _isGrouping: boolean = false;
}
