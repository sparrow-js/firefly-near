const {
  getDefaultBlockCellSchema,
  getDefaultBlockSchema
} = require('./const');
const { NEXT_PAGE } = require('../common');

const findLastChildren = code => {
  if (Array.isArray(code.children) && code.children.length > 0) {
    return findLastChildren(code.children[0]);
  }
  return code;
}

const findLastNode = node => {
  if (node.children && node.children.length > 0) {
    return findLastNode(node.children.get(0));
  }
  return node;
}
/**
 * 返回包裹了P标签的schema，会根据dragged的类型设置不同的属性
 * @param {*} dragged 被拖入的组件，是个引擎 node 类型
 * @returns {} 返回值是个对象
 */
const getLayoutPSchema = (dragged) => {
  const layoutPSchema = {
    componentName: 'NextP',
    title: '段落',
    props: {
      wrap: false,
      type: 'body2',
      verAlign: 'middle',
      textSpacing: true,
      align: 'left',
    },
    children: [dragged.exportSchema()],
  };

  if (
    ['Form', 'ResponsiveGrid', 'Box', 'Card', 'List', 'Message', 'Slider', 'NextTable'].includes(
      dragged.componentName,
    ) ||
    dragged.getPropValue('isFillContainer')
  ) {
    layoutPSchema.props.full = true;
  }

  return layoutPSchema;
};

/**
 *
 * @param {*} dragged 被拖入的组件，是个引擎 node 类型
 * @param {*} node 被拖入到的节点，是引擎 node 类型，一般是 NextPage 下
 * @param {*} dropTargetComponentName 被拖入到的节点的 componentName, 比如 NextPage
 */
const wrapWithP = (dragged, node, dropTargetComponentName) => {
  const layoutPSchema = getLayoutPSchema(dragged);
  const layoutPNode = node.document.createNode(layoutPSchema);
  const warppedSchema = Object.assign(layoutPNode.exportSchema());

  setTimeout(() => {
    // const dragmentTarget = dropTarget;
    // 要拖入的地方如果是 NextP 那就 不再自动包裹 P了
    if (dropTargetComponentName === 'NextP') {
      console.log(
        `[${dragged.componentName}] to [${dropTargetComponentName}] does't need to wrap with NextP. [from NextPage3]`,
      );
      return;
    }

    console.log(
      `[${dragged.componentName}] to [${dropTargetComponentName}] need to wrap with NextP [from NextPage3]`,
    );
    const newNode = node.document.createNode(warppedSchema);
    node.insertBefore(newNode, dragged, false);
    dragged.remove(false);
    newNode.children.get(0).select();
  }, 1);
};

/**
 *
 * @param {*} dragged 被拖入的组件，是个引擎 node 类型
 * @param {*} node 被拖入到的节点，是引擎 node 类型，一般是 NextPage 下
 * @param {*} dropTargetComponentName 被拖入到的节点的 componentName, 比如 NextPage
 * @param {*} blockLen 子元素的容器长度
 */
const wrapWithBlock = (dragged, node, dropTargetComponentName, blockLen) => {
  const needPSchema = dragged.componentName !== 'NextRowColContainer';
  const layoutPSchema = getLayoutPSchema(dragged);
  // 为目标元素包裹一层 Block
  const schema = getDefaultBlockSchema();
  schema.props.childTotalColumns = blockLen || 12;

  const lastChild = findLastChildren(schema);

  if (needPSchema) {
    lastChild.children = layoutPSchema;
  } else {
    lastChild.children = dragged.exportSchema();
  }

  setTimeout(() => {
    console.log(
      `[${dragged.componentName
      }] to [${dropTargetComponentName}] need to wrap with NextBlock > NextBlockCell ${needPSchema ? '> NextP' : ''
      } [from NextPage2]`,
    );
    const newNode = node.document.createNode(schema);
    node.insertBefore(newNode, dragged, false);
    dragged.remove(false);

    findLastNode(newNode).select();
  }, 1);
};

/**
 *
 * @param {*} dragged 被拖入的组件，是个引擎 node 类型
 * @param {*} node 被拖入到的节点，是引擎 node 类型，一般是 NextPage 下
 * @param {*} dropTargetComponentName 被拖入到的节点的 componentName, 比如 NextPage
 * @param {*} blockLen 子元素的容器长度
 */
