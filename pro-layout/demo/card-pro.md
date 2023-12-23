---
title: 卡片
order: 20
---

```jsx
import * as React from 'react';
import { ProCard, Page, P } from '@alifd/pro-layout';
import { Typography, Button, Box, Breadcrumb } from '@alifd/next';

const { CardSection } = ProCard;
const { Group: ButtonGroup } = Button;

const PlaceHolderGray = () => {
  return <div style={{ height: 100, width: '100%', background: '#ddd' }} />;
};

const { H4 } = Typography;

const CardCollapseDemo = () => {
  return (
    <div className="mock-iframe">
      <Page
        presetHeader
        header={
          <>
            <P>
              <Breadcrumb>
                <Breadcrumb.Item>自然布局</Breadcrumb.Item>
                <Breadcrumb.Item>卡片</Breadcrumb.Item>
              </Breadcrumb>
            </P>
            <P type="headline">ProCard</P>
          </>
        }
      >
        <H4>A. 普通卡片</H4>
        <ProCard
          title="卡片标题"
          hasCollapse
          explanation="我是一条友好的提示框"
          tagGroup={[
            'blue',
            { label: 'orange', color: 'orange' },
            { label: 'red', color: 'red' },
            { label: 'turquoise', color: 'turquoise' },
            { label: 'yellow', color: 'yellow' },
            { label: 'green', color: 'green' },
          ]}
          actionButtons={[{ label: '操作一' }, { label: '操作二' }]}
        >
          <PlaceHolderGray />
        </ProCard>
        <H4>B. 带子卡片</H4>
        <ProCard
          title="卡片标题"
          hasCollapse
          explanation="我是一条友好的提示框"
          tagGroup={[
            'blue',
            { label: 'orange', color: 'orange' },
            { label: 'red', color: 'red' },
            { label: 'turquoise', color: 'turquoise' },
            { label: 'yellow', color: 'yellow' },
            { label: 'green', color: 'green' },
          ]}
          actionButtons={[{ label: '操作一' }, { label: '操作二' }]}
        >
          <CardSection
            title="分组小标题"
            tagGroup={[
              'blue',
              { label: 'orange', color: 'orange' },
              { label: 'red', color: 'red' },
              { label: 'turquoise', color: 'turquoise' },
              { label: 'yellow', color: 'yellow' },
              { label: 'green', color: 'green' },
            ]}
          >
            <PlaceHolderGray />
          </CardSection>
          <CardSection title="分组小标题">
            <PlaceHolderGray />
          </CardSection>
          <CardSection title="分组小标题" loading>
            <PlaceHolderGray />
          </CardSection>
        </ProCard>
        <H4>C. 默认收起</H4>
        <ProCard title="卡片标题" hasCollapse defaultCollapse tagGroup={['标签一', '标签二']}>
          <PlaceHolderGray />
        </ProCard>
      </Page>
    </div>
  );
};

ReactDOM.render(<CardCollapseDemo />, mountNode);
```
