module.exports = {
  componentName: 'NextCol',
  title: '列',
  category: '容器',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'Col',
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
      name: 'colSpan',
      propType: 'number',
    },
    {
      name: 'colWidth',
      propType: 'number',
    },
    {
      name: 'justifyContent',
      propType: 'string',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: node => {
          return node.componentName !== 'NextBlockCell';
        }
      }
    },
    supports: { className: true, style: true },
    props: [
      {
        name: 'widthType',
        title: '宽度类型',
        initialValue: 'auto',
        defaultValue: 'auto',
        setter: {
          componentName: 'RadioGroupSetter',
          props: {
            options: [
              {
                title: '自适应',
                value: 'auto',
              },
              {
                title: '固定',
                value: 'fixed',
              },
            ],
          },
        },
        extraProps: {
          getValue: (target) => {
            return target.node.getPropValue('colWidth') ? 'fixed' : 'auto';
          },
          setValue: (target, value) => {
            if (value === 'fixed') {
              target.node.setPropValue('colWidth', target.node.getRect().width);
            } else if (value === 'auto') {
              target.node.setPropValue('colWidth', '');
              target.node.setPropValue('colSpan', 1);
            }
          },
        },
      },
      {
        name: 'colWidth',
        title: '固定宽度',
        display: 'inline',
        setter: {
          componentName: 'NumberSetter',
          // props: {
          //   min: 32,
          //   units: [{ type: 'px' }],
          // },
        },
        extraProps: {
          setValue: (target) => {
            // TODO 需要判断是否超出父容器尺寸
            /*
              // 但是目前通过 .setValue 等方式更新没法修改 setter 中的展示值
              const pRect = target.parent?.node?.getRect();
              const val = parseInt(value.replace('px', ''), 10);
              if (pRect.width && val > pRect.width) {
                target.setValue(${pRect.width}px`);
              }
             */

            // TODO 如果当前行只有一个元素，则不允许修改尺寸

            // 修改 widthType
            const currentNode = target.node;
            currentNode.setPropValue('widthType', 'fixed');

            // 如果该行全部为 fixed 时，则修改 sibling 容器尺寸
            setTimeout(() => {
              if (isAllFixedCol(currentNode.parent.children)) {
                const siblingNode = currentNode.prevSibling || currentNode.nextSibling;
                siblingNode.setPropValue('colWidth', '');
                siblingNode.setPropValue('widthType', 'auto');
              }
            }, 0);
          },
        },
      },
      {
        name: 'justifyContent',
        title: '垂直排版',
        display: 'inline',
        defaultValue: 'flex-start',
        setter: {
          componentName: 'RadioGroupSetter',
          props: {
            options: [
              {
                title: '居顶',
                value: 'flex-start',
              },
              {
                title: '居中',
                value: 'center',
              },
              {
                title: '居底',
                value: 'flex-end',
              },
            ],
          },
        },
      },
    ],
    advanced: {
      getResizingHandlers: (node) => {
        const directionMap = getNodeResizeDirection(node);
        node.delegateMap = directionMap;
        return Object.keys(directionMap);
      },
      callbacks: {
        onResizeStart(e, triggerNode) {
          console.log('onResizeStart');
          const currentNode = getResizeTargetFromDelegateMap(e.trigger, triggerNode.delegateMap);

          // side effects
          if (currentNode.id !== triggerNode.id) addDelegateStyle(currentNode, e.trigger);
          disableDivider();

          if (currentNode.componentName === 'NextRow') {
            deleteResizeToTargetNode(currentNode, 'onResizeStart', e, currentNode);
            return;
          }

          // resize calc
          const { parent } = currentNode;
          if (parent) {
            const parentNode = parent.getDOMNode();
            if (parentNode) {
              currentNode.parentRect = parentNode.getBoundingClientRect();
            }
          }
          currentNode.startRect = currentNode.getRect();
          currentNode.minWidth = 32;
          currentNode.siblingNode =
            e.trigger === 'w' ? currentNode.prevSibling : currentNode.nextSibling;
          currentNode.siblingRect = currentNode.siblingNode
            ? currentNode.siblingNode.getRect()
            : null;
        },
        onResize(e, triggerNode) {
          const currentNode = getResizeTargetFromDelegateMap(e.trigger, triggerNode.delegateMap);
          if (currentNode.componentName === 'NextRow') {
            deleteResizeToTargetNode(currentNode, 'onResize', e, currentNode);
            return;
          }
          const [prevNodes, nextNodes] = currentNode.parent.children.reduce(
            (tuple, n) => {
              if (n.index !== currentNode.index) {
                tuple[n.index < currentNode.index ? 0 : 1].push(n);
              }
              return tuple;
            },
            [[], []],
          );

          const { deltaX } = e;
          const startWidth = currentNode.startRect.width;
          const { minWidth } = currentNode;

          // set sibling width if needed
          if (e.trigger === 'w' && isAllFixedCol(prevNodes) && currentNode.siblingRect) {
            const prevWidth = Math.max(minWidth, currentNode.siblingRect.width + deltaX);
            setColNodeWidth(currentNode.siblingNode, prevWidth);
            currentNode.siblingWidth = prevWidth;
          } else if (e.trigger === 'e' && isAllFixedCol(nextNodes) && currentNode.siblingRect) {
            const nextWidth = Math.max(minWidth, currentNode.siblingRect.width - deltaX);
            setColNodeWidth(currentNode.siblingNode, nextWidth);
            currentNode.siblingWidth = nextWidth;
          }

          // set current node width
          let width = e.trigger === 'w' ? startWidth - deltaX : startWidth + deltaX;
          width = Math.max(minWidth, width);
          width = Math.min(width, currentNode.parentRect.width); // 不能大于父容器宽度（减去间距 + 兄弟节点（最小尺寸 1））
          setColNodeWidth(currentNode, width);
          currentNode.colWidth = Math.round(width);
        },
        onResizeEnd(e, triggerNode) {
          const currentNode = getResizeTargetFromDelegateMap(e.trigger, triggerNode.delegateMap);

          // clean side effects
          if (currentNode.id !== triggerNode.id) removeDelegateStyle(currentNode, e.trigger);
          enableDivider();

          if (currentNode.componentName === 'NextRow') {
            deleteResizeToTargetNode(currentNode, 'onResizeEnd', e, currentNode);
            return;
          }

          currentNode.setPropValue('colWidth', currentNode.colWidth);
          if (currentNode.siblingWidth) {
            currentNode.siblingNode.setPropValue('colWidth', currentNode.siblingWidth);
          }

          // Keep at least one auto-sized Col
          setTimeout(() => {
            if (isAllFixedCol(currentNode.parent.children)) {
              currentNode.siblingNode.setPropValue('colWidth', '');
            }
          }, 0);
        },
      },
      initials: [
        {
          name: 'strict',
          initial: () => true,
        },
      ],
      initialChildren: [],
    }
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};

