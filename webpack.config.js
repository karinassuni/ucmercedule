const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /CourseSelect\.mustache$/,
        loader: "mustache-loader",
        options: {
          render: require("./app/CourseSelect/Fall_2018_Courses_View.json")
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin("./dist/*")
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    host: "0.0.0.0"
  },
  mode: "development"
};
