const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  }
};

module.exports = config;