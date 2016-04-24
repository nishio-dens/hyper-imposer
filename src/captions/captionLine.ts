/// <reference path="../../typings/main.d.ts" />

import { CaptionChar } from "./captionChar";

export class CaptionLine {
  private rowNumber: number;
  private isVertical: boolean;
  private lineStartX: number;
  private lineStartY: number;
  private captionCharacters: CaptionChar[];
}
