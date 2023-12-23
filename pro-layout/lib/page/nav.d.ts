import * as React from 'react';
export interface PageNavProps {
    prefix?: string;
    width?: number | string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const PageNav: React.FC<PageNavProps>;
export default PageNav;
