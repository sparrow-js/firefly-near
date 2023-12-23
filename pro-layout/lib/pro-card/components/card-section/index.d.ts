import * as React from 'react';
import { CardTagProps } from '../card-header';
import { TooltipProps } from '@alifd/next/lib/balloon';
export interface CardSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * 段落标题
     */
    title?: React.ReactNode;
    /**
     * 帮助信息，仅在 title 展示时生效
     */
    explanation?: string;
    /**
     * 帮助信息气泡配置
     */
    explanationTooltipProps?: TooltipProps;
    /**
     * 子卡片顶部操作区域自定义渲染
     */
    actionBar?: React.ReactNode;
    /**
     * 是否启用分割线
     * @default false
     */
    segmentLine?: boolean;
    /**
     * 是否 loading
     * @default false
     */
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    tagGroup?: CardTagProps[];
    headerDivider?: boolean;
    footerDivider?: boolean;
    hasDividerIndent?: boolean;
    noBullet?: boolean;
}
/**
 * 子卡片
 */
export declare const CardSection: React.FC<CardSectionProps>;
