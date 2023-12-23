import * as React from 'react';
interface ColProps {
    prefix?: string;
    className?: string;
    children?: React.ReactNode;
    colSpan?: number;
    colWidth?: string;
    minHeight?: string;
    justifyContent?: string;
}
declare const RefCol: React.ForwardRefExoticComponent<ColProps & React.RefAttributes<unknown>>;
export default RefCol;
