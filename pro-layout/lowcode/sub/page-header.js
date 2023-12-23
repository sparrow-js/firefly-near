module.exports = {
  componentName: 'NextPageHeader',
  title: '页面头部',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'PageHeader',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [

  ],
  configure: {
    component: {
      isContainer: true,
      disableBehaviors: "*",
      nestingRule: {
        childWhitelist: ["NextRowColContainer"],
      }
    },
    props: [
      {
        name: 'style.background',
        title: {
          label: '主体背景色',
        },
        initialValue: '#ffffff',
        defaultValue: '#ffffff',
        setter: {
          componentName: 'ColorSetter',
          initialValue: '#ffffff',
          defaultValue: '#ffffff',
        },
      },
      {
        name: 'style.padding',
        title: {
          label: '内间距',
        },
        defaultValue: '',
        initialValue: '',
        setter: {
          componentName: 'RadioGroupSetter',
          initialValue: '',
          props: {
            options: [
              {
                title: '无',
                value: '0',
              },
              {
                title: '有',
                value: '',
              },
            ],
          },
        },
      },

    ],
    supports: {
      style: true,
      loop: false,
    },
  },
  icon:
    "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png"
};
