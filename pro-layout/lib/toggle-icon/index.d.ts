import * as React from 'react';
import { IconProps } from '@alifd/next/types/icon';
export declare const CustomIcon: (props: any) => JSX.Element;
/**
 * icon组
 */
export declare const ToggleIconGroup: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>>;
export interface ToggleIconProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
    title?: string;
    active?: boolean;
    type: IconProps['type'];
    size?: IconProps['size'];
}
export declare const ToggleIcon: React.ForwardRefExoticComponent<ToggleIconProps & React.RefAttributes<HTMLSpanElement>>;
