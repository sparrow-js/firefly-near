import * as React from 'react';
interface TextProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'title' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
    children?: React.ReactNode;
    /**
     * 添加删除线样式
     */
    delete?: boolean;
    /**
     * 添加标记样式
     */
    mark?: boolean;
    /**
     * 添加下划线样式
     */
    underline?: boolean;
    /**
     * 是否加粗
     */
    strong?: boolean;
    /**
     * 添加代码样式
     */
    code?: boolean;
    /**
     * 设置标签类型
     */
    component?: React.ElementType;
    color?: string;
}
declare const RefText: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<unknown>>;
export default RefText;
