import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "className", "type", "style", "component", "strong", "underline", "delete", "code", "mark", "color"],
  _excluded2 = ["prefix", "className", "component"];
import * as React from 'react';
import classNames from 'classnames';
import createTitle from './text-title';
import { isProduction, textTypeMap } from './util';
/**
 * 文字 字体、大小、行高
 * @param props
 */
var Text = function Text(props, ref) {
  var _classNames;
  var prefix = props.prefix,
    className = props.className,
    type = props.type,
    style = props.style,
    _props$component = props.component,
    component = _props$component === void 0 ? 'span' : _props$component,
    strong = props.strong,
    underline = props.underline,
    deleteProp = props["delete"],
    code = props.code,
    mark = props.mark,
    color = props.color,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  var children = props.children;
  var newType = textTypeMap[type] || type;
  var cls = classNames(className, (_classNames = {}, _classNames[prefix + "text"] = true, _classNames[prefix + "text-" + newType] = newType, _classNames));
  if (typeof children === 'string' && children.indexOf('\n') !== -1) {
    var childrenList = children.split('\n');
    var newChildren = [];
    childrenList.forEach(function (child) {
      newChildren.push(child);
      newChildren.push( /*#__PURE__*/React.createElement("br", null));
    });
    newChildren.pop();
    children = newChildren;
  }
  var Tag = component;
  if (strong) {
    children = /*#__PURE__*/React.createElement("strong", null, children);
  }
  if (underline) {
    children = /*#__PURE__*/React.createElement("u", null, children);
  }
  if (deleteProp) {
    children = /*#__PURE__*/React.createElement("del", null, children);
  }
  if (code) {
    children = /*#__PURE__*/React.createElement("code", null, children);
  }
  if (mark) {
    children = /*#__PURE__*/React.createElement("mark", null, children);
  }
  var newStyle = {};
  if (color) {
    newStyle = _extends({
      color: color
    }, style);
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({}, others, {
    style: newStyle,
    className: cls,
    ref: ref
  }), children);
};
var RefText = /*#__PURE__*/React.forwardRef(Text);
RefText.defaultProps = {
  prefix: 'pro-layout-'
};
var Paragraph = function Paragraph(props) {
  var prefix = props.prefix,
    className = props.className,
    component = props.component,
    others = _objectWithoutPropertiesLoose(props, _excluded2);
  var cls = classNames(prefix + "text-paragraph", className);
  if (!isProduction()) {
    console.error("Warning: Text.Paragraph is depracted, use P instead");
  }
  return /*#__PURE__*/React.createElement(Text, _extends({}, others, {
    className: cls,
    component: component
  }));
};
// 为了保证兼容性，@alifd/next基础组件中 Typography 组件有的所有子组件、功能，Text也有，但是均不建议使用
RefText.H1 = createTitle('h1');
RefText.H2 = createTitle('h2');
RefText.H3 = createTitle('h3');
RefText.H4 = createTitle('h4');
RefText.H5 = createTitle('h5');
RefText.H6 = createTitle('h6');
RefText.Paragraph = Paragraph;
export default RefText;