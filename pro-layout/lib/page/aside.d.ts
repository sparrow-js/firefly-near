import * as React from 'react';
export interface PageAsideProps {
    prefix?: string;
    width?: number | string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const PageAside: React.FC<PageAsideProps>;
export default PageAside;
