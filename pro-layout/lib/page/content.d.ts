import * as React from 'react';
import { PageAsideProps } from './aside';
import { PageNavProps } from './nav';
export interface PageContentProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    nav?: React.ReactNode;
    aside?: React.ReactNode;
    main?: React.ReactNode;
    children?: React.ReactNode;
    contentAlignCenter?: boolean;
    minHeight?: number | string;
    grid?: boolean;
    gap?: number;
    columns?: 1 | 12;
    background?: 'lining' | 'surface' | 'transparent';
    noPadding?: boolean;
    isTab?: boolean;
    title?: string;
    key?: string;
    active?: boolean;
    presetNav?: boolean;
    presetAside?: boolean;
    navProps?: PageNavProps;
    asideProps?: PageAsideProps;
}
/**
 * TODO: Page.Header Page.Content Page.Footer
 * Content 的高度默认占据 一个屏幕的剩余空间，即使里面内容不足也应该背景色撑满
 * @param props
 */
declare const PageContent: React.FC<PageContentProps>;
export default PageContent;
