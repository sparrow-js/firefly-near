---
title: 基础
order: 0
---

`Page` `PageHeader` `PageFooter` 是页面布局下 3 个最基础的组成部分，可以试试给 `Page` 设置 `noContentPadding`。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Page, PageHeader, PageFooter } from '@alifd/pro-layout';

const MockBlock = (props) => {
  return (
    <div className="mock-block-fullx60" {...props}>
      {props.title} <sub>(100% x 100% with min-height:60px)</sub>
    </div>
  );
};

const App = () => {
  return (
    <Page
      minHeight="100vh"
      presetHeader
      presetFooter
      // 开启noContentPaddign后，内容区域将没有padding
      // noContentPadding
      header={<MockBlock title="页头" />}
      footer={<MockBlock title="页尾" />}
    >
      <MockBlock title="内容区域" />
    </Page>
  );
};

ReactDOM.render(
  <div className="mock-iframe">
    <App />
  </div>,
  mountNode,
);
```

```css
.mock-iframe {
  min-height: 350px;
  width: 100%;
  border: 1px solid #ddd;
}
.mock-block-fullx60 {
  width: 100%;
  height: 100%;
  min-height: 60px;
  background: #ddd;
  border: 1px dashed #333;
}
```
