/// <reference path="../../typings/main.d.ts" />

export class CaptionXmlParser {
  public parseXml(text: string, parents = []) {
    var parser = new DOMParser();
    var dom = parser.parseFromString("<ROOT>" + text + "</ROOT>", "text/xml");
    var node = (<any>dom).children[0];

    return this.createXmlTree(node, []);
  }

  private createXmlTree(node, innerNodes: any[] = []) {
    var children = node.childNodes;
    var results = [];

    if (children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        var n = children[i];
        var attributes = [];
        if (n.attributes) {
          for (var j = 0; j < n.attributes.length; j++) {
            attributes = attributes.concat(
              { name: n.attributes[j].name, value: n.attributes[j].value }
            );
          }
        }
        var p = innerNodes.concat({
          nodeType: n.nodeName,
          nodeValue: n.nodeValue,
          attributes: attributes
        });

        results = results.concat(this.createXmlTree(n, p));
      }
    } else {
      results = [
        {
          nodeType: node.nodeName,
          nodeValue: node.nodeValue,
          innerNodes: innerNodes
        }
      ];
    }

    return results;
  }
}
