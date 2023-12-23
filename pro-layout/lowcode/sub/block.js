const { updateColSpan } = require('../common/auto-block-cell');
const { NEXT_PAGE } = require('../common');

module.exports = {
  componentName: "NextBlock",
  title: "区域",
  category: "布局容器类",
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'Block',
    main: 'lib/index.js',
    destructuring: true,
    subName: ""
  },
  props: [
    {
      name: "style",
      propType: "object"
    },
    {
      name: "childTotalColumns",
      propType: "number"
    },
    {
      name: "colSpan",
      propType: "number"
    },
    {
      name: "rowSpan",
      propType: "number"
    },
    {
      name: "noPadding",
      propType: "bool"
    },
    {
      name: "noBorder",
      propType: "bool"
    },
    {
      name: "background",
      propType: {
        type: "oneOf",
        value: ["lining", "surface", "transparent"]
      },
      defaultValue: "lining"
    },
    {
      name: "abc",
      propType: "string"
    }
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: ["NextBlockCell"],
        parentWhitelist: (testNode) => {
          // 允许拖入LayoutPage aside slot中
          if (testNode.componentName === NEXT_PAGE) {
            return true;
          }

          // Block 可以嵌套
          if (testNode.componentName === "NextBlockCell") {
            return true;
          }
          if (
            testNode.componentName === "Slot" &&
            ["aside"].indexOf(testNode.title) > -1
          ) {
            return true;
          }
          return false;
        }
      }
    },
    props: [
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
            name: "rowGap",
            title: "区块行间距",
            display: 'inline',
            // defaultValue: '20px',
            defaultValue: 20,
            setter: {
              componentName: 'NumberSetter',
              // props: {
              //   min: 0,
              //   units: [{ type: 'px' }],
              // },
            },
          },
          {
            name: "colGap",
            title: "区块列间距",
            display: 'inline',
            // defaultValue: '20px',
            defaultValue: 20,
            setter: {
              componentName: 'NumberSetter',
              // props: {
              //   min: 0,
              //   units: [{ type: 'px' }],
              // },
            },
          }
        ]
      },
      {
        type: 'group',
        title: {
          label: '区域功能',
        },
        extraProps: {
          display: 'block',
        },
        items: [
          {
            name: "title",
            title: "区域标题",
            initialValue: "区域标题",
            defaultValue: '区域标题',
            setter: () => {
              if (window.AliLowCodeEngine && window.AliLowCodeEngine.setters.getSetter('TitleSetter')) {
                return {
                  componentName: 'TitleSetter',
                  defaultValue: '区域标题',
                  props: {
                    defaultChecked: true,
                  },
                };
              }
              return {
                componentName: 'StringSetter',
                defaultValue: '区域标题',
              }
            },
          },
        ]
      },
    ],
    advanced: {
      callbacks: {
        onLocateHook: ({ dragObject, target, detail }) => {
          if (dragObject.nodes?.length === 1) {
            const dragNode = dragObject.nodes[0];
            const currentDragIndex = dragNode.index;
            if (!target.lastFlatenMap) {
              updateColSpan({
                parent: target,
                type: 'refresh',
              });
            }
            const flattenMap = target.lastFlatenMap || [];
            let distDragIndex = detail.index;

            if (distDragIndex > currentDragIndex) {
              distDragIndex -= 1;
            }
            // 只有同行可以换
            if (flattenMap[currentDragIndex]?.groupIndex === flattenMap[distDragIndex]?.groupIndex) {
              return true;
            }
          }
          // 拖拽多个先不处理
          return false;
        },
      },
      initials: [
        {
          name: "strict",
          initial: () => true,
        },
      ],
      initialChildren: [
        {
          componentName: "NextBlockCell",
          props: {
            placeholderStyle: {
              height: "100%"
            },
            childMode: "O",
            title: "区块标题",
            mode: "procard",
            rowGap: 20,
            colGap: 20,
            strict: true,
            isAutoContainer: true,
          }
        }
      ],
    }
  },
  icon:
    "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png"
};
