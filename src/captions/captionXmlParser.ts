/// <reference path="../../typings/main.d.ts" />

import { CaptionChar } from "./captionChar";
import { CaptionText } from "./captionText";

export class CaptionXmlParser {
  private currentHid;

  public constructor() {
    this.currentHid = new Date().getTime();
  }

  public parseXml(text: string, parents = []) {
    var parser = new DOMParser();
    var dom = parser.parseFromString("<ROOT>" + text + "</ROOT>", "text/xml");
    var node = (<any>dom).children[0];

    var splittedNodes = this.convertTextToNode(node, []);
    var captionChars = this.nodeToCaptionChar(splittedNodes);
    var captionText = this.groupByRuby(captionChars);
    // TODO: captionChars to captionText

    return captionText;
  }

  private convertTextToNode(node, innerNodes: any[] = []) {
    var children = node.childNodes;
    var results = [];

    if (children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        var n = children[i];
        this.setNodeIdIfNotExists(n);

        var attributes = [];
        if (n.attributes) {
          for (var j = 0; j < n.attributes.length; j++) {
            attributes = attributes.concat(
              { name: n.attributes[j].name, value: n.attributes[j].value }
            );
          }
        }
        var p = innerNodes.concat({
          nodeId: n.id.toString(),
          nodeType: n.nodeName,
          nodeValue: n.nodeValue,
          attributes: attributes
        });

        results = results.concat(this.convertTextToNode(n, p));
      }
    } else {
      results = [
        {
          nodeId: node.id.toString(),
          nodeType: node.nodeName,
          nodeValue: node.nodeValue,
          innerNodes: innerNodes
        }
      ];
    }

    return results;
  }


  private setNodeIdIfNotExists(node) {
    if (node.id === undefined || node.id === "") {
      node.id = this.currentHid;
      this.currentHid += 1;
    }
  }

  private nodeToCaptionChar(nodes) {
    var chars : CaptionChar[] = [];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === "#text") {
        for (var j = 0; j < node.nodeValue.length; j++) {
          var char = new CaptionChar({char: node.nodeValue[j]});
          for (var k = 0; k < node.innerNodes.length - 1; k++) {
            var parentNode = node.innerNodes[k];
            switch (parentNode.nodeType) {
              case "I":
              char.isItalic = true;
              break;

              case "B":
              char.isBold = true;
              break;

              case "R":
              char.parentRubyNode = parentNode;
              break;

              case "G":
              char.parentGroupNode = parentNode;
              break;
            }
          }
          chars.push(char);
        }
      } else if (node.nodeType === "BR") {
        var char = new CaptionChar({});
        char.isReturn = true;
        chars.push(char);
      }
    }
    return chars;
  }

  private groupByRuby(captionChar: CaptionChar[]) : CaptionText[] {
    var groupingText = [];
    return null;
  }
}
