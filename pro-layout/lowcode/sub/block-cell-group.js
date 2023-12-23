module.exports = {
  componentName: "NextBlockCellGroup",
  title: "子区块",
  category: "布局容器类",
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'BlockCellGroup',
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
    },
    advanced: {
      callbacks: {
      }
    },
    props: {
      override: [

      ]
    }
  },
  icon:
    "https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png"
};
