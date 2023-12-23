import * as React from 'react';
interface DividerProps {
    prefix?: string;
    direction?: 'hoz' | 'ver';
}
declare const RefDivider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<unknown>>;
export { RefDivider as Divider };
interface BlockCellProps {
    prefix?: string;
    className?: string;
    children?: React.ReactNode;
    content?: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    mode?: 'card' | 'transparent' | 'procard';
    childMode?: 'ver' | 'hoz' | 'initial' | 'flow';
    childWidth?: number | string;
    childTotalColumns?: number;
}
declare const RefBlockCell: React.ForwardRefExoticComponent<BlockCellProps & React.RefAttributes<unknown>>;
export default RefBlockCell;
