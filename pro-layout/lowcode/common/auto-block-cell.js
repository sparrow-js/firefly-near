const { BLOCK_RESIZE_MAP } = require('./const');

const parseFlaten2Tree = (flaten = [], tree) => {
  flaten.forEach((item) => {
    if (!tree[item.groupIndex]) {
      tree[item.groupIndex] = [];
    }
    tree[item.groupIndex].push(item);
  });
};

/**
 * 一组（ colSpan加和小于等于12 ）块，在遇到 resize 时候的处理行为
 * @param {*} groupArr 在原数组上进行修改
 * @param {*} blockCellNode 触发resize的节点
 * @param {*} offset 偏移量，-2表示左2格，1表示右1格
 * @param {Emun} direction 'e' | 'w' 表示在用哪条bar e（右） 或 w（左）
 * @returns
 */
const handleResize = (groupArr, blockCellNode, offset, direction = 'e') => {
  const changeIndex = groupArr.findIndex((item) => item.id === blockCellNode.exportSchema().id);
  const key = groupArr.map((item) => item.colSpan).join(',');
  if (changeIndex < 0) {
    return;
  }
  const lineIndex = direction === 'w' ? changeIndex : changeIndex + 1;

  // mapping 上给的是第一条线，对应的是第0个 BlockCell 上的resize操作
  const subKey = `${lineIndex}${offset > 0 ? 'r' : 'l'}`;
  const targetMap = BLOCK_RESIZE_MAP?.[key]?.[subKey];

  if (targetMap) {
    targetMap.split(',').forEach((col, i) => {
      groupArr[i].colSpan = +col;
    });
  }
};

/**
 * 一组（ colSpan加和小于等于12 ）块，在遇到切割时候的处理行为
 * @param {*} groupArr 在原数组上进行修改
 * @param {*} blockCellNode 触发 分割 的节点
 * @param {*} groupIndex 当前所处理的数组，他们有共同的组序列号
 * @returns
 */
const handleSplit = (groupArr, blockCellNode, groupIndex) => {
  const changeIndex = groupArr.findIndex((item) => item.id === blockCellNode.exportSchema().id);
  const key = groupArr.map((item) => item.colSpan).join(',');
  if (changeIndex < 0) {
    return;
  }
  const subKey = `${changeIndex}s`;
  const targetMap = BLOCK_RESIZE_MAP?.[key]?.[subKey];
  if (targetMap) {
    const originProps = blockCellNode.exportSchema().props;
    const blockCellSchema = {
      componentName: 'NextBlockCell',
      props: originProps,
    };
    const newNode = blockCellNode.document.createNode(blockCellSchema);
    blockCellNode.parent.insertAfter(newNode, blockCellNode, false);

    const newNodeSchema = [blockCellNode, newNode].map((item) => {
      return {
        id: item.id,
        groupIndex,
      };
    });
    groupArr.splice(changeIndex, 1, newNodeSchema[0], newNodeSchema[1]);

    targetMap.split(',').forEach((col, i) => {
      groupArr[i].colSpan = +col;
    });
  }
};

/**
 * 一组（ colSpan加和小于等于12 ）块，在遇到删除时候的处理行为
 * @param {*} afterTreeGroup 由于事件监听的是onNodeRemove, 所以对 delete 来说，这里已经是after的group了
 * @param {*} afterFlatenGroup 在原数组上进行修改
 * @param {*} blockCellNode 触发 删除 的节点
 * @param {*} blockNode 触发 删除 的节点属的Block
 * @returns
 */
