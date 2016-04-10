/// <reference path="../../typings/main.d.ts" />

import { AspectRatio } from "./aspectRatio";
import { VirtualCanvasSize } from "./virtualCanvasSize";
import { VirtualCanvas } from "./virtualCanvas";
import { MetricsTable } from "../fonts/metricsTable";
import { CaptionRenderer } from "./captionRenderer";
import { CaptionSafeZoneRenderer } from "./captionSafeZoneRenderer";
import { CaptionAlignment } from "../captions/captionAlignment";
import { CaptionPosition } from "../captions/captionPosition";

export class Renderer {
  // canvas
  private canvas: VirtualCanvas;
  private metricsTable: MetricsTable;
  private captionRenderer: CaptionRenderer;
  private captionSafeZoneRenderer: CaptionSafeZoneRenderer;
  private isDebug: boolean;

  private virtualCanvasWidth: number;
  private virtualCanvasHeight: number;

  constructor(canvasId: string, canvasWidth: number,
              canvasHeight: number, aspectRatio: AspectRatio,
              fontName: string, fontSize: number,
              fontMetricsCsv: string) {
    if (aspectRatio === AspectRatio.AR16_9) {
      this.virtualCanvasWidth = VirtualCanvasSize.AR16_9_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR16_9_HEIGHT;
    } else {
      this.virtualCanvasWidth = VirtualCanvasSize.AR4_3_WIDTH;
      this.virtualCanvasHeight = VirtualCanvasSize.AR4_3_HEIGHT;
    }

    // TODO: 実際のcanvasの大きさが16:9 でないときは OffsetX, OffsetYを渡さなければならない
    this.canvas = new VirtualCanvas(
      canvasId, canvasWidth, canvasHeight, this.virtualCanvasWidth, this.virtualCanvasHeight
    );

    this.metricsTable = new MetricsTable();
    this.metricsTable.initializeMetrics(fontMetricsCsv, this.canvas);

    this.captionRenderer = new CaptionRenderer(
      this.canvas, this.metricsTable, fontName, fontSize
    );

    this.captionSafeZoneRenderer = new CaptionSafeZoneRenderer(this.canvas);
  }

  public setDebugMode(isDebug: boolean) {
    this.isDebug = isDebug;
  }

  public setCanvasSize(canvasWidth: number, canvasHeight: number) {
    this.canvas.setCanvasSize(canvasWidth, canvasHeight);
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
      "皆さん、ABCこんにちは。", CaptionPosition.BOTTOM_CENTER, CaptionAlignment.CENTER, false, true
    );
    this.captionRenderer.addCaptionText(
      "縦書きは、ABCこちらです。", CaptionPosition.TOP_RIGHT, CaptionAlignment.START, true, false
    );
    this.captionRenderer.render();

    if (this.isDebug) {
      this.captionRenderer.renderBoundingBox();
      var time: number = new Date().getTime() - actionTime;
      console.log("Rendering " + time + "ms");
    }
  }
}
