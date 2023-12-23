---
title: 页面-table
order: 55
---

P 包裹 Table 有问题怎么解？

- Table 需要加 100%
- 锁列模式失效（width:auto) 不能增加 100%
- Table 外面是不是就不适合放 P ？

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Table, Pagination, Icon, Breadcrumb } from '@alifd/next';
import { Page, PageHeader, Block, P, Text } from '@alifd/pro-layout';

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
const cellRender = (value, index, record) => {
  return (
    <P type="caption">
      <Button type="primary" text>
        删除
      </Button>
      <Button type="primary" text>
        编辑
      </Button>
    </P>
  );
};

const columns = new Array(4).fill({
  dataIndex: 'data',
  title: 'Data',
  width: 200,
});
columns.unshift({
  dataIndex: 'id',
  title: 'Id',
  width: 100,
  lock: 'left',
});
columns.push({
  dataIndex: 'state',
  title: 'State',
  width: 200,
});
columns.push({
  title: 'Action',
  width: 100,
  align: 'center',
  cell: () => <Button>delete</Button>,
  lock: 'right',
});

const dataSource = [
  {
    id: 30000,
    data: '$13.02',
    state: 'normal',
  },
  {
    id: 30001,
    data: '$16.02',
    state: 'normal',
  },
  {
    id: 30002,
    data: '$63.0002',
    state: 'error',
  },
];

const orderList = [
  {
    id: 1,
    name: '蓝瓶咖啡线下体验店室内设计1',
    state: '进行中',
    level: 'high',
  },
  {
    id: 2,
    name: '双12投放 Banner',
    state: '进行中',
    level: 'high',
  },
  {
    id: 3,
    name: 'Global 大促活动',
    state: '进行中',
    level: 'high',
  },
  {
    id: 4,
    name: 'Banner 拓展',
    state: '进行中',
    level: 'middle',
  },
  {
    id: 5,
    name: '类目市场宣传设计',
    state: '待处理',
    level: 'low',
  },
  {
    id: 6,
    name: '类目市场宣传设计',
    state: '待处理',
    level: 'low',
  },
  {
    id: 7,
    name: '类目市场宣传设计',
    state: '待处理',
    level: 'low',
  },
];
const timeLineList = [
  {
    planName: '财经周会',
    planAddress: '深圳 T4-4-1；杭州 7-4-9-N',
    planTime: '09:00',
    planDuaring: '2小时',
  },
  {
    planName: '财经周会',
    planAddress: '深圳 T4-4-1；杭州 7-4-9-N',
    planTime: '11:00',
    planDuaring: '2小时',
  },
];
const colorMap = {
  high: 'red',
  middle: 'yellow',
  low: 'green',
};
const renderLevel = (text, index) => (
  <span key={text + index.toString()}>
    <Tag size="small" color={colorMap[text]}>
      {text}
    </Tag>
  </span>
);

const header = (
  <>
    <Breadcrumb>
      <Breadcrumb.Item>列表页</Breadcrumb.Item>
      <Breadcrumb.Item>查询表格</Breadcrumb.Item>
    </Breadcrumb>
    <P align="baseline" textSpacing>
      <Text type="title">组件间距</Text>
      <Text type="body-1">Component Spacing</Text>
    </P>
    <P>描述组件之间的间距关系</P>
  </>
);
class App extends Component {
  render() {
    return (
      <Page
        presetHeader
        header={header}
        style={{ border: '3px solid black', borderRadius: 12, overflow: 'scroll' }}
      >
        <Block>
          <P align="space-between">
            <P.Cell>
              <Text>Auto Spacing</Text>
              <Button type="primary">批量提交</Button>
              <Button>批量删除</Button>
              <Button>批量下载</Button>
              <Icon type="help" size="small" />
              <Text>帮助信息</Text>
            </P.Cell>
            <P.Cell align="flex-end">
              <Icon size="small" type="set" />
              <Icon size="small" type="filter" />
              <Icon size="small" type="arrow-down" />
            </P.Cell>
          </P>
          <P>
            <Table dataSource={dataSourceGen()} rowSelection={{}} style={{ width: '100%' }}>
              <Table.Column title="Id" htmlTitle="Unique Id" dataIndex="id" />
              <Table.Column title="Title" dataIndex="title.name" />
              <Table.Column title="Time" dataIndex="time" />
              <Table.Column title="Operation" cell={cellRender} />
            </Table>
          </P>
          <P align="flex-end">
            <Pagination />
          </P>
        </Block>
      </Page>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
