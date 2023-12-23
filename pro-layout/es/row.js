import * as React from 'react';
import { useContext } from 'react';
import { Context } from './row-col-container';
import classNames from 'classnames';
var Row = function Row(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    minHeight = props.minHeight,
    children = props.children;
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "row"] = true, _classNames));
  var _ref = useContext(Context) || {},
    rowGap = _ref.rowGap;
  var style = {
    minHeight: minHeight,
    marginTop: typeof rowGap === 'number' ? rowGap + "px" : rowGap
  };
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style,
    ref: ref
  }, children);
};
var RefRow = /*#__PURE__*/React.forwardRef(Row);
RefRow._typeMark = 'autolayout_row';
RefRow.defaultProps = {
  prefix: 'pro-layout-'
};
export default RefRow;