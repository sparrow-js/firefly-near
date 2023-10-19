import {
  JsxAttribute,
  Node,
  Block,
  JsxAttributes,
  Expression,
  NodeFactory,
  factory,
  createSourceFile,
} from 'typescript';
import * as TS from 'typescript';
import Hash = require('object-hash');
import { generateConsistentUID } from './uid-utils';
import { fixParseSuccessUIDs } from './uid-fix';
import Store from './store';
import FsHandler from '../generator/fshandler';

const cacheTree = {};
let alreadyExistingUIDs: Set<string> = new Set();
// factory.createJsxAttribute

function getFunctionJsx(functionNode: Node) {
  const jsxArr = [];
  const node: Block = (functionNode as any).body;
  function findJsx(node: Node) {
    if (!node) return;
    if (node.kind === TS.SyntaxKind.Block) {
      const { statements } = node as Block;
      statements.forEach((stateNode) => {
        findJsx(stateNode);
      });
    } else if (
      node.kind === TS.SyntaxKind.ReturnStatement ||
      node.kind === TS.SyntaxKind.ParenthesizedExpression
    ) {
      const { expression } = node as any;
      if (expression) findJsx(expression);
    } else if (node.kind === TS.SyntaxKind.JsxElement) {
      jsxArr.push(node);
    }
  }
  findJsx(node);
  return jsxArr;
}

function getAttributes(attributes: JsxAttribute, sourceFile: TS.SourceFile) {
  const props = [];
  const { properties } = attributes as any;
  if (properties) {
    properties.forEach((propertie) => {
      const propStr = propertie.getText(sourceFile);
      const propArr = propStr.split('=');
      props.push({
        key: propArr[0],
        value: {
          value: propArr[1],
        },
      });
    });
  }
  return props;
}

function appendUidAttribute(uid: string, attributes: JsxAttributes) {
  const { properties } = attributes as any;
  properties.push(
    TS.factory.createJsxAttribute(
      TS.factory.createIdentifier('data-uid'),
      TS.factory.createStringLiteral(uid),
    ),
  );
}

function parseJSXElementName(node: Node, sourceFile: TS.SourceFile) {
  return (node as any).tagName.getText(sourceFile);
}

function setJsxElementUid(nodeList: Node[], sourceFile: TS.SourceFile) {
  const cacheJsxList = {};
  function walk(node: Node, parentNode: any, index: number) {
    const leaf = {
      uid: '',
    };
    if (node.kind === TS.SyntaxKind.JsxElement) {
      const props = getAttributes(
        (node as any).openingElement.attributes,
        sourceFile,
      );
      const hash = Hash({
        fileName: sourceFile.fileName,
        name: parseJSXElementName((node as any).openingElement, sourceFile),
        props,
      });

      const uid = generateConsistentUID(hash, alreadyExistingUIDs);
      leaf['uid'] = uid;
      leaf['tagName'] = (node as any).openingElement.tagName.getText(
        sourceFile,
      );
      leaf['linkAttributes'] = (node as any).openingElement.attributes;
      leaf['linkNode'] = node;
      leaf['parent'] = parentNode;
      leaf['position'] = index;
      alreadyExistingUIDs.add(uid);
    } else {
      return null;
    }

    const { children } = node as any;

    if (children) {
      children.forEach((currNode, nodeIndex) => {
        const curLeaf = walk(currNode, leaf, nodeIndex);
        if (curLeaf) {
          cacheJsxList[curLeaf.uid] = curLeaf;
        }
      }, {});
    }

    return leaf;
  }
  nodeList.forEach((node) => {
    const leaf = walk(node, null, 0);
    cacheJsxList[leaf.uid] = leaf;
  });
  return cacheJsxList;
}

export function deleteNode(path: string, uid: string) {
  const res = transform(path);
  const { cacheTree, sourceFile } = res;
  const node = cacheTree[path][uid];
  const { parent, position } = node;
  parent.linkNode.children.splice(position, 1);
  const printer = TS.createPrinter();
  const code = printer.printNode(
    TS.EmitHint.Unspecified,
    sourceFile,
    sourceFile,
  );
  FsHandler.getInstance().writeFile(path, code, true);
}

export function insertNode(data: any) {
  const {
    containerId,
    path,
    near: { pos, id },
  } = data;

  const code = `
<p>
  追加代码placeholder
</p>`;
  const tempSource = TS.createSourceFile(path, code, TS.ScriptTarget.ESNext);
  const { statements } = tempSource;
  const res = transform(path);
  const { cacheTree, sourceFile } = res;
  const uidMap = cacheTree[path];
  const container = uidMap[containerId];
  let { position } = uidMap[id];
  if (pos === 'after') {
    position = position + 1;
  }
  if (statements[0] && (statements[0] as any).expression) {
    container.linkNode.children.splice(
      position,
      0,
      (statements[0] as any).expression,
    );
  }
  const printer = TS.createPrinter();
  const codeText = printer.printNode(
    TS.EmitHint.Unspecified,
    sourceFile,
    sourceFile,
  );
  FsHandler.getInstance().writeFile(path, codeText, true);
}

export default function transform(path: string) {
  alreadyExistingUIDs = new Set();
  let sourceFile = null;
  const code = FsHandler.getInstance().parseFile(path);
  if (path.includes('/src/') && path.includes('.ts')) {
    console.log('file path', createSourceFile);
    sourceFile = TS.createSourceFile(path, code, TS.ScriptTarget.ESNext);
    const nodeObject = sourceFile.getChildren()[0];
    if (nodeObject) {
      const nodeList = nodeObject.getChildren();
      nodeList.forEach((node: Node) => {
        if (node.kind === TS.SyntaxKind.FunctionDeclaration) {
          const jsxNodeList = getFunctionJsx(node);
          const cacheJsx = setJsxElementUid(jsxNodeList, sourceFile);
          cacheTree[path] = cacheJsx;
        }
      });
    }
  }
  return {
    code,
    path,
    cacheTree,
    sourceFile,
    map: null,
  };
}
