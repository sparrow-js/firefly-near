module.exports = {
  componentName: "NextPCell",
  title: "段落-组",
  category: "布局容器类",
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'P',
    main: 'lib/index.js',
    destructuring: true,
    subName: 'Cell',
  },
  props: [
    {
      name: "style",
      propType: "object"
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
        defaultValue: "left"
      },
      defaultValue: "left",
      initialValue: "left",
      setter: {
        componentName: "RadioGroupSetter",
        initialValue: "left",
        props: {
          defaultValue: "left",
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
        parentWhitelist: ["NextP"]
      }
    },
    props: [
      {
        name: "width",
        title: "宽度",
        initialValue: "auto",
        defaultValue: "auto",
        condition: () => false,
        setter: {
          componentName: "NumberSetter",
          props: {
            units: [
              {
                type: "px",
                list: true
              },
              {
                type: "%",
                list: true
              }
            ]
          }
        }
      },
      {
        name: "direction",
        title: "排布方式",
        initialValue: "hoz",
        defaultValue: "hoz",
        setter: {
          componentName: "RadioGroupSetter",
          initialValue: "hoz",
          defaultValue: "hoz",
          props: {
            options: [
              {
                title: "上下排列",
                value: "ver"
              },
              {
                title: "左右排列",
                value: "hoz"
              }
            ]
          }
        }
      },
      {
        name: "align",
        title: "对齐方式",
        initialValue: "inherit",
        defaultValue: "inherit",
        condition: target => {
          if (!target || !target.getProps()) {
            console.warn("target or props should not be empty: ", target);
            return false;
          }
          return !!(target.getProps().getPropValue("direction") === "ver");
        },
        setter: {
          componentName: "RadioGroupSetter",
          initialValue: "inherit",
          defaultValue: "inherit",
          props: {
            options: [
              {
                title: "左",
                value: "left"
              },
              {
                title: "中",
                value: "center"
              },
              {
                title: "右",
                value: "right"
              },
              {
                title: "默认",
                value: "inherit"
              }
            ]
          }
        }
      },
      {
        name: "verAlign",
        title: "对齐方式",
        initialValue: "inherit",
        defaultValue: "inherit",
        condition: target => {
          if (!target || !target.getProps()) {
            console.warn("target or props should not be empty: ", target);
            return false;
          }
          return !!(target.getProps().getPropValue("direction") === "hoz");
        },
        setter: {
          componentName: "RadioGroupSetter",
          initialValue: "inherit",
          defaultValue: "inherit",
          props: {
            options: [
              {
                title: "上",
                value: "top"
              },
              {
                title: "中",
                value: "middle"
              },
              {
                title: "baseline",
                value: "baseline"
              },
              {
                title: "下",
                value: "bottom"
              },
              {
                title: "默认",
                value: "inherit"
              }
            ]
          }
        }
      }
    ],
    supports: {
      style: true
    }
  },
};
