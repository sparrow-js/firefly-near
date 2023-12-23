module.exports = {
  componentName: 'NextRow',
  title: '行',
  category: '容器',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'Row',
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
      name: 'minHeight',
      propType: 'number',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: (node) => {
          return node.componentName !== 'NextBlockCell';
        },
      },
    },
    supports: { className: true, style: true },
    props: [
      {
        name: 'minHeight',
        title: '最小高度',
        display: 'inline',
        setter: {
          componentName: 'NumberSetter',
          // props: {
          //   min: 0,
          //   units: ['px'],
          // },
        },
      },
    ],
    advanced: {
      initials: [
        {
          name: 'strict',
          initial: () => true,
        },
      ],
      initialChildren: [],
      getResizingHandlers: (node) => {
        const directionMap = {};
        if (node.index < node.parent.children.length - 1) {
          directionMap.s = node;
        }
        if (node.index > 0) {
          directionMap.n = node;
        }
        return Object.keys(directionMap);
      },
      callbacks: {
        onResizeStart(e, currentNode) {
          console.log('onResizeStart');
          const { parent } = currentNode;
          if (parent) {
            const parentNode = parent.getDOMNode();
            if (parentNode) {
              currentNode.parentRect = parentNode.getBoundingClientRect();
            }
          }
          currentNode.startRect = currentNode.getRect();
          currentNode.siblingNode =
            e.trigger === 'n' ? currentNode.prevSibling : currentNode.nextSibling;
          currentNode.siblingRect = currentNode.siblingNode
            ? currentNode.siblingNode.getRect()
            : null;
        },
        onResize(e, currentNode) {
          const [prevNodes, nextNodes] = currentNode.parent.children.reduce(
            (tuple, n) => {
              if (n.index !== currentNode.index) {
                tuple[n.index < currentNode.index ? 0 : 1].push(n);
              }
              return tuple;
            },
            [[], []],
          );

          const { deltaY } = e;
          const startHeight = currentNode.startRect.height;
          const minHeight = 1;

          if (e.trigger === 's' && isAllFixedRow(prevNodes) && currentNode.siblingRect) {
            const prevHeight = Math.max(minHeight, currentNode.siblingRect.height - deltaY);
            setColNodeHeight(currentNode.siblingNode, prevHeight);
            currentNode.siblingHeight = prevHeight;
          } else if (e.trigger === 'n' && isAllFixedRow(nextNodes) && currentNode.siblingRect) {
            const nextHeight = Math.max(minHeight, currentNode.siblingRect.height + deltaY);
            setColNodeHeight(currentNode.siblingNode, nextHeight);
            currentNode.siblingHeight = nextHeight;
          }

          // set current node height
          let height = e.trigger === 'n' ? startHeight - deltaY : startHeight + deltaY;
          height = Math.max(minHeight, height);
          height = Math.min(height, currentNode.parentRect.height); // 不能大于父容器高度
          setColNodeHeight(currentNode, height);
          currentNode.rowHeight = Math.round(height);
        },
        onResizeEnd(e, currentNode) {
          currentNode.setPropValue('minHeight', currentNode.rowHeight);
          if (currentNode.siblingHeight) {
            currentNode.siblingNode.setPropValue('minHeight', currentNode.siblingHeight);
          }

          // Keep at least one auto-sized Row
          setTimeout(() => {
            if (isAllFixedRow(currentNode?.parent?.children || [])) {
              currentNode.siblingNode.setPropValue('minHeight', '');
            }
          }, 0);
        },
      },
    },
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};

function isAllFixedRow(nodes) {
  return nodes.filter((n) => n.getPropValue('minHeight')).length === nodes.length;
}

function setColNodeHeight(node, height) {
  node.setPropValue('minHeight', Math.round(height));
  node.getDOMNode().style.flex = `0 0 ${Math.round(height)}px`;
}
