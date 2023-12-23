"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * 用于检测组件的 displayName
 */
var checkComName = function checkComName(checkElement, sourceComp, compDisplayName) {
  var _sourceComp$displayNa;
  var compDisplayNames = compDisplayName || [(_sourceComp$displayNa = sourceComp.displayName) === null || _sourceComp$displayNa === void 0 ? void 0 : _sourceComp$displayNa.toLowerCase()];
  var displayNames = (Array.isArray(compDisplayNames) ? compDisplayNames : [compDisplayNames]).filter(function (item) {
    return item;
  }).map(function (item) {
    return item.toLowerCase();
  });
  if (!displayNames || !displayNames.length) {
    return false;
  }
  if ( /*#__PURE__*/React.isValidElement(checkElement)) {
    var _checkElement$type, _checkElement$type$di;
    var checkElementDisplayName = (_checkElement$type = checkElement.type) === null || _checkElement$type === void 0 ? void 0 : (_checkElement$type$di = _checkElement$type.displayName) === null || _checkElement$type$di === void 0 ? void 0 : _checkElement$type$di.toLowerCase();
    if (checkElementDisplayName) {
      return displayNames.includes(checkElementDisplayName);
    }
    return false;
  }
  return false;
};
var _default = checkComName;
exports["default"] = _default;