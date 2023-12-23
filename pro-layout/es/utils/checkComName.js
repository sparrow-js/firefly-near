import * as React from 'react';

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
export default checkComName;