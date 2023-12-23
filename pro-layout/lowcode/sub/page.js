const { updateColSpan } = require('../common/auto-block-cell');
const { DEFAULT_BLOCK_SCHEMA } = require('../common/const');
const { NEXT_PAGE } = require('../common');
const { createRowColContainerSnippet } = require('../common/const/row-col-schema');
const onNodeAdd = require('../common/page-on-node-add');
const navAside = require('./nav-aside');

const newNavAside = navAside.map((item) => {
  const newItem = { ...item };
  newItem.condition = (target) => {
    const isTab = target.getProps().getPropValue('isTab');
    if (['nav', 'aside'].indexOf(newItem.name) > -1) {
      return !isTab;
    }
    if (['navProps.width'].indexOf(newItem.name) > -1) {
      return !isTab && !!target.getProps().getPropValue('nav');
    }

    if (['asideProps.width'].indexOf(newItem.name) > -1) {
      return !isTab && !!target.getProps().getPropValue('aside');
    }
  };
  return newItem;
});

const snippets = [
  {
    title: '自然布局',
    screenshot:
      'https://img.alicdn.com/imgextra/i4/O1CN01NkB89W1dav8vtrAoc_!!6000000003753-55-tps-56-56.svg',
    schema: {
      componentName: NEXT_PAGE,
      title: '页面',
      props: {
        headerDivider: true,
        minHeight: '100vh',
        presetNav: true,
        presetAside: true,
        footer: false,
        // header: false,
        nav: false,
        aside: false,
        placeholderStyle: {
          gridRowEnd: 'span 1',
          gridColumnEnd: 'span 12',
        },
        headerProps: {
          background: 'surface',
        },
      },
      children: [],
    },
  },
];

