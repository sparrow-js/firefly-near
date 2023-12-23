const singleBlock = {
  componentName: 'NextBlock',
  title: '区域',
  props: {
    placeholderStyle: {
      height: '100%',
    },
    noPadding: false,
    noBorder: false,
    rowGap: 20,
    colGap: 20,
    title: '',
    background: 'surface',
    colSpan: 1,
    rowSpan: 1,
    mode: 'transparent',
    strict: true,
    childTotalColumns: 1,
  },
  children: [
    {
      componentName: 'NextBlockCell',
      title: '区块',
      props: {
        placeholderStyle: {
          height: '100%',
        },
        colSpan: 1,
        childMode: 'O',
        title: '区块标题',
        mode: 'procard',
        strict: true,
        isAutoContainer: true,
      },
    },
  ],
};

module.exports = [
  {
    name: 'nav',
    title: {
      label: '左侧区域',
    },
    defaultValue: false,
    setter: {
      componentName: 'SlotSetter',
      initialValue: {
        type: 'JSSlot',
        title: '左侧区域',
        visible: false,
        value: [{ ...singleBlock }],
      },
    },
  },
  {
    name: 'navProps.width',
    title: '左侧宽度',
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
    condition: (target) => {
      if (!target || !target.getProps()) {
        console.warn('target or props should not be empty: ', target);
        return false;
      }
      return !!target.getProps().getPropValue('nav');
    },
  },
  {
    name: 'aside',
    title: {
      label: '右侧区域',
    },
    defaultValue: false,
    setter: {
      componentName: 'SlotSetter',
      initialValue: {
        type: 'JSSlot',
        title: '右侧区域',
        visible: false,
        value: [{ ...singleBlock }],
      },
    },
  },
  {
    name: 'asideProps.width',
    title: '右侧宽度',
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
    condition: (target) => {
      if (!target || !target.getProps()) {
        console.warn('target or props should not be empty: ', target);
        return false;
      }
      return !!target.getProps().getPropValue('aside');
    },
  },
];
