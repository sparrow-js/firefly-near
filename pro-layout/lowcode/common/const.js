const BLOCK_RESIZE_MAP = require('./const/block-resize-map');
const {
  DEFAULT_BLOCK_SCHEMA,
  DEFAULT_BLOCK_CELL_SCHEMA,
} = require('./const/block-schema');

function deepClone(obj) {
  const newObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
      }
    }
  }
  return newObj;
}

module.exports = {
  BLOCK_RESIZE_MAP,
  DEFAULT_BLOCK_SCHEMA,
  DEFAULT_BLOCK_CELL_SCHEMA,
  getDefaultBlockSchema: () => deepClone(DEFAULT_BLOCK_SCHEMA),
  getDefaultBlockCellSchema: () => deepClone(DEFAULT_BLOCK_CELL_SCHEMA)
};
