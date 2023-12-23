module.exports = {
  componentName: 'NextRowColContainer',
  title: '行列容器',
  category: '布局容器类',
  group: '精选组件',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'RowColContainer',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: 'rowGap',
      propType: 'number',
    },
    {
      name: 'colGap',
      propType: 'number',
    },
    {
      name: 'style',
      propType: 'object',
    },
  ],
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: node => {
          return node.componentName !== 'NextBlockCell';
        }
      }
    },
    supports: { className: true, style: true },
    props: [
      {
        name: 'rowGap',
        title: '行间距',
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
        name: 'colGap',
        title: '列间距',
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
    advanced: {
      callbacks: {},
      initials: [
        {
          name: 'strict',
          initial: () => true,
        },
      ],
      initialChildren: [],
    }
  },
  icon: 'https://img.alicdn.com/imgextra/i2/O1CN01B1NMW926IFrFxjqQT_!!6000000007638-55-tps-56-56.svg',
  snippets: [
    {
      title: '行列容器',
      screenshot:
        'https://img.alicdn.com/imgextra/i2/O1CN01B1NMW926IFrFxjqQT_!!6000000007638-55-tps-56-56.svg',
      schema: {
        componentName: 'NextRowColContainer',
        title: '行列容器',
        props: {
          rowGap: 20,
          colGap: 20,
        },
        children: [
          {
            componentName: 'NextRow',
            title: '行',
            props: {},
            children: [
              {
                componentName: 'NextCol',
                title: '列',
                props: {
                  colSpan: 1,
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
