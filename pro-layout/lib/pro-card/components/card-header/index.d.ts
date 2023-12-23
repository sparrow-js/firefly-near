import * as React from 'react';
import { CardButtonGroupProps } from '../button-group';
import { TooltipProps } from '@alifd/next/lib/balloon';
export interface CardTagProps {
    label?: string;
    color?: string;
}
export interface CardHeaderProps {
    /**
     * 卡片标题
     */
    title?: React.ReactNode;
    description?: React.ReactNode;
    /**
     * 卡片顶部操作区域自定义渲染
     */
    actionBar?: React.ReactNode;
    actionButtons?: CardButtonGroupProps;
    text?: boolean;
    visibleButtonCount?: number;
    tagGroup?: CardTagProps[];
    /**
     * 受控控制 Card 展开收起状态
     */
    isCollapse?: boolean;
    /**
     * 是否开启 Card 显示展开收起
     */
    hasCollapse?: boolean;
    collapsed?: boolean;
    onCollapse?: () => void;
    /**
     * 帮助信息，仅在 title 展示时生效
     */
    explanation?: string;
    /**
     * 帮助信息气泡配置
     */
    explanationTooltipProps?: TooltipProps;
    hasDivider?: boolean;
}
export declare const CardHeader: React.FC<CardHeaderProps>;