const handleDelete = (afterTreeGroup, afterFlatenGroup, blockCellNode, blockNode) => {
  const treeMap = [];
  parseFlaten2Tree(blockNode.lastFlatenMap, treeMap);
  treeMap.forEach((group) => {
    const { groupIndex } = group[0];
    const changeIndex = group.findIndex((item) => item.id === blockCellNode.exportSchema().id);
    const key = group.map((item) => item.colSpan).join(',');
    if (changeIndex < 0) {
      afterFlatenGroup.push(...afterTreeGroup[groupIndex]);
      return;
    }

    const subKey = `${changeIndex}d`;
    const targetMap = BLOCK_RESIZE_MAP?.[key]?.[subKey];
    if (targetMap) {
      targetMap.split(',').forEach((col, i) => {
        afterTreeGroup[groupIndex][i].colSpan = +col;
      });

      afterFlatenGroup.push(...afterTreeGroup[groupIndex]);
    }
  });
};
// currentBlock.lastFlatenMap
const findGroupIndex = (id, map = []) => {
  let groupIndex = -1;
  map.forEach((m) => {
    if (m.id === id) {
      groupIndex = m.groupIndex;
    }
  });

  return groupIndex;
};
/**
 *
 * @param {*} currentBlock parent refresh 的模式下，只要求有parent
 * @param {*} currentBlockCell child
 * @param {Enum} type 'split' | 'delete' | 'resize' | 'refresh'
 * @param {*} object 若是resize， offset表示移动的距离; node1, node2 表示新增之后的节点
 * @param {Emun} direction 'e' | 'w' 表示 e（右） 或 w（左）
 */
const updateColSpan = ({
  parent: currentBlock,
  child: currentBlockCell,
  type,
  offset = 0,
  direction = 'e',
}) => {
  if (
    !(
      currentBlock &&
      currentBlock.componentName === 'NextBlock' &&
      (type === 'refresh' ||
        (currentBlockCell && currentBlockCell.componentName === 'NextBlockCell'))
    )
  ) {
    return;
  }

  const beforeFlatenGroup = [];
  const maxLen = currentBlock.exportSchema().props.childTotalColumns || 12;
  // const childrenListSchema = currentBlock.exportSchema()?.children;
  const childrenListSchema = currentBlock.exportSchema().children;

  if (!childrenListSchema) {
    // 把 Block 中的最后一个子元素 BlockCell 删掉，意味着删掉 Block
    currentBlock.remove();
    return;
  }
  let total = 0;
  let groupIndex = 0;

  childrenListSchema.forEach((c) => {
    const item = {
      id: c.id,
      colSpan: c.props.colSpan,
    };

    const inheritIndex = findGroupIndex(c.id, currentBlock.lastFlatenMap);

    if (inheritIndex > -1 && type === 'delete') {
      item.groupIndex = inheritIndex;
    } else {
      total += c.props.colSpan || 0;
      if (total > maxLen) {
        groupIndex++;
        total = c.props.colSpan;
      }
      item.groupIndex = groupIndex;
    }

    beforeFlatenGroup.push(item);
  });
  console.log(beforeFlatenGroup, '====== before group =====');

  const beforeTreeGroup = [];

  parseFlaten2Tree(beforeFlatenGroup, beforeTreeGroup);

  const afterFlatenGroup = [];

  if (type === 'resize' && offset !== 0) {
    beforeTreeGroup.forEach((group) => {
      handleResize(group, currentBlockCell, offset, direction);
      afterFlatenGroup.push(...group);
    });
  } else if (type === 'split') {
    beforeTreeGroup.forEach((group, groupI) => {
      handleSplit(group, currentBlockCell, groupI);
      afterFlatenGroup.push(...group);
    });
  } else if (type === 'delete') {
    // 由于事件监听的是onNodeRemove, 所以对 delete 来说，这里已经是after的group了
    handleDelete(beforeTreeGroup, afterFlatenGroup, currentBlockCell, currentBlock);
  } else {
    beforeTreeGroup.forEach((group) => {
      afterFlatenGroup.push(...group);
    });
  }

  afterFlatenGroup.forEach((data) => {
    const currentGroupIndex = data.groupIndex;
    const groupList = [];
    let num = 0;
    afterFlatenGroup.forEach((item) => {
      if (item.groupIndex === currentGroupIndex) {
        item.groupInnerIndex = num;
        groupList.push(item.colSpan);
        num++;
      }
    });
    data.groupLength = groupList.length;
    data.groupList = groupList.join(',');
  });

  console.log(afterFlatenGroup, '====== after group =====');

  const adjustColSpan = (afterFlaten) => {
    afterFlaten.forEach((item) => {
      // currentBlock.document.getNode(item.id).setPropValue("colSpan", item.colSpan);
      currentBlock.document.getNodeById(item.id).setPropValue('colSpan', item.colSpan);
    });
  };

  adjustColSpan(afterFlatenGroup);
  currentBlock.lastFlatenMap = afterFlatenGroup;
  // for delete
};

module.exports = {
  updateColSpan,
};
