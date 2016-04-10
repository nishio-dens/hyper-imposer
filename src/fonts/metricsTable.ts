/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "./metrics";

export class MetricsTable {
  private table : { [key: number] : Metrics };
  private fontResolution;

  public initializeMetrics(metricsCsv, fontResolution: number = 1000) {
    this.fontResolution = fontResolution;

    this.table = {};
    var metricsArray = metricsCsv.split("\n");

    for (var row of metricsArray) {
      var m = row.split(",");
      var metrics = new Metrics({
        code:   m[0],
        minX:   parseFloat(m[1]),
        minY:   parseFloat(m[2]),
        maxX:   parseFloat(m[3]),
        maxY:   parseFloat(m[4]),
        width:  parseFloat(m[5]),
        height: parseFloat(m[6]),
        hbx:    parseFloat(m[7]),
        hby:    parseFloat(m[8]),
        vbx:    parseFloat(m[9]),
        vby:    parseFloat(m[10]),
        ha:     parseFloat(m[11]),
        va:     parseFloat(m[12])
      });
      this.table[metrics.code] = metrics;
    }
  }

  public pixelsFromPoints(value: number, fontSize: number) {
    return value * fontSize * 72 / (this.fontResolution * 100);
  }

  public getMetrics(char: any, fontSize: number) : Metrics {
    var m : Metrics = this.table[char.charCodeAt()];
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
      va:     this.pixelsFromPoints(m.va, fontSize)
    });
  }
}
