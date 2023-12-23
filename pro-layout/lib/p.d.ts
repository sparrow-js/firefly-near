import * as React from 'react';
interface ParagraphProps {
    prefix?: string;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
    verAlign?: 'top' | 'middle' | 'bottom' | 'baseline';
    align?: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
    textSpacing?: boolean;
    full?: boolean;
    flex?: boolean;
    wrap?: boolean;
    children?: React.ReactNode;
    style?: any;
    className?: string;
}
interface ParagraphCellProps extends ParagraphProps {
    direction?: 'hoz' | 'ver';
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
    width?: number | string;
    alignSelf?: 'top' | 'middle' | 'bottom' | 'baseline' | 'inherit';
    verAlign?: 'top' | 'middle' | 'bottom' | 'baseline' | 'inherit';
    align?: 'left' | 'center' | 'right' | 'inherit';
}
/**
 * P 的分组
 * @param props
 */
export declare const Cell: React.FC<ParagraphCellProps>;
export interface ParagraphFC<P> extends React.FC<P> {
    Cell?: typeof Cell;
}
declare const ExportParagraph: React.FC<ParagraphProps>;
export default ExportParagraph;
