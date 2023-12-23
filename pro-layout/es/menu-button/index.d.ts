import React from 'react';
import { MenuButtonProps as NextMenuButtonProps } from '@alifd/next/types/menu-button';
export interface MenuItemProps {
    /**
     * 菜单值
     */
    key?: string;
    /**
     * 类型
     * @default item
     */
    type?: 'item' | 'popupItem' | 'checkboxItem' | 'radioItem' | 'divider' | 'group' | 'subMenu';
    /**
     * 展示标签
     */
    label?: string;
    /**
     * 是否处于禁用状态
     */
    disabled?: boolean;
    /**
     * 自定义 label 展示
     */
    children?: React.ReactNode;
    /**
     * 帮助文本
     */
    helper?: React.ReactNode;
}
export interface MenuButtonProps extends NextMenuButtonProps {
    /**
     * 下拉菜单数据源
     */
    dataSource?: MenuItemProps[];
}
export interface MenuButtonState {
    visible?: boolean;
    selectedKeys?: string[];
}
/**
 * MenuButton
 */
export declare class MenuButton extends React.Component<MenuButtonProps, MenuButtonState> {
    static displayName: string;
    static defaultProps: {
        prefix: string;
        autoWidth: boolean;
        popupTriggerType: string;
        onVisibleChange: () => void;
        onItemClick: () => void;
        onSelect: () => void;
        defaultSelectedKeys: any[];
        menuProps: {};
        dataSource: any[];
    };
    static getDerivedStateFromProps(props: any): Partial<MenuButtonState>;
    constructor(props: any);
    clickMenuItem: (key: any, ...others: any[]) => void;
    selectMenu: (keys: any, ...others: any[]) => void;
    onPopupOpen: () => void;
    onPopupVisibleChange: (visible: any, type: any) => void;
    _menuRefHandler: (ref: any) => void;
    render(): JSX.Element;
}
