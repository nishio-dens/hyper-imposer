/// <reference path="../../typings/main.d.ts" />

(<any>Array.prototype).flatten = function(o) {
  return this.reduce(
    function(a, b) {
      if (b instanceof Array) {
        return a.concat(b.flatten());
      } else {
        return a.concat(b);
      }
    }, []
  );
};
