import * as React from 'react';
import { useContext } from 'react';
import { Context } from './row-col-container';
import classNames from 'classnames';
var Col = function Col(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    children = props.children,
    colSpan = props.colSpan,
    colWidth = props.colWidth,
    minHeight = props.minHeight,
    justifyContent = props.justifyContent;
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "col"] = true, _classNames));
  var _ref = useContext(Context) || {},
    colGap = _ref.colGap;
  // 优先colWidth指定宽度
  var style = {
    flex: colWidth ? "0 0 " + colWidth : colSpan + " " + colSpan + " 0",
    minHeight: minHeight,
    justifyContent: justifyContent,
    marginLeft: typeof colGap === 'number' ? colGap + "px" : colGap
  };
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style,
    ref: ref
  }, children);
};
var RefCol = /*#__PURE__*/React.forwardRef(Col);
RefCol._typeMark = 'autolayout_col';
RefCol.defaultProps = {
  prefix: 'pro-layout-',
  colSpan: 1
};
export default RefCol;