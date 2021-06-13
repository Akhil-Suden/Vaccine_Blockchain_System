const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    "track":"./app/javascripts/track.js",
    "record":"./app/javascripts/record.js",
    "order":"./app/javascripts/order.js",
    "register":"./app/javascripts/register.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  plugins: [

    new CopyWebpackPlugin([
      { from: "./app/index.html", to: "index.html" }, { from: "./app/Track.html", to: "Track.html" },
      , { from: "./app/Record.html", to: "Record.html" },{ from: "./app/Order.html", to: "Order.html" }
      , { from: "./app/Register.html", to: "Register.html" }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  module: {
    rules: [
      {

       test: /\.css$/,
       use: [ "style-loader", "css-loader" ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: "json-loader" },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["transform-runtime", {
            "regenerator": true,
        }]
        }
      }
    ]
  },
  node: {

    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
