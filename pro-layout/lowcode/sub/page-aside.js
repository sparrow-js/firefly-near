module.exports = {
  componentName: 'NextPageAside',
  title: '页面右侧',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'PageAside',
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
        // defaultValue: '200px',
        defaultValue: 200,
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
    advanced: {
      callbacks: {
      },
    }
  },
  icon:
    "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png"
};
