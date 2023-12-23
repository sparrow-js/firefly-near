---
title: 区块
order: 10
---

区块的样子

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Button, Balloon, Icon, Progress, ResponsiveGrid as RGrid } from '@alifd/next';
import { Page, Block, Column, P } from '@alifd/pro-layout';

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
              <P type="headline">区块基础</P>
            </>
          }
        >
          <Block
            childTotalColumns={12}
            title="RowTitle: Block mode=transparent / BlockCell mode=transparent"
            mode="transparent"
          >
            <Block.Cell colSpan={4} title="Column Title">
              <MockBlock />
            </Block.Cell>
            <Block.Cell colSpan={4} title="Column Title">
              <MockBlock />
            </Block.Cell>
            <Block.Cell colSpan={4} title="Column Title">
              <MockBlock />
            </Block.Cell>
          </Block>
          <Block
            childTotalColumns={12}
            title="RowTitle: Block mode=transparent / BlockCell mode=procard"
            mode="transparent"
          >
            <Block.Cell colSpan={4} title="Column Title" mode="procard">
              <MockBlock />
            </Block.Cell>
            <Block.Cell colSpan={4} title="Column Title" mode="procard">
              <MockBlock />
            </Block.Cell>
            <Block.Cell colSpan={4} title="Column Title" mode="procard">
              <MockBlock />
            </Block.Cell>
          </Block>

          <Block childTotalColumns={12} title="RowTitle mode=transparent" mode="transparent">
            <Block.Cell colSpan={12} title="Column Title">
              <MockBlock />
            </Block.Cell>
          </Block>
          <Block childTotalColumns={12} title="RowTitle mode=card" mode="card">
            <Block.Cell colSpan={12} title="Column Title">
              <MockBlock />
            </Block.Cell>
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
