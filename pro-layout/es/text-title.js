import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _excluded = ["prefix", "className"];
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from './text';
import { isProduction } from './util';
export default (function (Tag) {
  /**
   * Typography.Title
   * @description 分为 H1, H2, H3, H4, H5, H6 不同的组件，表示不同层级，继承 Typography.Text API
   * @order 1
   */
  var Title = /*#__PURE__*/function (_Component) {
    _inheritsLoose(Title, _Component);
    function Title() {
      var _this;
      _this = _Component.call(this) || this;
      if (!isProduction()) {
        console.error("Warning: Text." + Tag.toUpperCase() + " is depracted, use <P type=\"" + Tag + "\"> instead");
      }
      return _this;
    }
    var _proto = Title.prototype;
    _proto.render = function render() {
      var _this$props = this.props,
        prefix = _this$props.prefix,
        className = _this$props.className,
        others = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return /*#__PURE__*/React.createElement(Text, _extends({}, others, {
        component: Tag,
        className: (className || '') + " " + prefix + "typography-title"
      }));
    };
    return Title;
  }(Component);
  Title.propTypes = {
    prefix: PropTypes.string
  };
  Title.defaultProps = {
    prefix: 'pro-layout-'
  };
  Title.displayName = Tag.toUpperCase();
  return Title;
});