/// <reference path="../../typings/main.d.ts" />

import { Metrics } from "./metrics";

export class MetricsTable {
  private table;

  public initializeMetrics(metricsCsv) {
    this.table = {};
    var metricsArray = metricsCsv.split("\n");

    for (var row in metricsArray) {
      var m = row.split(",");
      var metrics = new Metrics({
        code: m[0]
      });
      this.table[metrics.code] = metrics;
    }
  }
}
