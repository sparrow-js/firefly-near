import * as React from 'react';
interface RowProps {
    prefix?: string;
    className?: string;
    minHeight?: string;
    children?: React.ReactNode;
}
declare const RefRow: React.ForwardRefExoticComponent<RowProps & React.RefAttributes<unknown>>;
export default RefRow;
