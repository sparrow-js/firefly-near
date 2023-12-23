"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RenderOperations = exports.Card = void 0;
var _loading = _interopRequireDefault(require("@alifd/next/lib/loading"));
var _box = _interopRequireDefault(require("@alifd/next/lib/box"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _form = _interopRequireDefault(require("@alifd/next/lib/form"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _button = _interopRequireDefault(require("@alifd/next/lib/button"));
var _icon = _interopRequireDefault(require("@alifd/next/lib/icon"));
var React = _interopRequireWildcard(require("react"));
var _classnames4 = _interopRequireDefault(require("classnames"));
var _moment = _interopRequireDefault(require("moment"));
var _cardHeader = require("../card-header");
var _useFiledState2 = require("../../../utils/hooks/useFiledState");
var _excluded = ["content", "action", "onClick"],
  _excluded2 = ["title", "description", "visibleButtonCount", "className", "actionBar", "actionButtons", "loading", "tagGroup", "style", "hasCollapse", "isDialogCard", "explanation", "explanationTooltipProps", "children", "segmentLine", "defaultCollapse", "setCollapse", "isCollapse", "hasDivider", "operations", "operationConfig", "lastSaveTime", "bodyPadding", "text"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var bizCssPrefix = 'pro-layout';
var cssPrefix = bizCssPrefix + "-pro-card";
var getContentParentElement = function getContentParentElement(ele, i) {
  if (i === void 0) {
    i = 0;
  }
  if (!ele || i > 100) {
    return;
  }
  i++;
  if (ele.parentElement && ele.clientHeight <= ele.parentElement.clientHeight) {
    return getContentParentElement(ele.parentElement, i);
  } else {
    return ele;
  }
};
var RenderOperations = function RenderOperations(_ref) {
  var _classnames;
  var _ref$operations = _ref.operations,
    operations = _ref$operations === void 0 ? [] : _ref$operations,
    _ref$operationConfig = _ref.operationConfig,
    operationConfig = _ref$operationConfig === void 0 ? {} : _ref$operationConfig,
    lastSaveTime = _ref.lastSaveTime;
  var _operationConfig$alig = operationConfig.align,
    align = _operationConfig$alig === void 0 ? 'center' : _operationConfig$alig,
    _operationConfig$fixe = operationConfig.fixed,
    fixed = _operationConfig$fixe === void 0 ? false : _operationConfig$fixe,
    showSaveTime = operationConfig.showSaveTime;
  var _React$useState = React.useState(null),
    fixPlaceHolder = _React$useState[0],
    setPlaceHolder = _React$useState[1];
  React.useEffect(function () {
    return function () {
      if (fixPlaceHolder) {
        fixPlaceHolder.remove();
      }
    };
  }, [fixPlaceHolder]);
  var operationRef = React.useRef();
  var cls = (0, _classnames4["default"])(cssPrefix + "-operation-container", (_classnames = {}, _classnames[cssPrefix + "-operation-fixed"] = fixed, _classnames));
  if (fixed) {
    var ele = getContentParentElement(operationRef.current);
    if (ele !== operationRef.current) {
      if (ele && !fixPlaceHolder) {
        var _fixPlaceHolder = document.createElement('div');
        _fixPlaceHolder.style.setProperty('height', '60px');
        _fixPlaceHolder.setAttribute('id', 'fixPlaceHolder');
        setPlaceHolder(_fixPlaceHolder);
        ele.append(_fixPlaceHolder);
      } else if (ele) {
        ele.append(fixPlaceHolder);
      }
    }
  } else if (fixPlaceHolder) {
    fixPlaceHolder.remove();
  }
  var saveTime = showSaveTime ? /*#__PURE__*/React.createElement(_button["default"], {
    text: true
  }, /*#__PURE__*/React.createElement(_icon["default"], {
    type: "success",
    style: {
      color: '#1DC11D'
    }
  }), (0, _moment["default"])(lastSaveTime).fromNow()) : null;
  return operations && operations.length > 0 ? /*#__PURE__*/React.createElement("div", {
    ref: operationRef,
    className: cls
  }, /*#__PURE__*/React.createElement(_box["default"], {
    spacing: 8,
    direction: "row",
    justify: align,
    align: "center"
  }, operations.map(function (operation, index) {
    var content = operation.content,
      action = operation.action,
      onClick = operation.onClick,
      otherOperationProps = (0, _objectWithoutPropertiesLoose2["default"])(operation, _excluded);
    var BtnComp;
    if (action === 'submit') {
      BtnComp = _form["default"].Submit;
      otherOperationProps.validate = true;
      otherOperationProps.htmlType = 'submit';
    } else if (action === 'reset') {
      BtnComp = _form["default"].Reset;
    } else {
      BtnComp = _button["default"];
    }
    if (onClick) {
      otherOperationProps.onClick = onClick;
    }
    return /*#__PURE__*/React.createElement(BtnComp, (0, _extends2["default"])({
      key: "operation-" + index
    }, otherOperationProps), content);
  }), saveTime)) : null;
};
exports.RenderOperations = RenderOperations;
var Card = function Card(props) {
  var _classnames2, _classnames3;
  var title = props.title,
    description = props.description,
    visibleButtonCount = props.visibleButtonCount,
    className = props.className,
    actionBar = props.actionBar,
    actionButtons = props.actionButtons,
    loading = props.loading,
    tagGroup = props.tagGroup,
    style = props.style,
    hasCollapse = props.hasCollapse,
    isDialogCard = props.isDialogCard,
    explanation = props.explanation,
    explanationTooltipProps = props.explanationTooltipProps,
    children = props.children,
    segmentLine = props.segmentLine,
    defaultCollapse = props.defaultCollapse,
    setCollapse = props.setCollapse,
    isCollapse = props.isCollapse,
    hasDivider = props.hasDivider,
    operations = props.operations,
    operationConfig = props.operationConfig,
    lastSaveTime = props.lastSaveTime,
    bodyPadding = props.bodyPadding,
    text = props.text,
    otherProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded2);
  var _useFiledState = (0, _useFiledState2.useFiledState)({
      value: isCollapse,
      defaultValue: defaultCollapse,
      onChange: setCollapse
    }, 'isCollapse' in props),
    collapsed = _useFiledState[0],
    _onCollapse = _useFiledState[1];
  var cardBody = children;
  var layout = 'flow';
  var content = /*#__PURE__*/React.createElement(React.Fragment, null, (title || hasCollapse || actionBar || actionButtons || tagGroup) && /*#__PURE__*/React.createElement(_cardHeader.CardHeader, {
    text: text,
    title: title,
    description: description,
    visibleButtonCount: visibleButtonCount,
    hasCollapse: hasCollapse,
    actionBar: actionBar,
    actionButtons: actionButtons,
    tagGroup: tagGroup,
    collapsed: collapsed,
    onCollapse: function onCollapse() {
      return _onCollapse(!collapsed);
    },
    explanation: explanation,
    explanationTooltipProps: explanationTooltipProps,
    hasDivider: hasDivider
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames4["default"])('pro-layout-card-body', {})
  }, !collapsed && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames4["default"])('pro-layout-card-body__panel', "pro-layout-card-body__panel--" + layout, (_classnames2 = {}, _classnames2["pro-layout-card-body__nopadding"] = bodyPadding, _classnames2))
  }, cardBody)), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames4["default"])('pro-layout-card-footer-actions', {})
  }, /*#__PURE__*/React.createElement(RenderOperations, {
    operations: operations,
    operationConfig: operationConfig,
    lastSaveTime: lastSaveTime
  })));
  return /*#__PURE__*/React.createElement("div", (0, _extends2["default"])({
    className: (0, _classnames4["default"])('pro-layout-card', (_classnames3 = {
      'pro-layout-card--dialog': isDialogCard
    }, _classnames3[className] = className, _classnames3)),
    style: style || {}
  }, otherProps, {
    "data-name": "Card"
  }), loading ? /*#__PURE__*/React.createElement(_loading["default"], {
    visible: true,
    inline: false,
    size: "medium"
  }, content) : content);
};
exports.Card = Card;
Card.defaultProps = {
  segmentLine: false,
  loading: false,
  isDialogCard: false,
  hasCollapse: false,
  defaultCollapse: false
};
Card.displayName = 'Card';