"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _text = _interopRequireDefault(require("./text"));
var _util = require("./util");
var _excluded = ["prefix", "className"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = function _default(Tag) {
  /**
   * Typography.Title
   * @description 分为 H1, H2, H3, H4, H5, H6 不同的组件，表示不同层级，继承 Typography.Text API
   * @order 1
   */
  var Title = /*#__PURE__*/function (_Component) {
    (0, _inheritsLoose2["default"])(Title, _Component);
    function Title() {
      var _this;
      _this = _Component.call(this) || this;
      if (!(0, _util.isProduction)()) {
        console.error("Warning: Text." + Tag.toUpperCase() + " is depracted, use <P type=\"" + Tag + "\"> instead");
      }
      return _this;
    }
    var _proto = Title.prototype;
    _proto.render = function render() {
      var _this$props = this.props,
        prefix = _this$props.prefix,
        className = _this$props.className,
        others = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded);
      return /*#__PURE__*/_react["default"].createElement(_text["default"], (0, _extends2["default"])({}, others, {
        component: Tag,
        className: (className || '') + " " + prefix + "typography-title"
      }));
    };
    return Title;
  }(_react.Component);
  Title.propTypes = {
    prefix: _propTypes["default"].string
  };
  Title.defaultProps = {
    prefix: 'pro-layout-'
  };
  Title.displayName = Tag.toUpperCase();
  return Title;
};
exports["default"] = _default;