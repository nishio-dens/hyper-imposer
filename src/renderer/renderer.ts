/// <reference path="../../typings/main.d.ts" />

import { AspectRatio } from "./aspectRatio";
import { VirtualCanvasSize } from "./virtualCanvasSize";
import { VirtualCanvas } from "./virtualCanvas";
import { FontTable } from "../fonts/fontTable";
import { CaptionRenderer } from "./captionRenderer";
import { CaptionSafeZoneRenderer } from "./captionSafeZoneRenderer";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";
import { CaptionSafeZone } from "../captions/captionSafeZone";
import { CaptionXmlParser } from "../captions/captionXmlParser";

export class Renderer {
  // canvas
  private canvas: VirtualCanvas;
  private fontTable: FontTable;
  private captionRenderer: CaptionRenderer;
  private captionSafeZone: CaptionSafeZone;
  private captionSafeZoneRenderer: CaptionSafeZoneRenderer;
  private isDebug: boolean;
  private fontName: string;
  private fontSize: number;

  private virtualCanvasWidth: number;
  private virtualCanvasHeight: number;

  constructor(canvasId: string, canvasWidth: number,
              canvasHeight: number, aspectRatio: AspectRatio,
              fontName: string, fontSize: number,
              opentype: any, fontMetrics: any) {
    if (aspectRatio === AspectRatio.AR16_9) {
      this.virtualCanvasWidth = VirtualCanvasSize.AR16_9_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR16_9_HEIGHT;
    } else {
      this.virtualCanvasWidth = VirtualCanvasSize.AR4_3_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR4_3_HEIGHT;
    }

    // TODO: 実際のcanvasの大きさが16:9 でないときは OffsetX, OffsetYを渡さなければならない
    this.canvas = new VirtualCanvas(
      canvasId, canvasWidth, canvasHeight, this.virtualCanvasWidth, this.virtualCanvasHeight,
      opentype
    );

    this.fontTable = new FontTable();
    this.fontTable.initialize(opentype, fontMetrics, this.canvas);

    this.captionSafeZone = new CaptionSafeZone(this.canvas);

    this.fontName = fontName;
    this.fontSize = fontSize;
    this.initializeTypeSetter();
    this.captionSafeZoneRenderer = new CaptionSafeZoneRenderer(this.canvas, this.captionSafeZone);
  }

  public initializeTypeSetter() {
    this.captionRenderer = new CaptionRenderer(
      this.canvas, this.fontTable, this.captionSafeZone, this.fontName, this.fontSize
    );
  }

  public setDebugMode(isDebug: boolean) {
    this.isDebug = isDebug;
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    this.canvas.setCanvasSize(canvasWidth, canvasHeight);
    this.initializeTypeSetter();
  }

  public clear() {
    this.canvas.clear();
  }

  public render() {
    var actionTime: number = 0;
    if (this.isDebug) {
      actionTime = new Date().getTime();
      this.captionSafeZoneRenderer.drawSafeZone();
    }

    this.canvas.drawRect(0, 0, this.virtualCanvasWidth, this.virtualCanvasHeight, "#00FF00", 2);
    this.captionRenderer.addCaptionText(
      "「美しい にmnj:。", CaptionPosition.BOTTOM_LEFT, CaptionAlignment.START, false, true
    );
    this.captionRenderer.addCaptionText(
      "<I>テ<B>スト</B><R VALUE='とうきょう'>東京</R>で<BR>した</I>",
      CaptionPosition.TOP_RIGHT, CaptionAlignment.START, true, false
    );
    // TODO 仮
    CaptionXmlParser.parseXml(
      "<I>テ<B>スト</B><R VALUE='とうきょう'>東京</R></I><BR /><I>でした</I>"
    );
    // TODO END
    this.captionRenderer.render();

    if (this.isDebug) {
      this.captionRenderer.renderBoundingBox();
      var time: number = new Date().getTime() - actionTime;
      console.log("Rendering " + time + "ms");
    }
  }
}
