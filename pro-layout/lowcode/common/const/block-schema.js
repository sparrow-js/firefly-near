const { createRowColContainerSnippet } = require('./row-col-schema');

export const DEFAULT_BLOCK_CELL_SCHEMA = {
  componentName: 'NextBlockCell',
  props: {
    colSpan: 12,
    rowSpan: 1,
    mode: 'procard',
    isAutoContainer: true,
    title: '区块标题',
  },
};

export const DEFAULT_BLOCK_SCHEMA = {
  componentName: 'NextBlock',
  title: '区域',
  props: {
    placeholderStyle: {
      height: '100%',
    },
    noPadding: false,
    noBorder: false,
    title: '区域标题',
    rowGap: 20,
    colGap: 20,
    background: 'surface',
    layoutmode: 'O',
    strict: true,
    colSpan: 12,
    rowSpan: 1,
    mode: 'transparent',
    childTotalColumns: 12,
  },
  children: [
    {
      componentName: 'NextBlockCell',
      props: {
        colSpan: 12,
        rowSpan: 1,
        mode: 'procard',
        isAutoContainer: true,
        title: '区块标题',
      },
      children: [createRowColContainerSnippet],
    },
  ],
};
