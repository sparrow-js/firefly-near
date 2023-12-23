---
title: 文本
order: 31
---

- 两个 Text 组件之间默认是没有间距的；
- Text 与非 Text 组件之间才有间距；
- 如果想两个 Text 组件之间有间距，可以直接用空格；

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Button, Balloon, Icon, Progress, ResponsiveGrid as RGrid } from '@alifd/next';
import { Page, Block, Text, P } from '@alifd/pro-layout';

const { H1, H2, H3, H4, H5, H6 } = Text;

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
                  <Breadcrumb.Item>文本</Breadcrumb.Item>
                </Breadcrumb>
              </P>
              <P type="headline">文本</P>
            </>
          }
        >
          <Block>
            <Text>Fusion Design</Text>
            <br />
            <Text mark>Fusion Design</Text> - [mark]
            <br />
            <Text code>Fusion Design</Text> - [code]
            <br />
            <Text underline>Fusion Design</Text> - [underline]
            <br />
            <Text delete>Fusion Design</Text> - [delete]
            <br />
            <Text strong>Fusion Design</Text> - [strong]
          </Block>
          <Block>
            <H1>h1. Fusion Design</H1>
            <H2>h2. Fusion Design</H2>
            <H3>h3. Fusion Design</H3>
            <H4>h4. Fusion Design</H4>
            <H5>h5. Fusion Design</H5>
            <H6>h6. Fusion Design</H6>
          </Block>
          <Block>
            <Text>这一行里可以有很多种颜色</Text>
            <Text color="red">红</Text>
            <Text color="orange">橙</Text>
            <Text color="yellow">黄</Text>
            <Text color="green">绿</Text>
            <Text color="blue">蓝</Text>
            <Text color="indigo">靛</Text>
            <Text color="purple">紫</Text>， 也可以自定义比如<Text color="#775533">#775533</Text>
          </Block>
          <Block>
            <H1>Fusion 简介</H1>
            <P>
              Fusion
              是一套企业级中后台UI的解决方案，致力于解决设计师与前端在产品体验一致性、工作协同、开发效率方面的问题。通过协助业务线构建设计系统，提供系统化工具协助设计师前端使用设计系统，下游提供一站式设计项目协作平台；打通互联网产品从设计到开发的工作流。
            </P>
            <P>
              Fusion Design
              产品创建于2015年底，阿里巴巴集团中台战略背景下，由国际UED（现国际用户体验事业部）与B2B技术部成立中台DPL项目。从国际UED，天猫，商家等各类业务形态中抽象解构，通过一套设计系统协议提升
              <Text mark>设计与开发效率</Text>
              ，以统一的物料分发工具提升团队协同能力，借助灵活的在线样式配置支撑业务的设计创新。
            </P>
            <P>
              <Text>
                Fusion Design
                产品创建于2015年底，阿里巴巴集团中台战略背景下，由国际UED（现国际用户体验事业部）与B2B技术部成立中台DPL项目。从国际UED，天猫，商家等各类业务形态中抽象解构，通过一套设计系统协议提升
                <Text mark>设计与开发效率</Text>
                ，以统一的物料分发工具提升团队协同能力，借助灵活的在线样式配置支撑业务的设计创新。
              </Text>
            </P>
            <H2>Fusion 的能力</H2>
            <P>
              我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和{' '}
              <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
            </P>
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
.mock-iframe {
  min-height: 350px;
  width: 100%;
  border: 1px solid #ddd;
}
```
