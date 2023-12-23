import * as React from 'react';
interface BlockCellGroupProps {
    prefix?: string;
    className?: string;
    children?: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    style?: React.CSSProperties;
    childMinWidth?: number | string;
}
declare const RefBlockCellGroup: React.ForwardRefExoticComponent<BlockCellGroupProps & React.RefAttributes<unknown>>;
export default RefBlockCellGroup;
