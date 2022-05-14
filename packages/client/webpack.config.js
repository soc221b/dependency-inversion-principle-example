const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },

  devtool: "source-map",

  devServer: {
    port: 8080,
  },

  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new webpack.CleanPlugin(),
  ],
};
