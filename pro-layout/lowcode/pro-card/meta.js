import { operationProps } from '../common';
import { hideProp } from '../utils';

export const CardTagItemProps = [
  {
    name: 'label',
    title: '名称',
    display: 'inline',
    initialValue: '操作',
    important: true,
    setter: 'StringSetter',
  },
  {
    name: 'color',
    title: '颜色',
    display: 'inline',
    important: true,
    initialValue: 'blue',
    setter: {
      componentName: 'SelectSetter',
      props: {
        options: [
          {
            title: 'blue',
            value: 'blue',
          },
          {
            title: 'orange',
            value: 'orange',
          },
          {
            title: 'yellow',
            value: 'yellow',
          },
          {
            title: 'turquoise',
            value: 'turquoise',
          },
          {
            title: 'green',
            value: 'green',
          },
          {
            title: 'red',
            value: 'red',
          },
        ],
      },
    },
  },
];

export const CardActionButtonProps = [
  {
    name: 'children',
    title: '名称',
    display: 'inline',
    defaultValue: '操作',
    important: true,
    setter: 'StringSetter',
  },
  {
    name: 'onClick',
    title: '点击事件',
    display: 'inline',
    important: true,
    setter: 'FunctionSetter',
  },
];

export const CardSectionProps = [
  {
    name: 'title',
    title: '标题',
    setter: 'StringSetter',
    description: '标题',
  },
  {
    name: 'explanation',
    title: {
      label: '解释文案',
      tip: '标题栏用户自定义内容',
    },
    setter: 'StringSetter',
    description: '副标题',
  },
  {
    name: 'headerDivider',
    setter: 'BoolSetter',
    title: '标题分割线',
    defaultValue: true,
  },
  {
    name: 'noBullet',
    setter: 'BoolSetter',
    title: '简洁子标题',
    defaultValue: false,
  },
  {
    name: 'footerDivider',
    setter: 'BoolSetter',
    title: '底部分割线',
    defaultValue: false,
  },
  {
    name: 'hasDividerIndent',
    setter: 'BoolSetter',
    title: '分割线缩进',
    defaultValue: false,
  },
  {
    type: 'field',
    name: 'tagGroup',
    title: '标题标签',
    extraProps: {
      display: 'accordion',
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: CardTagItemProps,
            },
          },
          initialValue: () => {
            return {
              label: '操作',
              color: 'blue',
            };
          },
        },
      },
    },
  },
  {
    name: 'style',
    display: 'accordion',
    setter: 'StyleSetter',
    title: '卡片样式',
  },
  {
    name: 'isFillContainer',
    defaultValue: true,
    condition: hideProp,
    setter: 'BoolSetter',
  },
];

