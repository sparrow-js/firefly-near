import { createRowSnippet, createColSnippet } from './const/row-col-schema';
import { updateColSpan } from './auto-block-cell';

export const splitColVertical = (colNode) => {
  let newCol;

  if (isFixedWidth(colNode)) {
    const rowColNode = getClosestRowColContainer(colNode);
    const splitWidth = Math.max(
      Math.round(
        (colNode.exportSchema().props.colWidth - (rowColNode?.getPropValue('colGap') || 20)) / 2,
      ),
      1,
    );
    newCol = colNode.document.createNode({
      ...createColSnippet,
      props: {
        ...createColSnippet.props,
        colWidth: splitWidth,
      },
    });
    colNode.setPropValue('colWidth', splitWidth);
    colNode.getDOMNode().style.flex = `0 0 ${splitWidth}px`;
    setTimeout(() => {
      newCol.getDOMNode().style.flex = `0 0 ${splitWidth}px`;
    }, 0);
  } else {
    newCol = colNode.document.createNode(createColSnippet);
  }

  colNode.parent.insertAfter(newCol, colNode, false);
  colNode.document.selection.select(colNode.id);
};

export const splitColHorizontal = (colNode) => {
  // 父亲为 Row & 只有 Col 这一个节点
  if (colNode.parent?.componentName === 'NextRow' && colNode.parent?.children?.length === 1) {
    splitRowHorizontal(colNode.parent);
    return;
  }

  // Col 有且只有 Row Children
  if (
    colNode.children.length &&
    colNode.children.filter((n) => n.componentName === 'NextRow').length
  ) {
    colNode.insert(colNode.document.createNode(createRowSnippet));
    colNode.document.selection.select(colNode.id);
    return;
  }

  // 默认情况，需要添加两行 & 把 children 挪到第一行内
  const originChildren = colNode.exportSchema()?.children;
  colNode.children.mergeChildren(
    () => true,
    () => [
      {
        ...createRowSnippet,
        children: [
          {
            ...createRowSnippet.children[0],
            children: originChildren,
          },
        ],
      },
      createRowSnippet,
    ],
    () => false,
  );
  colNode.document.selection.select(colNode.id);
};

export const splitRowHorizontal = (rowNode) => {
  const newRow = rowNode.document.createNode(createRowSnippet);
  rowNode.parent.insertAfter(newRow, rowNode, false);
  rowNode.document.selection.select(rowNode.id);
};

export const splitRowColContainerHorizontal = (rowColContainerNode) => {
  const newRowColNode = rowColContainerNode.document.createNode(createRowSnippet);
  rowColContainerNode.insert(newRowColNode);
  rowColContainerNode.document.selection.select(newRowColNode.id);
};

export const splitNodeByDimension = (dimension: 'v' | 'h', node: any) => {
  switch (node.componentName) {
    case 'NextCol':
      if (dimension === 'v') {
        splitColVertical(node);
      }
      if (dimension === 'h') {
        splitColHorizontal(node);
      }
      break;

    case 'NextRow':
      if (dimension === 'h') {
        splitRowHorizontal(node);
      }
      break;

    case 'NextRowColContainer':
      if (dimension === 'h') {
        splitRowColContainerHorizontal(node);
      }
      break;

    case 'NextBlockCell':
      if (dimension === 'v') {
        console.log('=======node.parent', node);
        updateColSpan({
          parent: node.parent,
          child: node,
          type: 'split',
        });
      }

      node.select();
      break;

    default:
      break;
  }
};

// utils
function isFixedWidth(node) {
  return node.exportSchema().props.colWidth;
}

function getClosestRowColContainer(node) {
  while (node && node.componentName !== 'NextRowColContainer') {
    return getClosestRowColContainer(node.parent);
  }
  return node;
}
