---
title: 页面-form
order: 52
---

表单

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Table,
  Pagination,
  Icon,
  Breadcrumb,
  ResponsiveGrid as RGrid,
  Select,
  Input,
  DatePicker,
  Step,
} from '@alifd/next';
import { Page, Block, PageHeader, P, Text } from '@alifd/pro-layout';

const header = (
  <>
    <Breadcrumb>
      <Breadcrumb.Item>表单页</Breadcrumb.Item>
      <Breadcrumb.Item>表单布局</Breadcrumb.Item>
    </Breadcrumb>
    <P align="baseline">
      <Text type="title">表单布局</Text>
      <Text type="body-1">Form Layout</Text>
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
        style={{
          border: '3px solid black',
          borderRadius: 12,
          overflow: 'scroll',
        }}
      >
        <Block title="标签在上">
          <RGrid gap={16}>
            <RGrid.Cell colSpan={3}>
              <P>单据号</P>
              <P>
                <Select showSearch style={{ width: '100%' }} placeholder="输入内容进行搜索" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={3}>
              <P>选择业务类型</P>
              <P>
                <Select style={{ width: '100%' }} placeholder="选择业务类型" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={3}>
              <P>收款方</P>
              <P>
                <Input style={{ width: '100%' }} state="error" />
              </P>
              <P style={{ color: 'red' }}>收款方是必填信息</P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={3}>
              <P>收票状态</P>
              <P>
                <Input style={{ width: '100%' }} placeholder="输入内容" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P>单据状态</P>
              <P>
                <Select style={{ width: '100%' }} placeholder="选择业务类型" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P>单据备注</P>
              <P>
                <Input style={{ width: '100%' }} placeholder="输入内容" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P>提交时间:</P>
              <P>
                <DatePicker.RangePicker />
              </P>
            </RGrid.Cell>
          </RGrid>
          <P align="space-between">
            <P.Cell>
              <Button type="primary">查询</Button>
              <Button>导出</Button>
            </P.Cell>
            <P.Cell>
              <Button text>
                展开 <Icon type="arrow-down" />
              </Button>
            </P.Cell>
          </P>
        </Block>
        <Block title="标签在左侧">
          <RGrid gap={16}>
            <RGrid.Cell colSpan={3}>
              <P verAlign="center">
                <Text style={{ width: 100 }}>单据号</Text>
                <Select showSearch style={{ width: '100%' }} placeholder="输入内容进行搜索" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={3}>
              <P verAlign="center">
                <Text style={{ width: 100 }}>选择业务类型</Text>
                <Select showSearch style={{ width: '100%' }} placeholder="选择业务类型" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={3}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ display: 'inline-block' }}>
                  <P verAlign="center">收款方(对齐)</P>
                </div>
                <div>
                  <P verAlign="center">
                    <Input style={{ width: '100%' }} state="error" />
                  </P>
                  <P style={{ color: 'red' }}>收款方是必填信息</P>
                </div>
              </div>
            </RGrid.Cell>
            <RGrid.Cell colSpan={3}>
              <P verAlign="center">
                <Text style={{ width: 100 }}>收票状态</Text>
                <Input style={{ width: '100%' }} placeholder="输入内容" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P verAlign="center">
                <Text style={{ width: 100 }}>单据状态</Text>
                <Select style={{ width: '100%' }} placeholder="选择业务类型" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P verAlign="center">
                <Text style={{ width: 100 }}>单据备注</Text>
                <Input style={{ width: '100%' }} placeholder="输入内容" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P verAlign="center">
                <Text style={{ width: 100 }}>提交时间</Text>
                <DatePicker.RangePicker />
              </P>
            </RGrid.Cell>
          </RGrid>
          <P align="space-between">
            <P.Cell>
              <Button type="primary">查询</Button>
              <Button>导出</Button>
            </P.Cell>
            <P.Cell>
              <Button text>
                展开 <Icon type="arrow-down" />
              </Button>
            </P.Cell>
          </P>
        </Block>
        <Block title="分步表单">
          <Step shape="circle" labelPlacement="hoz">
            <Step.Item title="填写转账信息"></Step.Item>
            <Step.Item title="确认转账信息"></Step.Item>
            <Step.Item title="完成"></Step.Item>
          </Step>
          <div style={{ width: 600, margin: '0 auto' }}>
            <P verAlign="center">
              <Text style={{ width: 100, textAlign: 'right' }}>付款账户:</Text>
              <Select style={{ flexGrow: 1 }} placeholder="选择付款账户" defaultValue="frankqian" />
            </P>
            <P verAlign="center">
              <Text style={{ width: 100, textAlign: 'right' }}>收款账户:</Text>
              <Input style={{ flexGrow: 1 }} placeholder="选择付款账户" />
            </P>
            <P verAlign="center">
              <Text style={{ width: 100, textAlign: 'right' }}>收款人姓名:</Text>
              <Input style={{ flexGrow: 1 }} placeholder="收款人姓名" defaultValue="frankqian" />
            </P>
            <P verAlign="center">
              <Text style={{ width: 100, textAlign: 'right' }}>转账金额:</Text>
              <Input placeholder="转账金额" innerBefore="￥" defaultValue="500" />
            </P>
            <P>
              <Text style={{ width: 100, textAlign: 'right' }}></Text>
              <Button type="primary">下一步</Button>
            </P>
          </div>
        </Block>
      </Page>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