function isAllFixedCol(nodes) {
  return nodes.filter((n) => n.getPropValue('colWidth')).length === nodes.length;
}

function setColNodeWidth(node, width) {
  node.getDOMNode().style.flex = `0 0 ${Math.round(width)}px`;
}

function getAncestorCol(node) {
  if (
    node.parent &&
    node.parent.componentName === 'NextRow' &&
    node.parent.parent &&
    node.parent.parent.componentName === 'NextCol'
  ) {
    return node.parent.parent;
  }
}

function getNodeResizeDirection(node) {
  return {
    ...getDirectionMapByWidth(node),
    ...getDirectionMapByHeight(node.parent),
  };
}

function getDirectionMapByWidth(node) {
  const directionMap = {};

  // 首尾容器，则往上寻找可拖拽父容器
  if (node.index === 0 || node.index === node.parent.children.length - 1) {
    const ancestor = getAncestorCol(node);
    if (ancestor) {
      const ancestorMap = getDirectionMapByWidth(ancestor);
      Object.assign(directionMap, ancestorMap);
    }
  }

  if (node.index < node.parent.children.length - 1) {
    directionMap.e = node;
  }

  if (node.index > 0) {
    directionMap.w = node;
  }

  return directionMap;
}

function getDirectionMapByHeight(node) {
  if (node?.componentName !== 'NextRow') return {};
  const directionMap = {};

  if (node.index < node.parent.children.length - 1) {
    directionMap.s = node;
  }

  if (node.index > 0) {
    directionMap.n = node;
  }

  return directionMap;
}

function deleteResizeToTargetNode(node, callback, ...params) {
  const metaData = node.componentMeta.getMetadata();
  if (
    metaData &&
    metaData.configure &&
    metaData.configure.advanced &&
    metaData.configure.advanced.callbacks &&
    typeof metaData.configure.advanced.callbacks[callback] === 'function'
  ) {
    metaData.configure.advanced.callbacks[callback](...params);
  }
}

function getResizeTargetFromDelegateMap(direction, delegateMap) {
  return delegateMap && delegateMap[direction] ? delegateMap[direction] : null;
}

function addDelegateStyle(node) {
  const cssAttr = 'outline';
  const domNode = node.getDOMNode();
  node.originalBorderColor = domNode.style[cssAttr];
  domNode.style[cssAttr] = '1px dashed #197aff';
}

function removeDelegateStyle(node) {
  const cssAttr = 'outline';
  const domNode = node.getDOMNode();
  domNode.style[cssAttr] = node.originalBorderColor;
}

function disableDivider() {
  const iframe = window.AliLowCodeEngine.project.simulator;
  iframe && iframe.contentWindow.dispatchEvent(new Event('dividerDisable'));
}

function enableDivider() {
  const iframe = window.AliLowCodeEngine.project.simulator;
  iframe && iframe.contentWindow.dispatchEvent(new Event('dividerEnable'));
}
