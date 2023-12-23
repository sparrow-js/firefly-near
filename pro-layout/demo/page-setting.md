---
title: 页面-setting
order: 54
---

Tab 的边距问题

- 下划线要顶边，tab 要有 padding

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Breadcrumb,
  Tab,
  Button,
  Balloon,
  Icon,
  Progress,
  Table,
  Tag,
  Calendar,
  Timeline,
  Avatar,
  ResponsiveGrid as RGrid,
  Box,
  Select,
  Input,
  MenuButton,
} from '@alifd/next';
import {
  Page,
  Block,
  BlockCell,
  PageHeader,
  PageFooter,
  PageContent,
  P,
  Row,
  Col,
  Text,
} from '@alifd/pro-layout';

const list = [
  {
    id: 'wuliang',
    name: '潕量',
    avatar: 'https://i.pravatar.cc/80',
    role: 1,
  },
  { id: 'lianmin', name: '联民', avatar: 'https://i.pravatar.cc/80' },
  { id: 'jiexu', name: '皆虚', avatar: 'https://i.pravatar.cc/80' },
  { id: 'jinli', name: '瑾鲤', avatar: 'https://i.pravatar.cc/80' },
  { id: 'jinchan', name: '金禅', avatar: 'https://i.pravatar.cc/80' },
  { id: 'youlu', name: '游鹿', avatar: 'https://i.pravatar.cc/80' },
  {
    id: 'muchen',
    name: '暮郴',
    avatar: 'https://i.pravatar.cc/80',
  },
];
const headerRender = (value, index, item) => {
  return (
    <div>
      <img
        alt="pic"
        src={
          item.avatar && item.avatar.length > 0
            ? item.avatar
            : '//img.alicdn.com/tps/TB1kssgNXXXXXc_aXXXXXXXXXXX-56-56.png'
        }
        style={{
          width: 28,
          height: 28,
          verticalAlign: 'middle',
          borderRadius: '50%',
          marginRight: 10,
        }}
      />{' '}
      {item.name}
    </div>
  );
};

const roleRender = (value, index, record) => {
  return record.role === 1 ? '管理员' : '成员';
};

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

