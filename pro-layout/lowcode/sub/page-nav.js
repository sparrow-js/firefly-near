module.exports = {
  componentName: 'NextPageNav',
  title: '页面左侧',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'PageNav',
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
        name: 'width',
        title: {
          label: '宽度',
        },
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
    ],
    supports: {
      style: true,
      loop: false,
    },
  },
  icon:
    "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png"
};
