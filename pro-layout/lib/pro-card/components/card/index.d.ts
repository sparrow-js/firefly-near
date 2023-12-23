import * as React from 'react';
import { CardTagProps } from '../card-header';
import { CardButtonGroupProps } from '../button-group';
import { TooltipProps } from '@alifd/next/lib/balloon';
export interface IOperationConfig {
    fixed?: boolean;
    showSaveTime?: boolean;
    align?: 'center' | 'flex-start' | 'flex-end';
}
export interface IOperationItem {
    label?: string;
    type?: 'primary' | 'secondary' | 'normal';
    onClick?: () => void;
}
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 卡片标题
     */
    title?: React.ReactNode;
    description?: React.ReactNode;
    visibleButtonCount?: number;
    /**
     * 帮助信息，仅在 title 展示时生效
     */
    explanation?: string;
    bodyPadding?: boolean;
    /**
     * 帮助信息气泡配置
     */
    explanationTooltipProps?: TooltipProps;
    /**
     * 卡片顶部操作区域自定义渲染
     */
    actionBar?: React.ReactNode;
    actionButtons?: CardButtonGroupProps;
    tagGroup?: CardTagProps[];
    /**
     * 段落分割线; 如果为 true 时，默认最后一个段落没有分割线。
     * @default false
     */
    segmentLine?: boolean;
    /**
     * 是否 loading
     */
    loading?: boolean;
    /**
     * 受控控制 Card 展开收起状态
     */
    isCollapse?: boolean;
    /**
     * 是否开启 Card 显示展开收起
     */
    hasCollapse?: boolean;
    /**
     * 默认收起
     */
    defaultCollapse?: boolean;
    /**
     * 展开收起状态切换后的回调函数
     */
    setCollapse?: (collapseState: boolean) => void;
    /**
     * 是否为弹窗卡片
     */
    isDialogCard?: boolean;
    hasDivider?: boolean;
    operations?: IOperationItem[];
    operationConfig?: IOperationConfig;
    lastSaveTime?: number;
    text?: boolean;
}
export declare const RenderOperations: ({ operations, operationConfig, lastSaveTime }: {
    operations?: any[];
    operationConfig?: {};
    lastSaveTime: any;
}) => JSX.Element;
export declare const Card: React.FC<CardProps>;