const wrapWithBlockCell = (dragged, node, dropTargetComponentName, blockLen) => {
  const needPSchema = dragged.componentName === 'NextRowColContainer';

  const layoutPSchema = getLayoutPSchema(dragged);

  // 为目标元素包裹一层 Block
  const schema = getDefaultBlockCellSchema();
  schema.props.childTotalColumns = blockLen || 12;
  schema.props.colSpan = blockLen || 12;
  if (needPSchema) {
    schema.children = layoutPSchema;
  } else {
    schema.children = dragged.exportSchema();
  }

  setTimeout(() => {
    console.log(
      `[${dragged.componentName}] to [${dropTargetComponentName}] need to wrap with NextBlockCell ${needPSchema ? '> NextP' : ''
      } [from wrapWithBlockCell]`,
    );
    const newNode = node.document.createNode(schema);
    // node.insertBefore(newNode, dragged, false);
    node.insertAfter(newNode);
    dragged.remove(false);

    findLastNode(newNode).select();
  }, 1);
};


module.exports = function (dragment, currentNode) {
  // 拖入的组件为 P、Block、Slot（把NextPage拖入到面板里时，NextPage的Slot也会触发onNodeAdd事件） 时,不进行包裹
  // 拖入的组件 isModal为true时（例如drawer dialog 这类有单独组件树结构的），不进行包裹
  if (
    !dragment ||
    ['NextP', 'NextBlock', 'Slot', 'Anchor', 'AnchorForm', 'ProCard'].includes(
      dragment.componentName,
    ) ||
    (dragment.isModal && dragment.componentMeta.isModal())
  ) {
    console.log(
      `[${dragment.componentName}] doesn't need to wrap with NextBlock > NextBlockCell`,
    );
    return;
  }

  const { dropLocation } = dragment.document.canvas;
  if (!dropLocation) {
    // 没有 dropLocation 一般是 slot, slot 元素不用特殊处理 不做任何包裹
    return;
  }
  const dropTarget = dropLocation.target;
  const dropTargetName = dropLocation.target.componentName || '';

  // 找到要拖入进去的节点 ID
  const targetId = (dropLocation && dropLocation.target.id) || '';
  // 找到要拖入进去的节点
  const slotTarget =
    currentNode.slots.length > 0 && currentNode.slots.find((item) => item.id === targetId);

  const isPageDirectChild =
    [NEXT_PAGE, 'NextPageContent'].includes(dropTargetName) && currentNode.children.has(dragment);
  const isPageSlotChild =
    slotTarget &&
    ['aside'].indexOf(slotTarget.slotFor?.key) > -1 &&
    slotTarget.children.has(dragment);
  const isSmartPartialLayout =
    dropTarget.getPropValue('isAutoContainer') || ['NextCol'].indexOf(dropTargetName) > -1;
  const isPageSlot =
    slotTarget && ['header', 'footer', 'nav'].indexOf(slotTarget.slotFor?.key) > -1;

  const isBlockDirectChild = ['NextBlock'].includes(dropTargetName) && dragment.componentName !== 'NextBlockCell';
  const isBlockChildInSlot =
    ['NextBlock'].includes(dropTargetName) &&
    ['NextPageNav', 'NextPageAside'].includes(dropTarget.parent.componentName);

  if (isPageDirectChild) {
    // 需要包裹 Block BlockCell P 的情况：
    // 1. 组件拖入到 NextPage，的直接子元素下(不包括slot), 此时Block宽度为12
    // 需要包裹 Block BlockCell ，不带 P 的情况 ：拖小布局到 Page
    wrapWithBlock(dragment, currentNode, dropTargetName, 12);
  } else if (isPageSlotChild) {
    // 需要包裹 Block BlockCell P 的情况：
    // 2. 组件拖入到 NextPage 的 aside slot, 的直接子元素下 （不包括slot下的进一步内容），但此时Block宽度为1
    // 需要包裹 Block BlockCell ，不带 P 的情况 ：拖小布局到 Slot
    wrapWithBlock(dragment, slotTarget, dropTargetName, 1);
  } else if (isSmartPartialLayout) {
    // 需要包裹 P 的情况：
    // 1. 如果是处于，开启了小布局模式的容器组件中
    wrapWithP(dragment, dropTarget, dropTargetName);
  } else if (isPageSlot) {
    // 需要包裹 P 的情况：
    // 2. 如果是处于，Page 的 nav header footer 中
    // wrapWithP(dragment, slotTarget, dropTargetName);
    // 不能放在这里
    dragment.remove(false);
  } else if (isBlockChildInSlot) {
    wrapWithBlockCell(dragment, dropTarget, dropTargetName, 1);
  } else if (isBlockDirectChild) {
    // 需要包裹 BlockCell P 的情况 ： 拖普通组件到 Page 下的 Block
    // 需要包裹 BlockCell ，不带 P 的情况 ：拖小布局到 Page 下的 Block
    wrapWithBlockCell(dragment, dropTarget, dropTargetName, 12);
  }
  // 其他维持原状，不进行其他设置
}
