/// <reference path="../../typings/main.d.ts" />

import { CaptionChar } from "./captionChar";
import { CaptionText } from "./captionText";

export class CaptionXmlParser {
  private currentHid;

  public constructor() {
    this.currentHid = new Date().getTime();
  }

  public parseCaptionXml(text: string, parents = []) {
    var parser = new DOMParser();
    var dom = parser.parseFromString("<ROOT>" + text + "</ROOT>", "text/xml");
    var node = (<any>dom).children[0];

    var splittedNodes = this.convertTextToNode(node, []);
    var captionChars = this.nodeToCaptionChar(splittedNodes);
    var captionText = this.groupByParentNode(captionChars);

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

              case "RA":
              char.parentRubyNode = parentNode;
              break;

              case "RB":
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

  private groupByParentNode(captionChars: CaptionChar[]) : CaptionText[] {
    var groupingText = [];
    var parentNode = null;
    for (var i = 0, j = 0; i < captionChars.length; i++) {
      var c = captionChars[i];
      if (parentNode === c.parentRubyNode || parentNode === c.parentGroupNode) {
        if (groupingText[j] === null) {
          groupingText[j] = [];
        }
        groupingText[j].push(c);
      } else {
        if (c.parentRubyNode) {
          j += 1;
          groupingText[j] = [c];
          parentNode = c.parentRubyNode;
        } else if (c.parentGroupNode) {
          j += 1;
          groupingText[j] = [c];
          parentNode = c.parentGroupNode;
        } else {
          if (parentNode !== null) {
            j += 1;
          }
          if (groupingText[j] === undefined) {
            groupingText[j] = [];
          }
          parentNode = null;
          groupingText[j].push(c);
        }
      }
    }

    var captionTexts = [];
    for (var i = 0; i < groupingText.length; i++) {
      if (groupingText[i]) {
        var text = new CaptionText();
        text.chars = groupingText[i];

        var firstChar = text.chars[0];
        if (firstChar) {
          if (firstChar.parentRubyNode) {
            if (firstChar.parentRubyNode.nodeType === "RA") {
              text.isRubyBefore = false;
            }

            var rubyValue = firstChar.parentRubyNode.attributes.filter((v) => {
              return v.name === "VALUE";
            })[0];
            if (rubyValue) {
              text.rubyText = this.textToCaptionChar(rubyValue.value);
            }
          } else if (firstChar.parentGroupNode) {
            text.isGrouping = true;
          }
        }
        captionTexts.push(text);
      }
    }
    return captionTexts;
  }

  private textToCaptionChar(text: string) : CaptionChar[] {
    var results = [];
    for (var i = 0; i < text.length; i++) {
      results.push(new CaptionChar({char: text[i]}));
    }
    return results;
  }
}
