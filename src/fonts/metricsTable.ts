/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "./metrics";

export class MetricsTable {
  private table : { [key: number] : Metrics };

  public initializeMetrics(metricsCsv) {
    this.table = {};
    var metricsArray = metricsCsv.split("\n");

    for (var row of metricsArray) {
      var m = row.split(",");
      var metrics = new Metrics({
        code:   m[0],
        minX:   this.pixelsFromPoints(parseFloat(m[1])),
        minY:   this.pixelsFromPoints(parseFloat(m[2])),
        maxX:   this.pixelsFromPoints(parseFloat(m[3])),
        maxY:   this.pixelsFromPoints(parseFloat(m[4])),
        width:  this.pixelsFromPoints(parseFloat(m[5])),
        height: this.pixelsFromPoints(parseFloat(m[6])),
        hbx:    this.pixelsFromPoints(parseFloat(m[7])),
        hby:    this.pixelsFromPoints(parseFloat(m[8])),
        vbx:    this.pixelsFromPoints(parseFloat(m[9])),
        vby:    this.pixelsFromPoints(parseFloat(m[10])),
        ha:     this.pixelsFromPoints(parseFloat(m[11])),
        va:     this.pixelsFromPoints(parseFloat(m[12]))
      });
      this.table[metrics.code] = metrics;
    }
  }

  public pixelsFromPoints(value: number) {
    // TODO: fixme
    return value;
  }

  public getMetrics(char) : Metrics {
    return <Metrics>this.table[char.charCodeAt()];
  }
}
