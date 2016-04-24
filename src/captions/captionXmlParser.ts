/// <reference path="../../typings/main.d.ts" />

export class CaptionXmlParser {
  public static parseXml(text: string, currentTags = []) {
    var parser = new DOMParser();
    var dom = parser.parseFromString("<ROOT>" + text + "</ROOT>", "text/xml");
    for (var i = 0; i < dom.firstChild.childNodes.length; i++) {
      var node = dom.firstChild.childNodes[i];
      currentTags.push(node.nodeName);
      // TODO
    }
    console.log(text);
  }
}
