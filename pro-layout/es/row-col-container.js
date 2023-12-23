import * as React from 'react';
import classNames from 'classnames';
var Context = /*#__PURE__*/React.createContext(null);
var RowColContainer = function RowColContainer(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    children = props.children,
    rowGap = props.rowGap,
    colGap = props.colGap;
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "row-col-container"] = true, _classNames));
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    ref: ref
  }, /*#__PURE__*/React.createElement(Context.Provider, {
    value: {
      rowGap: rowGap,
      colGap: colGap
    }
  }, children));
};
var RefRowColContainer = /*#__PURE__*/React.forwardRef(RowColContainer);
RefRowColContainer._typeMark = 'autolayout_rowcolcontainer';
RefRowColContainer.defaultProps = {
  prefix: 'pro-layout-',
  rowGap: 0,
  colGap: 0
};
export default RefRowColContainer;
export { Context };