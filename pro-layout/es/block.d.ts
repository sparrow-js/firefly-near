import * as React from 'react';
interface BlockProps {
    prefix?: string;
    colSpan?: number;
    rowSpan?: number;
    dataSource?: any[];
    children?: React.ReactNode;
    childTotalColumns?: number | string;
    style?: React.CSSProperties;
    noPadding?: boolean;
    noBorder?: boolean;
    strict?: boolean;
    className?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    background?: 'lining' | 'surface' | 'transparent';
    mode?: 'transparent' | 'inset' | 'card' | 'procard';
    rowGap?: number;
    colGap?: number;
}
declare const RefBlock: React.ForwardRefExoticComponent<BlockProps & React.RefAttributes<unknown>>;
export default RefBlock;
