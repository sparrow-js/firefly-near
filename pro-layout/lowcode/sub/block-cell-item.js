module.exports = {
  componentName: "NextBlockCellItem",
  title: "子区块",
  category: "布局容器类",
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'BlockCellItem',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: "style",
      propType: "object"
    },
  ],
  configure: {
    component: {
      isContainer: true,
      // disableBehaviors: "*"
    },
    advanced: {
      callbacks: {
        onMoveHook: () => false
      }
    },
    props: {
      override: [
        {
          name: "fakemode",
          title: {
            label: "模式"
          },
          initialValue: "transparent",
          defaultValue: "transparent",
          setter: {
            componentName: "RadioGroupSetter",
            initialValue: "transparent",
            defaultValue: "transparent",
            props: {
              options: [
                {
                  title: "卡片",
                  value: "card"
                },
                {
                  title: "透明",
                  value: "transparent"
                }
              ]
            }
          }
        },
      ]
    }
  },
  icon:
    "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png"
};
