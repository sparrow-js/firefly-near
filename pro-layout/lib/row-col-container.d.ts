import * as React from 'react';
interface RowColContainerProps {
    prefix?: string;
    className?: string;
    children?: React.ReactNode;
    rowGap?: number;
    colGap?: number;
}
declare const Context: React.Context<any>;
declare const RefRowColContainer: React.ForwardRefExoticComponent<RowColContainerProps & React.RefAttributes<unknown>>;
export default RefRowColContainer;
export { Context };
