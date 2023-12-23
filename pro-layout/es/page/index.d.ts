import * as React from 'react';
import Footer, { FooterProps } from './footer';
import Header, { HeaderProps } from './header';
import PageAside, { PageAsideProps } from './aside';
import PageNav, { PageNavProps } from './nav';
import PageContent, { PageContentProps } from './content';
interface ContentProps {
    background?: 'lining' | 'surface' | 'transparent';
    style?: React.CSSProperties;
    noPadding?: boolean;
}
interface IPageTabsProps {
    size?: 'medium' | 'small';
    excessMode?: 'dropdown' | 'slide';
    shape?: 'wrapped' | 'capsule' | 'pure' | 'text';
}
interface PageProps extends PageContentProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    header?: React.ReactNode;
    contentProps?: ContentProps;
    footer?: React.ReactNode;
    nav?: React.ReactNode;
    aside?: React.ReactNode;
    main?: React.ReactNode;
    children?: React.ReactNode;
    contentAlignCenter?: boolean;
    minHeight?: number | string;
    gap?: number;
    columns?: 1 | 12;
    grid?: boolean;
    background?: 'lining' | 'surface' | 'transparent';
    noContentPadding?: boolean;
    isTab?: boolean;
    tabProps?: IPageTabsProps[];
    presetHeader?: boolean;
    presetFooter?: boolean;
    presetNav?: boolean;
    presetAside?: boolean;
    headerProps?: HeaderProps;
    footerProps?: FooterProps;
    navProps?: PageNavProps;
    asideProps?: PageAsideProps;
}
declare const ExportPage: React.FC<PageProps>;
export default ExportPage;
export { Header, Footer, PageContent, PageAside, PageNav };
