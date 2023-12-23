const { updateColSpan } = require('../common/auto-block-cell');
const { BLOCK_RESIZE_MAP } = require('../common/const');

const { CardMeta } = require('../pro-card/meta');

const cardConfigProps = CardMeta.configure.props;
const addRemoveSyncConfig = (dragment, rParent) => {
  if (dragment.componentName === 'NextBlockCellItem' && rParent.componentName === 'NextBlockCell') {
    // 更新 childNum 值
    const num = rParent.node.children.length;
    if (num > 1) {
      rParent.setPropValue('childNum', num);
      if (rParent.getProps().getPropValue('childMode') === 'ver') {
        rParent.setPropValue('childTotalColumns', num);
      }
    }
  }
};

/**
 * 获取数组 arr 中， 前 index 个（包括第index个）元素的加和值, index 是索引 从0开始
 * @param {*} arr
 * @param {*} index
 */
const getAcc = (arr, index) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.reduce((last, count, i) => {
      if (i <= index) {
        return +count + last;
      }
      return last;
    }, 0);
  }
  return 0;
};

module.exports = {
  componentName: 'NextBlockCell',
  title: '区块',
  category: '容器',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'BlockCell',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: 'style',
      propType: 'object',
    },
    {
      name: 'childMode',
      propType: 'string',
    },
    {
      name: 'childTotalColumns',
      propType: 'number',
    },
    {
      name: 'mode',
      propType: 'string',
    },
    {
      name: 'colSpan',
      propType: 'number',
    },
    {
      name: 'rowSpan',
      propType: 'number',
    },
    {
      name: 'content',
      propType: 'node',
    },
    {
      name: 'title',
      propType: 'node',
    },
    {
      name: 'extra',
      propType: 'node',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: ['NextRowColContainer'],
      },
    },
    props: [
      {
        name: 'isAutoContainer',
        initialValue: true,
        defaultValue: true,
        setter: 'BoolSetter',
        condition: () => false,
      },
      {
        type: 'group',
        title: {
          label: '样式',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'mode',
            title: '区块样式',
            initialValue: 'transparent',
            defaultValue: 'transparent',
            setter: {
              componentName: 'RadioGroupSetter',
              initialValue: 'transparent',
              defaultValue: 'transparent',
              props: {
                options: [
                  {
                    title: '卡片',
                    value: 'procard',
                  },
                  {
                    title: '透明',
                    value: 'transparent',
                  },
                ],
              },
            },
            extraProps: {
              setValue: (target, value) => {
                if (value === 'transparent') {
                  const title = target.node.getPropValue('title');
                  target.node.setPropValue('_title', title);
                  target.node.setPropValue('title', '');
                } else {
                  const title = target.node.getPropValue('_title');
                  target.node.setPropValue('title', title);
                }
              },
            },
          },
        ],
      },
      {
        title: '卡片配置',
        type: 'group',
        display: 'accordion',
        condition: (target) => {
          return target.getProps().getPropValue('mode') === 'procard';
        },
        items: [...cardConfigProps],
      },
    ],
    advanced: {
      getResizingHandlers: (node) => {
        const directionMap = [];
        const flatenGroupMap = node.parent.lastFlatenMap;

        if (node.index < 0) {
          return [];
        }
        if (
          !(
            Array.isArray(flatenGroupMap) &&
            flatenGroupMap.length > 0 &&
            node.index > -1 &&
            flatenGroupMap[node.index]
          )
        ) {
          updateColSpan({
            parent: node.parent,
            type: 'refresh',
          });
          return ['e', 'w'];
        }
        const { groupLength, groupInnerIndex } = flatenGroupMap[node.index];

        if (groupInnerIndex > 0) {
          directionMap.push('w');
        }

        if (groupInnerIndex < groupLength - 1) {
          directionMap.push('e');
        }

        return directionMap;
      },
      callbacks: {
        onNodeRemove: (removedNode) => {
          console.log('====== removedNode', removedNode, removedNode.componentName);
          const rParent = removedNode.parent;
          addRemoveSyncConfig(removedNode, rParent);
          if (
            removedNode.componentName === 'NextBlockCellItem' &&
            rParent.componentName === 'NextBlockCell'
          ) {
            if (rParent.children.length === 0) {
              rParent.remove(false);
              updateColSpan({
                parent: rParent.parent,
                child: rParent,
                type: 'delete',
              });
            } else if (rParent.children.length === 1) {
              const remaindItemNode = rParent.children.get(0);
              rParent.children.importSchema([]);
              remaindItemNode.children.forEach((node) => {
                rParent.children.insert(node);
              });
              rParent.setPropValue('childMode', 'initial');

              const { mode } = remaindItemNode.exportSchema().props;
              rParent.setPropValue('mode', mode);
            }
          }
        },
        onNodeAdd: (dragment, currentNode) => {
          addRemoveSyncConfig(dragment, currentNode);
        },
        onResizeStart: (e, currentNode) => {
          console.log('onResizeStart');
          const { parent } = currentNode;
          if (parent) {
            const parentNode = parent.getDOMNode();
            if (parentNode) {
              currentNode.parentRect = parentNode.getBoundingClientRect();
            }
          }
          currentNode.lastDeltaX = 0;
          currentNode.lastGroupList = '';
        },
        onResize: (e, currentNode) => {
          // 获取合法移动位移
          // 判断是否要变化
          // 更新鼠标开始位置，更新span信息
          const { deltaX, trigger } = e;
          // trigger 可能为 e（右） 或 w（左）
          const { index: parentIndex } = currentNode;
          const { lastFlatenMap } = currentNode.parent;

          if (!lastFlatenMap) {
            return;
          }
          const { groupInnerIndex, groupList } = lastFlatenMap[parentIndex];
          const latestDeltaX = deltaX - currentNode.lastDeltaX || 0;

          // 当前 groupList 是 4 4 4
          // 根据左右方向确认是 r 还是 l
          // 根据resize handleer 方向（w e） 和 当前的 groupInnerIndex ，确定分割线位置
          // 假如算出来的是 1r
          //  4 4 4 + 1r = 6 3 3
          // 在「groupInnerIndex === 0， deltaX 往右移动两格」或 「groupInnerIndex === 1」deltaX往左移动两格时
          //  再updateColSpan

          const direction = latestDeltaX > 0 ? 'r' : 'l';
          const operation = `${
            trigger === 'e' ? groupInnerIndex + 1 : groupInnerIndex
          }${direction}`;
          const afterGroupList =
            BLOCK_RESIZE_MAP[groupList] && BLOCK_RESIZE_MAP[groupList][operation];
          const groupAccInnerIndex = trigger === 'e' ? groupInnerIndex : groupInnerIndex - 1;

          // console.log('groupList:', groupList, '   afterGroupList', afterGroupList, '  operation:', operation, ' deltaX:', deltaX, '  latestDeltaX:',latestDeltaX, '   linedirection', trigger)
          if (!afterGroupList) {
            return;
          }
          const step =
            getAcc(afterGroupList.split(','), groupAccInnerIndex) -
            getAcc(groupList.split(','), groupAccInnerIndex);
          // console.log('step:', step, '  groupAccInnerIndex:', groupAccInnerIndex, '  deltaX', deltaX, '   currentNode.movementAtOnce:', currentNode.movementAtOnce, '   currentNode.lastGroupList:', currentNode.lastGroupList);
          if (currentNode.movementAtOnce === step && currentNode.lastGroupList === groupList) {
            return;
          }

          const stepPx = (currentNode.parentRect.width / 12) * step;
          const tolerance = 40;

          // console.log('stepPx:', stepPx, '  tolerance:', tolerance)

          if (Math.abs(latestDeltaX) > Math.abs(stepPx) - tolerance) {
            currentNode.movementAtOnce = step;
            currentNode.lastGroupList = groupList;
            currentNode.lastDeltaX += stepPx;

            updateColSpan({
              parent: currentNode.parent,
              child: currentNode,
              type: 'resize',
              direction: trigger, // 默认是 e , 也就是拖拽区块右边的线进行resize
              offset: step,
            });
          }
        },
        onResizeEnd: (e, currentNode) => {
          currentNode.movementAtOnce = 'clear';
        },
        onMoveHook: () => {
          const engineVersion = window?.AliLowCodeEngine?.version;
          if (+engineVersion?.split('.')[2] > 78 || engineVersion === '9.9.9') {
            return true;
          }

          return false;
        },
      },
      initials: [
        {
          name: 'childNum',
          initial: () => 2,
        },
        {
          name: 'childMode',
          initial: () => 'initial',
        },
      ],
      initialChildren: [
        {
          componentName: 'NextRowColContainer',
          title: '行列容器',
          props: {
            rowGap: 20,
            colGap: 20,
          },
          children: [
            {
              componentName: 'NextRow',
              title: '行',
              props: {},
              children: [
                {
                  componentName: 'NextCol',
                  title: '列',
                  props: {
                    colSpan: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    supports: {
      style: true,
      loop: false,
    },
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};
