import * as React from 'react';
export interface FooterProps {
    fixed?: boolean;
    style?: React.CSSProperties;
    prefix?: string;
    children?: any;
}
declare const Footer: React.FC<FooterProps>;
export default Footer;
