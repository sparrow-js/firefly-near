---
title: 页面-workplace
order: 56
---

特殊布局

- grid 拆分除了 block 可以做，P 是否应该也可以做
- P > RGrid 必须加 width:100%, flex 布局问题

- TODO：
  - 谢莉莉 前面要加一个头像占位
  - Block 需要支持 Tab 切换 实现 https://mc.fusion.design/unpkg/@alifd/fusion-design-pro@0.1.34/build/index.html#/dashboard/workplace

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Breadcrumb,
  Avatar,
  Button,
  Balloon,
  Icon,
  Progress,
  Table,
  Tag,
  Calendar,
  Timeline,
  ResponsiveGrid as RGrid,
} from '@alifd/next';
import { Page, Block, BlockCell, P, PageHeader, PageFooter, Text } from '@alifd/pro-layout';

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
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>工作台</Breadcrumb.Item>
    </Breadcrumb>
    <P>
      {/* todo */}
      <RGrid style={{ width: '100%' }}>
        <RGrid.Cell colSpan={1}>
          <Avatar
            size="large"
            src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
          />
        </RGrid.Cell>
        <RGrid.Cell colSpan={8}>
          <P type="title">早上好, 潕量 !</P>
          <P type="body-1">美好的一天，从智能、创意、无缝的协作开始。我们将专注处理你专注的事情!</P>
        </RGrid.Cell>
        <RGrid.Cell colSpan={1}>
          <P>项目数</P>
          <P type="headline">56</P>
        </RGrid.Cell>
        <RGrid.Cell colSpan={1}>
          <P>团队内排名</P>
          <P type="headline" verAlign="baseline">
            <Text>8</Text>/<Text type="body-1">24</Text>
          </P>
        </RGrid.Cell>
        <RGrid.Cell colSpan={1}>
          <P>项目数</P>
          <P type="headline">56</P>
        </RGrid.Cell>
      </RGrid>
    </P>
  </>
);
const footer = (
  <>
    <Block.Divider />
    <br />
    <P type="caption" align="center">
      <Text style={{ textAlign: 'center' }}>
        Alibaba Fusion Design
        <br />
        Copyright © 2020 Fusion Team
      </Text>
    </P>
  </>
);
class App extends Component {
  render() {
    return (
      <Page
        presetHeader
        presetFooter
        header={header}
        footer={footer}
        style={{ border: '3px solid black', borderRadius: 12, overflow: 'scroll' }}
      >
        <Block childTotalColumns={12} mode="transparent">
          <BlockCell title="动态" colSpan={8} mode="procard">
            <P>
              <RGrid style={{ width: '100%' }}>
                <RGrid.Cell colSpan={1}>
                  <Avatar
                    size="large"
                    src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
                  />
                </RGrid.Cell>
                <RGrid.Cell colSpan={11}>
                  <P>
                    阮小五 在 <a href="">设计中台</a> 新建项目 <a href="">Fusion Design</a>
                    （「在」的间距丢了）
                  </P>
                  <P>4小时前</P>
                </RGrid.Cell>
              </RGrid>
            </P>
            <Block.Divider />
            <P>
              <RGrid style={{ width: '100%' }}>
                <RGrid.Cell colSpan={1}>
                  <Avatar
                    size="large"
                    src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
                  />
                </RGrid.Cell>
                <RGrid.Cell colSpan={11}>
                  <P>
                    阮小五 将 <a href="">新版本迭代</a> 更新为已发布（lastchild 间距问题）
                  </P>
                  <P>4小时前</P>
                </RGrid.Cell>
              </RGrid>
            </P>
          </BlockCell>
          <BlockCell title="我的日程" colSpan={4} mode="procard">
            <Calendar shape="panel" />
            <P>
              共 <Text style={{ color: 'blue' }}> 2 </Text> 个日程
            </P>
            <Timeline>
              {timeLineList.map((item) => (
                <Timeline.Item
                  key={item.planTime}
                  title={item.planName}
                  content={item.planAddress}
                  timeLeft={
                    <>
                      <div>{item.planTime}</div>
                      <div>{item.planDuaring}</div>
                    </>
                  }
                />
              ))}
            </Timeline>
          </BlockCell>
          <BlockCell title="进行中的项目" colSpan={8} mode="procard">
            <Table
              dataSource={orderList}
              hasBorder={false}
              rowSelection={{
                getProps: (record, index) => ({
                  children: (
                    <span key={index} className="next-table-cell-wrapper">
                      {record.name}
                    </span>
                  ),
                }),
                columnProps: () => ({
                  width: 330,
                }),
                titleAddons: () => <span className="next-table-cell-wrapper">任务名称</span>,
              }}
            >
              <Table.Column title="所属阶段" dataIndex="state" width={230} />
              <Table.Column title="优先级" dataIndex="level" cell={renderLevel} width={150} />
            </Table>
          </BlockCell>
        </Block>
      </Page>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
