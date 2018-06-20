const path = require('path');

module.exports = {
  entry: './src/wild-weather-api.js',
  output: {
    filename: 'weather5e.js',
    path: path.resolve(__dirname, 'dist')
  }
};
