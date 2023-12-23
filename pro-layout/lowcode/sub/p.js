const { NEXT_PAGE } = require('../common');

module.exports = {
  componentName: "NextP",
  title: "段落",
  category: "布局容器类",
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'P',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: "style",
      propType: "object"
    },
    {
      name: "prefix",
      propType: "string",
      defaultValue: "next-"
    },
    {
      // textSpacing 强行为所有Text类型的孩子之间加间距
      // name: "为文本组件之间添加间距",
      name: "textSpacing",
      title: {
        label: "文字间距",
        tip: "开启后，同一“段落”下，多个Text之间会产生间距"
      },
      propType: "bool",
      condition: () => false,
      defaultValue: true
    },
    {
      // full 强行开启撑满模式，P的每一个children都是100%的
      // name: "占满一行",
      name: "full",
      title: {
        label: "占满一行",
        tip: "开启后，子元素将占满一行"
      },
      propType: "bool",
      condition: () => false,
      defaultValue: false
    },
    {
      // flex 强行开启flex模式，作为块状布局的容器
      name: "flex",
      title: {
        label: "块状布局",
        tip: "相对于“行内布局模式”,子元素是不可分割的块"
      },
      propType: "bool",
      condition: () => false,
      defaultValue: true
    },
    {
      name: "wrap",
      title: {
        label: "超长换行",
        tip: "只在块状布局下生效，而行内布局下默认就是换行的"
      },
      propType: "bool",
      condition: () => false,
      // condition(target) {
      //   return target.getProps().getPropValue("flex") || false;
      // },
      defaultValue: true,
    },
    {
      name: "type",
      title: "字体大小",
      extraProps: {
        defaultValue: "body2"
      },
      defaultValue: "body2",
      initialValue: "body2",
      setter: {
        componentName: "SelectSetter",
        initialValue: "body2",
        props: {
          defaultValue: "body2",
          options: [
            {
              title: "h1",
              value: "h1"
            },
            {
              title: "h2",
              value: "h2"
            },
            {
              title: "h3",
              value: "h3"
            },
            {
              title: "h4",
              value: "h4"
            },
            {
              title: "h5",
              value: "h5"
            },
            {
              title: "h6",
              value: "h6"
            },
            {
              title: "body1",
              value: "body1"
            },
            {
              title: "body2",
              value: "body2"
            },
            {
              title: "caption",
              value: "caption"
            },
            {
              title: "overline",
              value: "overline"
            }
          ]
        }
      }
    },
    {
      name: "verAlign",
      title: "垂直对齐",
      extraProps: {
        defaultValue: "baseline"
      },
      defaultValue: "baseline",
      initialValue: "baseline",
      setter: {
        componentName: "RadioGroupSetter",
        initialValue: "baseline",
        props: {
          defaultValue: "baseline",
          options: [
            {
              title: "top",
              value: "top"
            },
            {
              title: "baseline",
              value: "baseline"
            },
            {
              title: "middle",
              value: "middle"
            },
            {
              title: "bottom",
              value: "bottom"
            }
          ]
        }
      }
    },
    {
      name: "align",
      title: "水平对齐",
      extraProps: {
        defaultValue: "space-between"
      },
      defaultValue: "space-between",
      initialValue: "space-between",
      setter: {
        componentName: "RadioGroupSetter",
        initialValue: "space-between",
        defaultValue: "space-between",
        props: {
          defaultValue: "space-between",
          options: [
            {
              title: "space-between",
              value: "space-between"
            },
            {
              title: "space-around",
              value: "space-around"
            },
            {
              title: "space-evenly",
              value: "space-evenly"
            },
            {
              title: "left",
              value: "left"
            },
            {
              title: "center",
              value: "center"
            },
            {
              title: "right",
              value: "right"
            }
          ]
        }
      }
    }
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        parentWhitelist: (testNode) => {
          if (
            testNode.isContainer() &&
            [NEXT_PAGE, "NextBlock"].indexOf(testNode.componentName) === -1
          ) {
            return true;
          }
          if (
            testNode.componentName === "Slot" &&
            ["header", "footer", "nav"].indexOf(testNode.title) > -1
          ) {
            return true;
          }
          return false;
        }
      }
    },
    props: {
      isExtends: true,
      override: [
        {
          name: "prefix",
          condition: () => false
        }
      ]
    },
    advanced: {
      callbacks: {
        onNodeRemove: (removedNode, currentNode) => {
          if (!removedNode || !currentNode) {
            return;
          }
          const { children } = currentNode;
          // 若无children,则说明当前P组件内已为空,需要删除P组件本身
          if (children && children.length === 0) {
            currentNode.remove();
          }
        }
      },
      initials: [
        {
          name: "flex",
          initial: () => true
        },
        {
          name: "wrap",
          initial: () => true
        }
      ]
    }
  },
};
