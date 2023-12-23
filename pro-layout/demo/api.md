---
title: API
order: 0
---

#### Page

> 槽位容器类

| 参数   | 含义     | 嵌套内容                     | 布局栅格                 | 备注                       |
| ------ | -------- | ---------------------------- | ------------------------ | -------------------------- |
| header | 顶部区域 | 只能嵌套 Component(自动带 P) | 只有 1 列，display:block | 没有默认高度，根据内容撑开 |
| footer | 底部区域 | 只能嵌套 Component(自动带 P) | 只有 1 列，display:block | 没有默认高度，根据内容撑开 |
| nav    | 左侧区域 | 只能嵌套 Component(自动带 P) | 只有 1 列，display:block | 没有默认高度，根据内容撑开 |
| aside  | 右侧区域 | 只能嵌套 Block               | 只有 1 列，display:block | 没有默认高度，根据内容撑开 |

> 属性类

| 参数               | 含义                                        | 类型          | 默认值 |
| ------------------ | ------------------------------------------- | ------------- | ------ |
| isTab              | 是否开启分页布局                            | Boolean       | false  |
| tabProps           | 放到 Tab 组件上的一些默认值                 | Object        | {}     |
| noContentPadding   | 是否去掉主题内容区域的 padding              | Boolean       | false  |
| contentAlignCenter | 全屏展示还是居中展示                        | Boolean       | false  |
| minHeight          | 页面的最小高度，例如 calc(100vh - 52px)     | Number/String | -      |
| background         | 背景色 'lining' / 'surface' / 'transparent' | Enum          |
| presetHeader       | 是否内置 PageHeader                         | Boolean       | false  |
| presetFooter       | 是否内置 PageFooter                         | Boolean       | false  |
| presetNav          | 是否内置 PageNav                            | Boolean       | false  |
| presetAside        | 是否内置 PageAside                          | Boolean       | false  |
| headerProps        | 如果内置 PageHeader，那么当前参数生效       | Object        | {}     |
| footerProps        | 如果内置 PageFooter，那么当前参数生效       | Object        | {}     |
| navProps           | 如果内置 PageNav，那么当前参数生效          | Object        | {}     |
| asideProps         | 如果内置 PageAside，那么当前参数生效        | Object        | {}     |

#### tabProps

| 参数       | 含义                           | 类型 | 默认值 |
| ---------- | ------------------------------ | ---- | ------ |
| size       | 尺寸，有 medium/small          | Enum | -      |
| excessMode | 溢出模式，有 dropdown/slide    | Enum | -      |
| shape      | 样式 wrapped/capsule/pure/text | Enum | -      |

#### PageHeader

| 参数          | 含义                                        | 类型    | 默认值 |
| ------------- | ------------------------------------------- | ------- | ------ |
| background    | 背景色 'lining' / 'surface' / 'transparent' | Enum    | -      |
| headerDivider | 是否有分割线                                | Boolean | -      |

#### PageFooter

| 参数  | 含义           | 类型    | 默认值 |
| ----- | -------------- | ------- | ------ |
| fixed | 是否固定在底部 | Boolean | -      |

#### PageContent

> 槽位容器类

| 参数  | 含义     | 嵌套内容 | 布局栅格 | 备注 |
| ----- | -------- | -------- | -------- | ---- |
| nav   | 左侧区域 |          |          |      |
| aside | 右侧区域 |          |          |      |

> 属性类

| 参数               | 含义                                             | 类型          | 默认值 |
| ------------------ | ------------------------------------------------ | ------------- | ------ |
| contentAlignCenter | 全屏展示还是居中展示                             | Boolean       | false  |
| minHeight          | 页面的最小高度，例如 calc(100vh - 52px)          | Number/String | -      |
| noPadding          | 是否去掉 padding                                 | Boolean       | false  |
| isTab              | 是否开启分页布局                                 | Boolean       | false  |
| title              | 开启分页布局后生效，作为子页面(Tab.Item)的 title | String        | -      |
| key                | 开启分页布局后生效，作为子页面(Tab.Item)的 key   | String        | -      |
| presetNav          | 是否内置 PageNav                                 | Boolean       | false  |
| presetAside        | 是否内置 PageAside                               | Boolean       | false  |
| navProps           | 如果内置 PageNav，那么当前参数生效               | Object        | {}     |
| asideProps         | 如果内置 PageAside，那么当前参数生效             | Object        | {}     |

#### PageAside

| 参数  | 含义 | 类型          | 默认值 |
| ----- | ---- | ------------- | ------ |
| width | 宽度 | Number/String | -      |

#### PageNav

| 参数  | 含义 | 类型          | 默认值 |
| ----- | ---- | ------------- | ------ |
| width | 宽度 | Number/String | -      |

#### Block

| 参数              | 含义                                               | 类型          | 默认值 |
| ----------------- | -------------------------------------------------- | ------------- | ------ |
| childTotalColumns | 设置后开启 grid 布局模式，当前参数可以用来设置列数 | Number/String | -      |
| rowGap            | 行间距                                             | Number        | -      |
| colGap            | 列间距                                             | Number        | -      |
| mode              | 模式 transparent/inset/card/procard                | Enum          | -      |
| title             | 标题                                               | ReactNode     | -      |
| extra             | 额外区域                                           | ReactNode     | -      |

#### BlockCell

| 参数    | 说明                               | 类型                        | 默认值      |
| ------- | ---------------------------------- | --------------------------- | ----------- |
| title   | 标题                               | ReactNode                   | -           |
| extra   | 额外区域                           | ReactNode                   | -           |
| mode    | 模式(搭建模式下建议不要开放此 api) | Enum('transparent', 'card') | transparent |
| colSpan | 占据的列数                         | number                      | 12          |
| rowSpan | 占据的行数                         | number                      | 1           |

### P

| 参数        | 说明                                                                                             | 类型    | 默认值     |
| ----------- | ------------------------------------------------------------------------------------------------ | ------- | ---------- |
| type        | 约束字体大小 overline/caption/body-1/body-2/subhead/title/headline/display-1/display-2/display-3 | String  | 'body-2'   |
| verAlign    | 垂直方向对齐模式 top/middle/bottom/baseline                                                      | Enum    | 'baseline' |
| align       | 水平方向对齐模式 left/center/right/space-between/space-around                                    | Enum    | 'left'     |
| full        | 每个直接子元素是否直接占满一行                                                                   | Boolean | false      |
| textSpacing | 是否强制 Text 之间出现间距                                                                       | Boolean | false      |
| children    | 子元素                                                                                           | custom  | -          |

#### Text

> Text.H1 Text.H2 Text.H3 Text.H4 Text.H5 Text.H6 对应 6 种尺寸的文字

| 参数      | 说明           | 类型    | 默认值 |
| --------- | -------------- | ------- | ------ |
| delete    | 添加删除线样式 | Boolean | false  |
| mark      | 添加标记样式   | Boolean | false  |
| underline | 添加下划线样式 | Boolean | false  |
| strong    | 是否加粗       | Boolean | false  |
| code      | 添加代码样式   | Boolean | false  |
| component | 设置标签类型   | custom  | 'span' |
| color     | 颜色           | String  | -      |