export const CardProps = [
  {
    name: 'title',
    title: '标题',
    setter: () => {
      if (window.AliLowCodeEngine && window.AliLowCodeEngine.setters.getSetter('TitleSetter')) {
        return {
          componentName: 'TitleSetter',
          defaultValue: '标题',
          props: {
            defaultChecked: true,
          },
        };
      }
      return {
        componentName: 'StringSetter',
        defaultValue: '标题',
      }
    },
    description: '标题',
  },
  {
    name: 'description',
    title: '子标题',
    setter: () => {
      if (window.AliLowCodeEngine && window.AliLowCodeEngine.setters.getSetter('TitleSetter')) {
        return {
          componentName: 'TitleSetter',
          defaultValue: '子标题',
        };
      }
      return {
        componentName: 'StringSetter',
        defaultValue: '',
      }
    },
  },
  {
    name: 'explanation',
    title: {
      label: '解释文案',
      tip: '标题栏用户自定义内容',
    },
    setter: () => {
      if (window.AliLowCodeEngine && window.AliLowCodeEngine.setters.getSetter('TitleSetter')) {
        return {
          componentName: 'TitleSetter',
          defaultValue: '解释文案',
        };
      }
      return {
        componentName: 'StringSetter',
        defaultValue: '',
      }
    },
  },
  {
    name: 'hasDivider',
    setter: 'BoolSetter',
    title: '头部分割线',
    defaultValue: true,
  },
  {
    name: 'loading',
    setter: 'BoolSetter',
    title: '加载中',
    defaultValue: false,
  },
  {
    name: 'bodyPadding',
    title: {
      label: '内容区间距',
    },
    defaultValue: '',
    initialValue: '',
    setter: {
      componentName: 'RadioGroupSetter',
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
  {
    type: 'field',
    name: 'tagGroup',
    title: '状态标签',
    extraProps: {
      display: 'accordion',
    },
    setter: {
      componentName: 'ArraySetter',
      props: {
        itemSetter: {
          componentName: 'ObjectSetter',
          props: {
            config: {
              items: CardTagItemProps,
            },
          },
          initialValue: () => {
            return {
              label: '操作',
              color: 'blue',
            };
          },
        },
      },
    },
  },
  {
    title: '主标题操作',
    type: 'group',
    display: 'accordion',
    items: [
      {
        name: 'hasCollapse',
        setter: 'BoolSetter',
        title: '可收起',
        defaultValue: false,
      },
      {
        name: 'text',
        title: {
          label: '文字模式',
          tip: '是否设定按钮为文字模式',
        },
        defaultValue: true,
        setter: 'BoolSetter',
      },
      {
        name: 'visibleButtonCount',
        title: {
          label: '可见数量',
          tip: '超过会收起到”更多“菜单中',
        },
        extraProps: {
          defaultValue: 3,
        },
        setter: {
          componentName: 'NumberSetter',
          props: {
            max: 6,
            min: 1,
          },
        },
      },
      {
        type: 'field',
        name: 'actionButtons',
        extraProps: {
          display: 'plain',
        },
        setter: {
          componentName: 'ArraySetter',
          props: {
            itemSetter: {
              componentName: 'ObjectSetter',
              props: {
                config: {
                  items: CardActionButtonProps,
                },
              },
              initialValue: () => {
                return {
                  children: '操作',
                };
              },
            },
          },
        },
      },
    ],
  },
  {
    name: 'isFillContainer',
    defaultValue: true,
    condition: hideProp,
    setter: 'BoolSetter',
  },
  ...operationProps,
];

export const CardMeta = {
  componentName: 'ProCard',
  title: '卡片',
  group: '精选组件',
  docUrl: '',
  screenshot:
    'https://img.alicdn.com/imgextra/i4/O1CN01qjZnGj1OW8lpLCQqm_!!6000000001712-55-tps-56-56.svg',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'ProCard',
    main: 'lib/index.js',
    destructuring: true,
    subName: '',
  },
  props: CardProps,
  configure: {
    component: {
      isContainer: true,
    },
    props: CardProps,
    supports: {
      style: true,
      loop: false,
    },
  },
  icon: 'https://img.alicdn.com/imgextra/i4/O1CN01qjZnGj1OW8lpLCQqm_!!6000000001712-55-tps-56-56.svg',
  category: '布局容器类',
};

export const CardSectionMeta = {
  componentName: 'ProCardSection',
  title: '内部卡片',
  group: '精选组件',
  docUrl: '',
  screenshot: '',
  npm: {
    package: '@alifd/pro-layout',
    version: '^0.1.0',
    exportName: 'ProCard',
    main: 'lib/index.js',
    destructuring: true,
    subName: 'CardSection',
  },
  props: [
    {
      name: 'title',
      propType: {
        type: 'oneOfType',
        value: ['node', 'string'],
      },
      description: '标题',
    },
    {
      name: 'explanation',
      propType: {
        type: 'oneOfType',
        value: ['node', 'string'],
      },
      description: '副标题',
    },
    {
      name: 'className',
      propType: 'string',
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
        parentWhitelist: ['ProCard', 'NextCol'],
      },
    },
    props: CardSectionProps,
    supports: {
      style: true,
      loop: false,
    },
  },
  icon: 'https://img.alicdn.com/imgextra/i1/O1CN01QLAiJK1tXHqxBV16n_!!6000000005911-55-tps-56-56.svg',
  category: '布局容器类',
};

export default [
  {
    ...CardMeta,
  },
  {
    ...CardSectionMeta,
  },
];
