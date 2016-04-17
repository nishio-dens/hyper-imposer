/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "./metrics";
import { VirtualCanvas } from "../renderer/virtualCanvas";

export class MetricsTable {
  // Metrics情報を格納する keyはGlyphID(GID)
  private table : { [key: number] : Metrics };
  // 文字コード と GIDのペア
  private cmap: {[charCode: string]: number; } = {};
  private virtualCanvas: VirtualCanvas;
  private fontResolution;

  public initializeMetrics(
    metricsJson, virtualCanvas: VirtualCanvas, fontResolution: number = 1000
  ) {
    this.virtualCanvas = virtualCanvas;
    this.fontResolution = fontResolution;

    this.table = {};
    for (var gid in metricsJson.metrics) {
      var m = metricsJson.metrics[gid];
      var metrics = new Metrics({
        code:   m.code,
        minX:   parseFloat(m.minX),
        minY:   parseFloat(m.minY),
        maxX:   parseFloat(m.maxX),
        maxY:   parseFloat(m.maxY),
        width:  parseFloat(m.width),
        height: parseFloat(m.height),
        hbx:    parseFloat(m.hbx),
        hby:    parseFloat(m.hby),
        vbx:    parseFloat(m.vby),
        vby:    parseFloat(m.vby),
        ha:     parseFloat(m.ha),
        va:     parseFloat(m.va),
        vertGid: m.vertGid
      });
      this.table[gid] = metrics;
    }

    this.cmap = metricsJson.cmap;
  }

  /**
  * 文字のメトリクスを返す
  * サイズは全てVirtualCanvasの大きさを返す
  */
  public getMetrics(char: any, fontSize: number) : Metrics {
    var m : Metrics = this.table[this.charToGid(char)];
    return new Metrics({
      code:   m.code,
      minX:   this.pixelsFromPoints(m.minX, fontSize),
      minY:   this.pixelsFromPoints(m.minY, fontSize),
      maxX:   this.pixelsFromPoints(m.maxX, fontSize),
      maxY:   this.pixelsFromPoints(m.maxY, fontSize),
      width:  this.pixelsFromPoints(m.width, fontSize),
      height: this.pixelsFromPoints(m.height, fontSize),
      hbx:    this.pixelsFromPoints(m.hbx, fontSize),
      hby:    this.pixelsFromPoints(m.hby, fontSize),
      vbx:    this.pixelsFromPoints(m.vbx, fontSize),
      vby:    this.pixelsFromPoints(m.vby, fontSize),
      ha:     this.pixelsFromPoints(m.ha, fontSize),
      va:     this.pixelsFromPoints(m.va, fontSize),
      vertGid: m.vertGid
    });
  }

  /**
  * char を GlyphID(GID) を に変換する
  */
  public charToGid(char: any) : number {
    var code = this.cmap[char.charCodeAt()];
    return code;
  }

  private pixelsFromPoints(value: number, fontSize: number) {
    return (
      value * fontSize * 72 / (this.fontResolution * 100)
    ) * this.virtualCanvas.getVirtualCanvasScale();
  }
}
