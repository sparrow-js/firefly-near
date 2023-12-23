export const createColSnippet = {
  componentName: 'NextCol',
  title: '列',
  props: {
    colSpan: 1,
  },
};

export const createRowSnippet = {
  componentName: 'NextRow',
  title: '行',
  props: {},
  children: [createColSnippet],
};

export const createRowColContainerSnippet = {
  componentName: 'NextRowColContainer',
  title: '行列容器',
  props: {
    rowGap: 20,
    colGap: 20,
  },
  children: [createRowSnippet],
};
