/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "./metrics";
import { VirtualCanvas } from "../renderer/virtualCanvas";

export class FontTable {
  // 文字コード と GIDのペア
  private cmap: {[charCode: number]: number; } = {};
  private virtualCanvas: VirtualCanvas;
  private unitsPerEm: number;
  private fontResolution;
  private opentype;

  public initialize(
    opentype, virtualCanvas: VirtualCanvas, fontResolution: number = 1000
  ) {
    this.opentype = opentype;
    this.virtualCanvas = virtualCanvas;
    this.fontResolution = fontResolution;
    this.unitsPerEm = this.opentype.tables.head.unitsPerEm;
    this.cmap = opentype.tables.cmap.glyphIndexMap;
  }

  /**
  * 文字のメトリクスを返す
  * サイズは全てVirtualCanvasの大きさを返す
  * vertical = true で 縦書き用のメトリクスを返す
  */
  public getMetrics(char: any, fontSize: number, vertical: boolean = false) : Metrics {
    var gid = this.charToGid(char);
    return this.getMetricsFromGid(gid, fontSize, vertical);
  }

  /**
  * GIDからメトリクスを取得する
  */
  public getMetricsFromGid(gid: number, fontSize: number, vertical: boolean) : Metrics {
    var m : Metrics = this.getMetricsFromOpentype(gid);
    var code = m.code;
    if (vertical && m.vertGid != null) {
      m = this.getMetricsFromGid(m.vertGid, fontSize, true);
      m.code = code;
      m.isVertical = true;
      return m;
    } else {
      return new Metrics({
        code:   code,
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
  }

  /**
  * char を GlyphID(GID) を に変換する
  */
  public charToGid(char: any) : number {
    var code = this.cmap[char.charCodeAt()];
    return code;
  }

  private getMetricsFromOpentype(gid: number) : Metrics {
    return null;
  }

  private pixelsFromPoints(value: number, fontSize: number) {
    return (
      value * fontSize * 72 / (this.fontResolution * 100)
    ) * this.virtualCanvas.getVirtualCanvasScale();
  }
}
