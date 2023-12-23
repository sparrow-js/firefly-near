import * as React from 'react';
interface BlockCellItemProps {
    prefix?: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    mode?: 'card' | 'transparent' | 'procard';
}
declare const RefBlockCellItem: React.ForwardRefExoticComponent<BlockCellItemProps & React.RefAttributes<unknown>>;
export default RefBlockCellItem;
