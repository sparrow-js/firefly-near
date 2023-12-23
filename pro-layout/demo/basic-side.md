---
title: 基础-侧边栏
order: 2
---

页面主体是`Page`， `PageHeader` `PageFooter` `PageAside` `PageNav` 划分页面 4 个核心区域

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
      presetAside
      presetNav
      header={<MockBlock title="页头" />}
      footer={<MockBlock title="页尾" />}
      nav={<MockBlock title="nav" />}
      aside={<MockBlock title="aside" />}
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
