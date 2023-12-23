import * as React from 'react';
/**
 * 用于检测组件的 displayName
 */
declare const checkComName: <Props = unknown>(checkElement: React.ReactNode, sourceComp: React.ComponentType<Props>, compDisplayName?: string | string[]) => checkElement is React.ReactElement<Props, string | React.JSXElementConstructor<any>>;
export default checkComName;
