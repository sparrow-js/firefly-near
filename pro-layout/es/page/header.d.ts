import * as React from 'react';
export interface HeaderProps {
    prefix?: string;
    background?: 'lining' | 'surface' | 'transparent';
    style?: React.CSSProperties;
    headerDivider?: boolean;
    children?: any;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
