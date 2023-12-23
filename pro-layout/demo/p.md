---
title: 段落布局
order: 32
---

P 既可以是一个行内元素的容器，理解为是段落，内部元素之间没有间距；也可以是一个块状元素的容器，内部元素之间有间距；

- 当 P 的子元素如果都是 P.Cell，那么它是一个块状元素的容器, P.Cell 之间有间距；
- 当 P 的子元素如果既有 P.Cell 又有其他元素（Button，Text，文本），那么它是一个块状元素的容器，其他元素与 P.Cell 之间有间距；
- 当 P 下如果直接摆放 Text，Button，文本等元素组件，那么他们之间是有间距的，需要注意：
  - 如果是`<P><Text /><Text /><Button>abc</P>` 那么第一个 Text、第二个 Text 之间没有间距，第二个 Text、Button、abc 之间有间距的；
  - 如果是`<P>{name}{grade}{scroe}</P>` ，并且这三个变量都是字符串，那么这三个变量之间没有间距；
  - 如果是`<P>{name}{grade}{scroe}</P>` ，并且这三个变量是字符串、字符串、Button 组件，那么两个字符串之间没有间距，与 Button 有间距；
  - 如果上面这个例子，想要让 name grade 两个值为字符串的变量也有间距，那么直接写空格，写成`<P>{name} {grade}{scroe}</P>` 或者 `<P textSpacing>{name} {grade}{scroe}</P>`

当 P 的孩子中有 P.Cell 的时候，P 会变成 flex 布局

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Button, Balloon, Icon, Progress, ResponsiveGrid as RGrid } from '@alifd/next';
import { Page, Block, P, Text } from '@alifd/pro-layout';

const MockBlock = (props) => {
  return (
    <div className="mock-block-fullx60" {...props}>
      100% x 60
    </div>
  );
};

const actiontype = '编辑';
const user = '游鹿';
const timestamp = '20200113';
const btn = <Button>button with const</Button>;

const arr = [
  <P>
    <P.Cell>
      <Button>确定</Button>
    </P.Cell>
    <P.Cell type="headline">
      <Button>取消</Button>
    </P.Cell>
    <P.Cell>
      <Button>重置</Button>
    </P.Cell>
  </P>,
  <P>
    <Button>确定</Button>
    <Button size="large">取消</Button>
    <Button>重置</Button>
    p下的元素默认是上下以baseline居中的，但是因为Button组件自己设置了vertical-align: middle,所以Button上下是middle的，当前文本是baseline的
  </P>,
  <P>
    <P.Cell>
      <Text>确定</Text>
    </P.Cell>
    <P.Cell>
      <Text type="headline">取消</Text>
    </P.Cell>
    <P.Cell>
      <Text>重置</Text>
    </P.Cell>
  </P>,
  <P textSpacing>
    <Text>确定</Text>
    <Text type="headline">取消</Text>
    <Text>重置</Text>
    p下的元素默认是上下以baseline居中的，这个就是baseline居中
  </P>,
  <P align="full">
    {user}
    {actiontype}了这份文件，时间是{timestamp}
    <Icon type="atm" />
  </P>,
  <P align="space-between">
    <P.Cell>
      <Text>
        {user}
        {actiontype}了这份文件，时间是{timestamp}
      </Text>
    </P.Cell>
    <Icon type="atm" />
  </P>,
  <P>
    <P.Cell>
      <Text>
        {user}
        {actiontype}了这份文件，时间是{timestamp}
      </Text>
    </P.Cell>
    <P.Cell>
      <Icon type="atm" />
    </P.Cell>
  </P>,
  <P>
    <P.Cell>
      <Text>
        注意哦{user}
        {actiontype}了这份文件，时间是{timestamp}
      </Text>
    </P.Cell>
    <P.Cell>
      <Icon type="arrow-right" />
    </P.Cell>
  </P>,
  <P verAlign="top">
    <P.Cell>
      <Text>
        注意哦{user}
        {actiontype}了这份文件，时间是{timestamp}这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果
      </Text>
    </P.Cell>
    <P.Cell right>
      <Icon type="arrow-right" />
    </P.Cell>
  </P>,
  <P verAlign="top">
    <Text>
      注意哦{user}
      {actiontype}了这份文件，时间是{timestamp}这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果主要是看换行的效果主要是看换行的效果这里会有很多废话，主要是看换行的效果
    </Text>
    <Icon type="arrow-right" />
  </P>,
  <P verAlign="middle">
    {user}
    {actiontype}
    {btn}
  </P>,
  <P verAlign="middle">
    <Text>{user}</Text> <Text>{actiontype}</Text>
    {btn}
  </P>,
];

const arrList = arr.map((item) => {
  return React.createElement(Block, {}, item);
});

class App extends Component {
  render() {
    return (
      <div className="mock-iframe">
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
              <P type="headline">段落布局</P>
            </>
          }
        >
          {arrList}
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
.mock-iframe {
  min-height: 350px;
  width: 100%;
  border: 1px solid #ddd;
}
```
