const path = require('path');

resolveApp = relativePath => {
  return path.resolve(relativePath);
};

module.exports = {
  build: resolveApp('./build'),
  js: resolveApp('./src/js'),
  style: resolveApp('./src/style/main.scss')
};

