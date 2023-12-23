---
title: 基础-分页
order: 1
---

`PageContent` 以及 `isTab` 属性，构成了分页的能力。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Page,
  PageContent,
  PageHeader,
  PageFooter,
  Block,
  BlockCell,
  P,
  Text,
} from '@alifd/pro-layout';

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
      isTab
      minHeight="100vh"
      presetHeader
      presetFooter
      // 默认设置打开哪一个
      tabProps={{ defaultActiveKey: 'cc' }}
      header={<MockBlock title="页头" />}
      footer={<MockBlock title="页尾" />}
    >
      <PageContent isTab title="分页1" key="aa">
        <MockBlock title="分页内容1" />
      </PageContent>
      <PageContent isTab noPadding title="分页2(noPadding)" key="bb">
        <MockBlock title="分页内容2 with noPadding" />
      </PageContent>
      <PageContent isTab title="分页3" key="cc">
        <MockBlock title="分页内容3" />
      </PageContent>
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
