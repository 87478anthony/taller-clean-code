const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const TYPESCRIPT_RULES = {
  test: /\.ts?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const serverConfig = {
  entry: './api/server.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};

const clientConfig = {
  entry: './src/wcIndex.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
  module: {
    rules: [TYPESCRIPT_RULES],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};

module.exports = [serverConfig, clientConfig]