module.exports = {
  componentName: NEXT_PAGE,
  title: '页面',
  category: '布局容器类',
  group: '精选组件',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'Page',
    main: 'lib/index.js',
    destructuring: true,
  },
  props: [
    {
      name: 'style',
      propType: 'object',
    },
    {
      name: 'prefix',
      propType: 'string',
      defaultValue: 'next-',
    },
    {
      name: 'header',
      propType: 'node',
    },
    {
      name: 'footer',
      propType: 'node',
    },
    {
      name: 'nav',
      propType: 'node',
    },
    {
      name: 'aside',
      propType: 'node',
    },
    {
      name: 'main',
      propType: 'node',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      isMinimalRenderUnit: true,
      disableBehaviors: '*',
      nestingRule: {
        parentWhitelist: (dropTargetNode) => {
          let targetNodeNextPageNum = 0;
          dropTargetNode.children.forEach((item) => {
            if (item.componentName === NEXT_PAGE) {
              targetNodeNextPageNum += 1;
            }
          });
          // 要拖入到的节点是根节点 && 根节点不是NextPage && 当前根节点下没有 NextPage  => 才允许被拖入
          if (
            dropTargetNode.isRoot &&
            dropTargetNode.componentName !== NEXT_PAGE &&
            targetNodeNextPageNum === 0
          ) {
            return true;
          }

          return false;
        },
      },
    },
    props: [
      {
        type: 'group',
        title: {
          label: '页面功能',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'header',
            title: '开启页头',
            defaultValue: {},
            setValue: (target) => {
              target.project?.simulator?.rerender?.();
            },
            setter: {
              componentName: 'SlotSetter',
              initialValue: {
                type: 'JSSlot',
                title: 'header',
                visible: false,
                value: [
                  {
                    componentName: 'NextPageHeader',
                    title: '页面头部',
                    props: {},
                    children: [createRowColContainerSnippet],
                  },
                ],
              },
            },
          },
          {
            name: 'footer',
            title: '开启页尾',
            defaultValue: null,
            setValue: (target) => {
              target.project?.simulator?.rerender?.();
            },
            setter: {
              componentName: 'SlotSetter',
              initialValue: {
                type: 'JSSlot',
                title: 'footer',
                visible: false,
                value: [
                  {
                    componentName: 'NextPageFooter',
                    title: '页面脚部',
                    children: [createRowColContainerSnippet],
                  },
                ],
              },
            },
          },
          {
            name: 'isTab',
            title: {
              label: '开启分页',
              tip: '打开后有子页面',
            },
            setter: {
              componentName: 'BoolSetter',
              initialValue: false,
            },
            extraProps: {
              setValue: (target, value) => {
                const { node } = target;
                const subChildren = node.children;
                const newSubChildren = [];

                if (value) {
                  // 分页模式下，添加 Tab.Item
                  subChildren.map((_item, i) => {
                    newSubChildren.push(subChildren.get(i));
                    return false;
                  });

                  const newTabWrapped = node.document.createNode({
                    componentName: 'NextPageContent',
                    title: '页面主体',
                    props: {
                      isTab: true,
                      nav: false,
                      aside: false,
                      presetNav: true,
                      presetAside: true,
                      title: '子页面',
                    },
                  });

                  node.children.importSchema([]);
                  node.children.insert(newTabWrapped);

                  for (const i in newSubChildren) {
                    // // Tab.Item > PageContent
                    // node.children.get(0).children.get(0).insert(newSubChildren[i]);
                    // PageContent
                    node.children.get(0).insert(newSubChildren[i]);
                  }
                } else {
                  // 单页模式
                  // 去掉 Tab， 只保留第一层
                  // // Tab.Item > PageContent
                  // const tabItemContent = subChildren.get(0).children.get(0).children;
                  // PageContent

                  // const tabItemContent = subChildren.get(0)?.children || [];
                  // tabItemContent.map((_item, i) => {
                  //   newSubChildren.push(tabItemContent.get(i));
                  //   return false;
                  // });

                  // node.children.importSchema([]);

                  // for (const i in newSubChildren) {
                  //   node.insert(newSubChildren[i]);
                  // }

                  const tabItemContentSchema = subChildren.get(0)?.schema?.children || [];
                  tabItemContentSchema.forEach((schema) => {
                    const n = node.document.createNode({ ...schema });
                    node.children.insert(n);
                  });

                  const tabsInfo = node.getPropValue('items');
                  tabsInfo && node.setPropValue('items', [tabsInfo[0]]);
                }

                target.project?.simulator?.rerender?.();
              },
            },
          },
          {
            name: 'items',
            condition: (target) => {
              return !!target.getProps().getPropValue('isTab');
            },
            isDynamicProp: true,
            setter: {
              componentName: 'ArraySetter',
              props: {
                itemSetter: {
                  componentName: 'ObjectSetter',
                  props: {
                    config: {
                      items: [
                        {
                          name: 'title',
                          title: '名称',
                          defaultValue: '标签项',
                          hideDescription: true,
                          important: true,
                          setter: 'StringSetter',
                        },
                        {
                          name: 'primaryKey',
                          title: '项目编号',
                          condition: () => false,
                          setter: 'StringSetter',
                        },
                      ],
                    },
                  },
                  initialValue: () => {
                    return {
                      primaryKey: String(Math.floor(Math.random() * 10000)),
                      title: '子页面',
                    };
                  },
                },
              },
            },
            extraProps: {
              display: 'plain',
              getValue(target) {
                // const node = target.node;
                // const children = node.children;
                const map = target.node.children.map((child) => {
                  const title = child.getPropValue('title');
                  const primaryKey = child.getPropValue('primaryKey');

                  const newPrimaryKey = primaryKey ? String(primaryKey) : child.id;
                  return {
                    primaryKey: newPrimaryKey,
                    title,
                  };
                });

                return map;
              },
              setValue(target, value) {
                const { node } = target;
                const map = {};
                if (!Array.isArray(value)) {
                  value = [];
                }
                value.forEach((item) => {
                  const tabitem = Object.assign({}, item);
                  map[item.primaryKey] = tabitem;
                });

                node.children.mergeChildren(
                  (child) => {
                    const primaryKey = child.getPropValue('primaryKey');
                    const newPrimaryKey = primaryKey ? String(primaryKey) : child.id;
                    if (Object.hasOwnProperty.call(map, newPrimaryKey)) {
                      child.setPropValue('title', map[newPrimaryKey].title);
                      delete map[newPrimaryKey];
                      return false;
                    }
                    return true;
                  },
                  () => {
                    const items = [];
                    for (const primaryKey in map) {
                      if (Object.hasOwnProperty.call(map, primaryKey)) {
                        items.push({
                          componentName: 'NextPageContent',
                          title: '页面主体',
                          props: {
                            isTab: true,
                            nav: false,
                            aside: false,
                            presetNav: true,
                            presetAside: true,
                            title: map[primaryKey].title,
                            primaryKey,
                          },
                          children: [{ ...DEFAULT_BLOCK_SCHEMA }],
                        });
                      }
                    }
                    return items;
                  },
                  (child1, child2) => {
                    const a = value.findIndex(
                      (item) =>
                        String(item.primaryKey) === String(child1.getPropValue('primaryKey')),
                    );
                    const b = value.findIndex(
                      (item) =>
                        String(item.primaryKey) === String(child2.getPropValue('primaryKey')),
                    );
                    return a - b;
                  },
                );
              },
            },
          },
        ],
      },
      {
        type: 'group',
        title: {
          label: '选项卡样式',
        },
        extraProps: {
          display: 'block',
        },
        condition: (target) => {
          return !!target.getProps().getPropValue('isTab');
        },
        items: [
          {
            name: 'tabProps.shape',
            title: '样式',
            condition: (target) => {
              return !!target.getProps().getPropValue('isTab');
            },
            defaultValue: 'pure',
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  { title: '普通型', value: 'pure' },
                  { title: '包裹型', value: 'wrapped' },
                  { title: '文本型', value: 'text' },
                  { title: '胶囊型', value: 'capsule' },
                ],
              },
            },
          },
          {
            name: 'tabProps.size',
            title: '尺寸',
            condition: (target) => {
              return !!target.getProps().getPropValue('isTab');
            },
            defaultValue: 'medium',
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  { title: '小', value: 'small' },
                  { title: '中', value: 'medium' },
                ],
              },
            },
          },
          {
            name: 'tabProps.excessMode',
            title: {
              label: '滑动模式',
              tip: '选项卡过多时，超出可视区域部分的tab该如何展示',
            },
            defaultValue: 'slide',
            condition: (target) => {
              return !!target.getProps().getPropValue('isTab');
            },
            setter: {
              componentName: 'RadioGroupSetter',
              props: {
                options: [
                  { title: '左右滑动', value: 'slide' },
                  { title: '下拉', value: 'dropdown' },
                ],
              },
            },
          },
          {
            name: 'minHeight',
            title: {
              label: '最小高度',
            },
            initialValue: '100vh',
            defaultValue: '100vh',
            setter: {
              componentName: 'StringSetter',
            },
            // 设计在线里不需要出现
            condition: () => false,
          },
        ],
      },
      {
        type: 'group',
        title: {
          label: '布局功能',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'contentAlignCenter',
            title: {
              label: '内容自适应模式',
              tip: '（在大屏下有区别）开启后内容区域有最大宽度且整体居中',
            },
            setter: {
              componentName: 'RadioGroupSetter',
              initialValue: false,
              defaultValue: false,
              props: {
                options: [
                  {
                    title: '内容拉伸',
                    value: false,
                  },
                  {
                    title: '内容居中',
                    value: true,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        type: 'group',
        title: {
          label: '拓展区域',
        },
        extraProps: {
          display: 'block',
        },
        condition: (target) => {
          return !target.getProps().getPropValue('isTab');
        },
        items: [...newNavAside],
      },
      {
        name: 'page',
        type: 'group',
        title: {
          label: '样式',
        },
        condition: (target) => {
          return !target.getProps().getPropValue('isTab');
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: 'contentProps.style.background',
            title: {
              label: '主体背景色',
            },
            condition: (target) => {
              return !target.getProps().getPropValue('isTab');
            },
            initialValue: 'rgba(255,255,255,0)',
            defaultValue: 'rgba(255,255,255,0)',
            setter: {
              componentName: 'ColorSetter',
              initialValue: 'rgba(255,255,255,0)',
              defaultValue: 'rgba(255,255,255,0)',
            },
          },
          {
            name: 'background',
            title: {
              label: 'Page的背景色',
            },
            condition: () => false,
            setter: {
              componentName: 'RadioGroupSetter',
              initialValue: 'lining',
            },
          },
          {
            name: 'presetNav',
            initialValue: true,
            defaultValue: true,
            condition: () => false,
          },
          {
            name: 'presetAside',
            initialValue: true,
            defaultValue: true,
            condition: () => false,
          },
        ],
      },
    ],
    supports: {
      style: true,
      loop: false,
    },
    advanced: {
      callbacks: {
        onNodeRemove: (removedNode, currentNode) => {
          const isSinglePage = !currentNode.getProps().getPropValue('isTab');
          // 如果删除的是 slot ：如果是 isTab 开启了， 那么聚焦到 PageContent 上 (page-content.js会处理)
          // 否则焦点聚焦到 Page 上
          if (
            removedNode.componentName === 'Slot' &&
            ['header', 'footer', 'aside', 'nav'].indexOf(removedNode.slotFor?.key) > -1 &&
            isSinglePage
          ) {
            currentNode.select();
          } else {
            updateColSpan({
              parent: removedNode.parent,
              child: removedNode,
              type: 'delete',
            });
          }
        },
        onNodeAdd: (dragment, currentNode) => {
          const isSinglePage = !currentNode?.getProps()?.getPropValue('isTab');
          if (isSinglePage) {
            onNodeAdd(dragment, currentNode);
          }
        },
      },
      initials: [
        {
          name: 'minHeight',
          initial: () => '100vh',
        },
        {
          name: 'presetNav',
          initial: () => true,
        },
        {
          name: 'presetAside',
          initial: () => true,
        },
        {
          name: 'modifyRemoveCondition',
          initial: () => {
            window.parent.AliLowCodeEngine.material.modifyBuiltinComponentAction(
              'remove',
              (action) => {
                const oldCondition = Object.prototype.hasOwnProperty.call(action, 'condition')
                  ? action.condition
                  : true;
                action.condition = (node) => {
                  if (node.componentName === NEXT_PAGE) {
                    return false;
                  }
                  return typeof oldCondition === 'function' ? oldCondition(node) : oldCondition;
                };
              },
            );
          },
        },
        // 会让页面拖入不了 Dialog / Drawer 这些，暂时屏蔽
        // {
        //   name: 'drillDown',
        //   initial: (target) => {
        //     // 这里加 timeout 0 的原因是初始化时当前页面可能还没有添加到页面中（target.parent is null）
        //     setTimeout(() => {
        //       if (target.parent && target.parent.isRoot()) {
        //         target.parent.document.drillDown(target);
        //       }
        //     }, 0);
        //   },
        // },
      ],
    },
  },
  snippets,
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};
