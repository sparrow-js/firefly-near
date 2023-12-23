---
title: 页面-center
order: 51
---

居中对齐 demo

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Button, Table } from '@alifd/next';
import { Page, Block, PageHeader, BlockCell, PageFooter, P, Text } from '@alifd/pro-layout';

const dataSourceGen = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
      id: 100306660940 + i,
      time: 2000 + i,
    });
  }
  return result;
};
const header = (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>自动布局</Breadcrumb.Item>
    </Breadcrumb>
    <P verAlign="baseline" textSpacing>
      <Text type="title">自动布局</Text>
      <Text type="body-1">页面自动布局能力</Text>
    </P>
    <P type="body-1">这是一个自动布局的描述信息</P>
  </div>
);
class App extends Component {
  render() {
    return (
      <div className="mock-body">
        <Page presetHeader header={header} contentAlignCenter minHeight="100vh">
          <Block title="发布概览" mode="transparent">
            <BlockCell mode="procard">
              <Table dataSource={dataSourceGen()}>
                <Table.Column title="Id" htmlTitle="Unique Id" dataIndex="id" />
                <Table.Column title="Title" dataIndex="title.name" />
                <Table.Column title="Time" dataIndex="time" />
              </Table>
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
.mock-body {
  min-height: 350px;
  width: 100%;
  border: 1px solid #ddd;
}
```
