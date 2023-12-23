"use strict";

exports.__esModule = true;
exports.useFiledState = useFiledState;
var _react = require("react");
function useFiledState(options, isCtrl) {
  if (isCtrl === void 0) {
    isCtrl = 'value' in options;
  }
  var _useState = (0, _react.useState)(options.defaultValue),
    value = _useState[0],
    setValue = _useState[1];
  var originSetState = (0, _react.useRef)();
  originSetState.current = function (action) {
    var val = typeof action === 'function' ? action(value) : action;
    if (!isCtrl) {
      setValue(val);
    }
    if (options.onChange) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      options.onChange.apply(options, [val].concat(args));
    }
  };
  var setState = (0, _react.useCallback)(function () {
    return originSetState.current.apply(originSetState, arguments);
  }, []);
  (0, _react.useEffect)(function () {
    if (isCtrl) {
      setValue(options.value);
    }
  }, [isCtrl, options.value]);
  return [isCtrl ? options.value : value, setState];
}