const tabContentHome = (
  <>
    <Block mode="transparent" childTotalColumns={12}>
      <BlockCell colSpan={4} mode="procard">
        <P align="center">
          <Avatar
            size={96}
            src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
          />
        </P>
        <P align="center">
          <Tag size="small" color="#d66620">
            语雀会员
          </Tag>
        </P>
        <P align="center">
          <Button style={{ width: 200 }}>编辑资料</Button>
        </P>
        <RGrid>
          <RGrid.Cell colSpan={5}>
            <P align="center">关注了</P>
            <P type="headline" align="center">
              2
            </P>
          </RGrid.Cell>
          <RGrid.Cell colSpan={2}>
            <Box align="center" justify="center" style={{ height: '100%' }}>
              <Block.Divider direction="ver" style={{ height: 40 }} />
            </Box>
          </RGrid.Cell>
          <RGrid.Cell colSpan={5}>
            <P align="center">关注者</P>
            <P align="center" type="headline">
              8
            </P>
          </RGrid.Cell>
        </RGrid>
        <Block.Divider />
        <Box margin={8}>
          <P flex>
            <Icon type="attachment" size="small" />
            <Text>浙江-杭州-西溪园区</Text>
          </P>
          <P flex>
            <Icon type="toggle-right" size="small" />
            <Text>
              阿里集团-CTO线-新零售技术事业群-业务平台事业部-体验技术-设计中台研发中心-Fusion&中后台
            </Text>
          </P>
          <P flex>
            <Icon type="atm" size="small" />
            <Text>前端专家</Text>
          </P>
        </Box>

        <Block.Divider />
        <Box margin={8}>
          <P>团队</P>
          <RGrid columns={12}>
            <RGrid.Cell colSpan={4}>
              <P align="center">
                <Avatar src="https://zos.alipayobjects.com/skylark/d10c0fee-c569-450a-a64a-862c3c1a8fcb/avatar/634db6ab22662a7f/Fusion-logo.png" />
              </P>
              <P style={{ textAlign: 'center' }} type="caption">
                Fusion Design System
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P align="center">
                <Avatar src="https://img.alicdn.com/tfscom/TB1EQXdOpXXXXXdaXXXXXXXXXXX" />
              </P>
              <P align="center" style={{ textAlign: 'center' }} type="caption">
                Fusion Cool
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P align="center">
                <Avatar src="https://cdn.nlark.com/lark/0/2020/png/8888/1580965770247-avatar/b5b897d5-ddd9-4b2f-98f7-f7f0f05763e6.png" />
              </P>
              <P style={{ textAlign: 'center' }} type="caption">
                业务平台事业部 <Icon type="lock" size="xs" />
              </P>
            </RGrid.Cell>
            <RGrid.Cell colSpan={4}>
              <P align="center">
                <Avatar src="https://gw.alipayobjects.com/zos/skylark/35f923b6-d51c-4f75-96a9-f06a1d2f3f26/2018/png/avatar/f8def2bb-26dc-404b-932c-24e9cd98fb17.png" />
              </P>
              <P style={{ textAlign: 'center' }} type="caption">
                Lazada vayager <Icon type="lock" size="xs" />
              </P>
            </RGrid.Cell>
          </RGrid>
        </Box>
      </BlockCell>
      <BlockCell colSpan={8} mode="procard">
        <Tab>
          <Tab.Item title="知识库">
            <P align="space-between">
              <Input
                placeholder="搜索知识库(marginTop值问题)"
                innerBefore={<Icon type="search" style={{ marginLeft: 8 }} />}
              />
              <MenuButton text label="类型" popupProps={{ align: 'br' }}>
                <MenuButton.Item>全部</MenuButton.Item>
                <MenuButton.Item>文档</MenuButton.Item>
                <MenuButton.Item>资源</MenuButton.Item>
              </MenuButton>
            </P>
            <Block.Divider />
            <Row>
              <Col colWidth={100}>
                <Avatar src="https://img.alicdn.com/tfs/TB1ZnevdmslXu8jSZFuXXXg7FXa-70-70.png" />
              </Col>
              <Col>
                <P type="body-2">工作文档 (不对齐)</P>
                <P type="caption">今天 10:38</P>
              </Col>
            </Row>
            <Block.Divider />
            <Row>
              <Col colWidth={100}>
                <Avatar src="https://img.alicdn.com/tfs/TB1ZnevdmslXu8jSZFuXXXg7FXa-70-70.png" />
              </Col>
              <Col>
                <P type="body-2">
                  <Text>个人日常项目管理</Text> <Icon size="xs" type="lock" />
                </P>
                <P>本月个人对接项目的进度管理</P>
                <P type="caption">07-13 11:32</P>
              </Col>
            </Row>
            <Block.Divider />
          </Tab.Item>
          <Tab.Item title="关注了"></Tab.Item>
          <Tab.Item title="关注者"></Tab.Item>
        </Tab>
      </BlockCell>
    </Block>
  </>
);

