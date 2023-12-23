const block = require('./sub/block');
const blockCell = require('./sub/block-cell');
const blockCellItem = require('./sub/block-cell-item');
const page = require('./sub/page');
const pageHeader = require('./sub/page-header');
const pageFooter = require('./sub/page-footer');
const pageAside = require('./sub/page-aside');
const pageNav = require('./sub/page-nav');
const pageContent = require('./sub/page-content');
const p = require('./sub/p');
const pCell = require('./sub/p-cell');
const row = require('./sub/row');
const col = require('./sub/col');
const rowColContainer = require('./sub/row-col-container');
const proCard = require('./pro-card/meta');

module.exports = [
  { ...block },
  { ...blockCell },
  { ...blockCellItem },
  { ...pageHeader },
  { ...pageFooter },
  { ...pageContent },
  { ...pageAside },
  { ...pageNav },
  { ...page },
  { ...p },
  { ...pCell },
  { ...row },
  { ...col },
  { ...rowColContainer },
  { ...proCard }
];
