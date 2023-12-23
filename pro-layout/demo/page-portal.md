---
title: 页面-portal
order: 53
---

常见中后台 Portal 页

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Breadcrumb,
  Button,
  Divider,
  Balloon,
  Icon,
  Progress,
  ResponsiveGrid as RGrid,
} from '@alifd/next';
import { Page, PageHeader, PageFooter, Block, BlockCell, P, Text } from '@alifd/pro-layout';

const header = (
  <>
    <Breadcrumb>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>自动布局</Breadcrumb.Item>
    </Breadcrumb>
    <P verAlign="baseline" textSpacing>
      <Text type="title">自动布局</Text>
      <Text type="body-1">页面自动布局能力</Text>
    </P>
    <P type="body-1">这是一个自动布局的描述信息</P>
  </>
);
const footer = (
  <Block childTotalColumns={12} mode="transparent">
    <BlockCell colSpan={12}>
      <P type="headline" align="center">
        相关链接
      </P>
    </BlockCell>
    <BlockCell colSpan={3}>
      <P type="subhead" align="center">
        官方物料
      </P>
      <P align="center">PC 组件库地址</P>
      <P align="center">Mobile 组件库地址</P>
      <P align="center">官方区块</P>
      <P align="center">官方模板</P>
    </BlockCell>
    <BlockCell colSpan={3}>
      <P align="center" type="subhead">
        帮助中心
      </P>
      <P align="center">Fusion 帮助中心</P>
      <P align="center" style={{ textAlign: 'center' }}>
        您可以通过扫描二维码的方式加入 Fusion钉钉的问题反馈群
      </P>
      <P align="center">
        <img src="https://img.alicdn.com/tfs/TB102cEdLb2gK0jSZK9XXaEgFXa-660-666.png" width="170" />
      </P>
    </BlockCell>
    <BlockCell colSpan={3}>
      <P align="center" type="subhead">
        开发者社区
      </P>
      <P align="center">
        <a href="https://github.com/alibaba-fusion/next">进入 Github</a>
      </P>
    </BlockCell>
    <BlockCell colSpan={3}>
      <P align="center" type="subhead">
        相关资源
      </P>
      <P align="center">
        <a href="https://fusion.design/tool">FusionCool</a>
      </P>
      <P align="center">
        <a href="https://fusion.design/tool">Iceworks</a>
      </P>
    </BlockCell>
    <BlockCell colSpan={12}>
      <Divider />
      <P align="center" type="caption" style={{ textAlign: 'center' }}>
        <Text>
          Alibaba Fusion Design
          <br />
          Copyright © 2020 Fusion Team
        </Text>
      </P>
    </BlockCell>
    {/*
          <BlockCell background="transparent">
            <RGrid >
              <RGrid.Cell colSpan={3}>
                <P type="subhead" align="center">官方物料</P>
                <P align="center">PC 组件库地址</P>
                <P align="center">Mobile 组件库地址</P>
                <P align="center">官方区块</P>
                <P align="center">官方模板</P>
              </RGrid.Cell>
              <RGrid.Cell colSpan={3}>
                <P align="center" type="subhead" >帮助中心</P>
                <P align="center">Fusion 帮助中心</P>
                <P align="center" style={{textAlign: 'center'}}>您可以通过扫描二维码的方式加入 Fusion钉钉的问题反馈群</P>
                <P align="center">
                  <img src="https://img.alicdn.com/tfs/TB102cEdLb2gK0jSZK9XXaEgFXa-660-666.png" width="170"/>
                </P>
              </RGrid.Cell>
              <RGrid.Cell colSpan={3}>
                <P align="center" type="subhead" >开发者社区</P>
                <P align="center"><a href="https://github.com/alibaba-fusion/next">进入 Github</a></P>
              </RGrid.Cell>
              <RGrid.Cell colSpan={3}>
                <P align="center" type="subhead" >相关资源</P>
                <P align="center"><a href="https://fusion.design/tool">FusionCool</a></P>
                <P align="center"><a href="https://fusion.design/tool">Iceworks</a></P>
              </RGrid.Cell>
            </RGrid>
            <P align="center" type="caption" >
              <Text style={{textAlign: 'center'}}>Alibaba Fusion Design<br/>Copyright © 2020 Fusion Team</Text>
            </P>
          </BlockCell>
          */}
  </Block>
);
class App extends Component {
  render() {
    return (
      <div className="mock-body">
        <Page presetHeader presetFooter header={header} footer={footer}>
          <Block childTotalColumns={12} mode="transparent">
            <BlockCell colSpan={3} mode="procard">
              <P type="body-1" align="space-between">
                <P.Cell>总销售额</P.Cell>
                <P.Cell align="flex-end">
                  <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                    指标说明
                  </Balloon>
                </P.Cell>
              </P>
              <P type="headline">¥ 126,560</P>
              <P>
                <img
                  src="https://img.alicdn.com/tfs/TB1eWP1O4D1gK0jSZFsXXbldVXa-468-78.png"
                  width="100%"
                  height="32"
                />
              </P>
              <Block.Divider />
              <P type="body-1">日销售额 ￥12,423</P>
            </BlockCell>
            <BlockCell colSpan={3} mode="procard">
              <P type="body-1" align="space-between">
                <P.Cell>访问量</P.Cell>
                <P.Cell align="flex-end">
                  <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                    指标说明
                  </Balloon>
                </P.Cell>
              </P>
              <P type="headline">88,356</P>
              <P>
                <img
                  src="https://img.alicdn.com/tfs/TB1FJbkdCR26e4jSZFEXXbwuXXa-468-68.png"
                  width="100%"
                  height="32"
                />
              </P>
              <Block.Divider />
              <P type="body-1">日访问量 1,234</P>
            </BlockCell>
            <BlockCell colSpan={3} mode="procard">
              <P type="body-1" align="space-between">
                <P.Cell>门店量</P.Cell>
                <P.Cell align="flex-end">
                  <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                    指标说明
                  </Balloon>
                </P.Cell>
              </P>
              <P type="headline">6,356</P>
              <P>
                <img
                  src="https://img.alicdn.com/tfs/TB1eWP1O4D1gK0jSZFsXXbldVXa-468-78.png"
                  width="100%"
                  height="32"
                />
              </P>
              <Block.Divider />
              <P type="body-1">转化率 60%</P>
            </BlockCell>
            <BlockCell colSpan={3} mode="procard">
              <P type="body-1" align="space-between">
                <P.Cell>门店活动效果</P.Cell>
                <P.Cell align="flex-end">
                  <Balloon closable={false} trigger={<Icon type="prompt" size="small" />}>
                    指标说明
                  </Balloon>
                </P.Cell>
              </P>
              <P type="headline">78%</P>
              <P>
                <Progress percent={30} textRender={() => ''} style={{ height: 32 }} />
              </P>
              <Block.Divider />
              <P type="body-1">
                <P.Cell style={{ flexGrow: 1 }}>
                  周同比 12% <Text style={{ color: 'red' }}>▲</Text>
                </P.Cell>
                <P.Cell style={{ flexGrow: 1 }}>
                  日同比11% <Text style={{ color: 'green' }}>▼</Text>
                </P.Cell>
              </P>
            </BlockCell>
            <BlockCell title="活动实时情况" colSpan={9} rowSpan={2} mode="procard">
              <RGrid>
                <RGrid.Cell colSpan={3}>
                  <P style={{ width: '100%' }}>今日交易总额</P>
                  <P style={{ width: '100%' }} verAlign="baseline">
                    <Text type="headline">124,543,233</Text>
                    <Text type="body-1">元</Text>
                  </P>
                </RGrid.Cell>
                <RGrid.Cell colSpan={3}>
                  <P style={{ width: '100%' }}>销售目标完成率</P>
                  <P style={{ width: '100%' }} type="headline">
                    92%
                  </P>
                </RGrid.Cell>
                <RGrid.Cell colSpan={3}>
                  <P style={{ width: '100%' }}>活动剩余时间</P>
                  <P style={{ width: '100%' }} type="headline">
                    47:05:07:495
                  </P>
                </RGrid.Cell>
                <RGrid.Cell colSpan={3}>
                  <P style={{ width: '100%' }}>每秒交易总额</P>
                  <P style={{ width: '100%' }} type="headline" verAlign="baseline">
                    234 <Text type="body-1">元</Text>
                  </P>
                </RGrid.Cell>
              </RGrid>
              <P>
                <img src="https://s2.ax1x.com/2020/02/17/3iKU5q.png" width="100%" />
              </P>
            </BlockCell>
            <BlockCell colSpan={3} title="销售额类别占比" mode="procard">
              <div> 占位图 </div>
            </BlockCell>
            <BlockCell colSpan={3} title="销售额类别占比" mode="procard">
              <div> 占位图 </div>
            </BlockCell>
            <BlockCell colSpan={4} title="销售额类别占比" mode="procard">
              <div style={{ height: 200 }}> 占位图 </div>
            </BlockCell>
            <BlockCell colSpan={8} title="消费数据" mode="procard">
              {' '}
              <div style={{ height: 200 }}> 占位图 </div>{' '}
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
