---
title: 区块-分列
order: 11
---

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Breadcrumb,
  Box,
  Button,
  Balloon,
  Icon,
  Progress,
  ResponsiveGrid as RGrid,
} from '@alifd/next';
import {
  Page,
  Block,
  BlockCell,
  P,
  PageContent,
  PageAside,
  PageNav,
  PageHeader,
  PageFooter,
} from '@alifd/pro-layout';

const MockBlock = (props) => {
  return (
    <div className="mock-block-fullx60" {...props}>
      100% x 60
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="mock-body">
        <Page
          presetHeader
          header={
            <>
              <P>
                <Breadcrumb>
                  <Breadcrumb.Item>自然布局</Breadcrumb.Item>
                  <Breadcrumb.Item>区块</Breadcrumb.Item>
                </Breadcrumb>
              </P>
              <P type="headline">区块分列</P>
            </>
          }
        >
          <Block title="总长12，每一个子元素占地4" childTotalColumns={12} mode="transparent">
            <BlockCell colSpan={4} mode="procard">
              <MockBlock />
            </BlockCell>
            <BlockCell colSpan={4} mode="procard">
              <MockBlock />
            </BlockCell>
            <BlockCell colSpan={4} mode="procard">
              <MockBlock />
            </BlockCell>
            <BlockCell colSpan={4} mode="procard">
              <MockBlock />
            </BlockCell>
          </Block>
        </Page>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.mock-block-fullx60 {
  width: 100%;
  height: 60px;
  background: #ddd;
  border: 1px dashed #333;
}
.mock-body {
  min-height: 350px;
  width: 100%;
  border: 1px solid #ddd;
}
```
