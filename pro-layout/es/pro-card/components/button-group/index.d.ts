import * as React from 'react';
import { ButtonProps as NextButtonProps } from '@alifd/next/types/button';
import { BadgeProps } from '@alifd/next/types/badge';
import { MenuButtonProps } from '../../../menu-button';
export interface TooltipProps {
    showTooltip: boolean;
    tooltipMessage: string;
    triggerType: 'click' | 'hover';
}
export interface ButtonDataSource {
    label?: string;
    onClick?: (e: React.MouseEvent<Element>) => unknown;
}
export interface CardButtonGroupProps {
    dataSource?: ButtonDataSource[];
    text?: boolean;
}
export interface ButtonProps extends NextButtonProps {
    /**
     * 徽标相关属性
     */
    badgeProps?: BadgeProps;
    tooltipProps?: TooltipProps;
}
export interface ButtonGroupProps {
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 自定义样式名
     */
    className?: string;
    /**
     * 是否设定按钮为文字模式
     */
    text?: boolean;
    /**
     * 可见按钮数量，超过会收起到”更多“菜单中
     */
    visibleButtonCount?: number | false;
    /**
     * 数据源驱动，如传入 children，则以 children 优先
     */
    dataSource?: ButtonProps[];
    /**
     * "更多" 按钮的额外配置
     */
    moreMenuButtonProps?: Partial<MenuButtonProps>;
    /**
     * 国际化文案
     */
    i18nBundle?: any;
}
export declare class ButtonGroup extends React.Component<ButtonGroupProps> {
    static defaultProps: {
        visibleButtonCount: number;
        moreMenuButtonProps: {};
    };
    static displayName: string;
    /**
     * 将 dataSource 和 children 处理成真正的 dataSource
     */
    getDataSource: () => object[];
    /**
     * 获取可展示的 dataSource & 折叠的 dataSource
     */
    getVisibleDataSourceAndCollapseDataSource: (dataSource: any) => {
        visible: any;
        collapse: any[];
    } | {
        visible: any[];
        collapse: any[];
    };
    /**
     * 渲染可展示的 dataSource
     */
    renderVisible(dataSource: any, text: any): any[];
    /**
     * 渲染折叠的 dataSource
     */
    renderCollapse(dataSource: any): JSX.Element;
    render(): JSX.Element;
}