const tabContentTheme = (
  <Block mode="transparent" childTotalColumns={12}>
    <BlockCell colSpan={4} mode="procard">
      <P type="body-2" verAlign="center" align="space-between">
        <P.Cell>
          <Text>Fusion Origin</Text>{' '}
          <Button text type="primary">
            修改>
          </Button>
        </P.Cell>
        <P.Cell align="flex-end">
          <Icon type="ashbin" size="xs" />
        </P.Cell>
      </P>
      <P type="caption">阿里橙，经典的橙色主题，适用于阿里内外、淘宝等品牌站点</P>
      <P type="caption">语言: zh-cn</P>
      <P type="caption">主题包名: @alife/theme-orange</P>
      <P type="caption">当前版本: 1.1.2</P>
      <P>
        <Button type="primary">配置主题</Button>
        <Button type="secondary">发布与历史</Button>
      </P>
    </BlockCell>
    <BlockCell colSpan={4} mode="procard">
      <P type="body-2" verAlign="center" align="space-between">
        <P.Cell>
          <Text>Fusion Blue</Text>
          <Tag type="primary" size="small">
            默认主题
          </Tag> <Button text type="primary">
            修改>
          </Button>
        </P.Cell>
        <P.Cell align="flex-end">
          <Icon type="ashbin" size="xs" />
        </P.Cell>
      </P>
      <P type="caption">极客蓝，中后台系统通用主题</P>
      <P type="caption">语言: zh-cn</P>
      <P type="caption">主题包名: @alife/theme-blue</P>
      <P type="caption">当前版本: 1.1.2</P>
      <P>
        <Button type="primary">配置主题</Button>
        <Button type="secondary">发布与历史</Button>
      </P>
    </BlockCell>
    <BlockCell colSpan={4} mode="procard">
      <P type="body-2" verAlign="center" align="space-between">
        <P.Cell>
          <Text>Fusion Purple</Text>
          <Tag type="primary" size="small">
            默认主题
          </Tag> <Button text type="primary">
            修改>
          </Button>
        </P.Cell>
        <P.Cell align="flex-end">
          <Icon type="ashbin" size="xs" />
        </P.Cell>
      </P>
      <P type="caption">菖蒲紫</P>
      <P type="caption">语言: zh-cn</P>
      <P type="caption">主题包名: @alife/theme-blue</P>
      <P type="caption">当前版本: 1.1.2</P>
      <P>
        <Button type="primary">配置主题</Button>
        <Button type="secondary">发布与历史</Button>
      </P>
    </BlockCell>
    <BlockCell colSpan={4} mode="procard">
      <P type="body-2" verAlign="center" align="space-between">
        <P.Cell>
          <Text>Fusion Green</Text>
          <Tag type="primary" size="small">
            默认主题
          </Tag> <Button text type="primary">
            修改>
          </Button>
        </P.Cell>
        <P.Cell align="flex-end">
          <Icon type="ashbin" size="xs" />
        </P.Cell>
      </P>
      <P type="caption">松石绿</P>
      <P type="caption">语言: zh-cn</P>
      <P type="caption">主题包名: @alife/theme-blue</P>
      <P type="caption">当前版本: 1.1.2</P>
      <P>
        <Button type="primary">配置主题</Button>
        <Button type="secondary">发布与历史</Button>
      </P>
    </BlockCell>
  </Block>
);

const tabContentAuth = (
  <>
    <Block title="添加成员">
      <P>
        <Select
          mode="multiple"
          showSearch
          placeholder="请输入 花名、 工号 等进行搜索"
          style={{ width: 400 }}
        ></Select>
      </P>
      <P>
        <Button type="primary">请选择操作</Button>
      </P>
    </Block>
    <Block
      title={
        <P verAlign="center">
          <Text>团队成员</Text>
          <Tag size="small" type="primary">
            {list.length}
          </Tag>
        </P>
      }
    >
      <Table dataSource={list} hasHeader={false} hasBorder={false}>
        <Table.Column cell={headerRender} />
        <Table.Column dataIndex="id" cell={roleRender} />
      </Table>
    </Block>
  </>
);

class App extends Component {
  render() {
    const header = (
      <Block mode="transparent">
        <Breadcrumb>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
          <Breadcrumb.Item>设置</Breadcrumb.Item>
        </Breadcrumb>
        <P>
          <RGrid style={{ width: '100%' }}>
            <RGrid.Cell colSpan={1}>
              <Avatar
                size="large"
                src="https://img.alicdn.com/tfs/TB1XdnvvUY1gK0jSZFCXXcwqXXa-500-500.png"
              />
            </RGrid.Cell>
            <RGrid.Cell colSpan={8}>
              <P type="title">谢莉莉</P>
              <P type="body-1">xielili@aliwork-inc.com</P>
            </RGrid.Cell>
          </RGrid>
        </P>
      </Block>
    );

    return (
      <Page
        isTab
        presetHeader
        presetFooter
        header={header}
        footer={footer}
        style={{ border: '3px solid black', borderRadius: 12, overflow: 'scroll' }}
      >
        <PageContent isTab title="知识库">
          {tabContentHome}
        </PageContent>
        <PageContent isTab title="主题管理">
          {tabContentTheme}
        </PageContent>
        <PageContent isTab title="权限设置">
          {tabContentAuth}
        </PageContent>
      </Page>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
