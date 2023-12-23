const navAside = require('./nav-aside');
const onNodeAdd = require('../common/page-on-node-add');

const newNavAside = navAside.map((item) => {
  return { ...item };
});

module.exports = {
  componentName: 'NextPageContent',
  title: '页面主体',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'PageContent',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [],
  configure: {
    component: {
      isContainer: true,
    },
    props: [
      {
        name: 'title',
        title: {
          label: '子页面标题',
        },
        initialValue: '子页面',
        defaultValue: '子页面',
        setter: {
          componentName: 'StringSetter',
          initialValue: '子页面',
          defaultValue: '子页面',
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
      {
        type: 'group',
        title: {
          label: '拓展区域',
        },
        extraProps: {
          display: 'block',
        },
        items: [...newNavAside],
      },
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
            name: 'style.background',
            title: {
              label: '主体背景色',
            },
            initialValue: 'transparent',
            defaultValue: 'transparent',
            setter: 'ColorSetter',
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
        onNodeAdd,
        onNodeRemove: (removedNode, currentNode) => {
          // 如果删除的是slot 那么焦点聚焦到PageContent上
          if (
            removedNode.componentName === 'Slot' &&
            ['header', 'footer', 'aside', 'nav'].indexOf(removedNode.slotFor?.key) > -1
          ) {
            currentNode.select();
          }
        },
      },
      initials: [
        {
          name: 'presetNav',
          initial: () => true,
        },
        {
          name: 'presetAside',
          initial: () => true,
        },
      ],
    },
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_table.png',
};
