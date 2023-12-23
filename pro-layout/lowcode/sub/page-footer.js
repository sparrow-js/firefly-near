module.exports = {
  componentName: 'NextPageFooter',
  title: '页面尾部',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'PageFooter',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [

  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
      },
    },
    props: [
      {
        name: 'fixed',
        title: {
          label: '是否吸底',
          tip: '可以用来放置吸底的表单提交按钮等',
        },
        defaultValue: false,
        initialValue: false,
        setter: {
          componentName: 'BoolSetter',
          initialValue: false,
          defaultValue: false,
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
