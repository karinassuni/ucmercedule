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
      },
      // Also performs JSX transformation
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  // react-hot-loader references React, but we're using preact so resolve such
  // references to preact-compat instead
  // Only use react-hot-loader (and this preact-compat) in development for HMR
  resolve: {
    alias: {
      react: path.resolve(path.join(__dirname, "./node_modules/preact-compat"))
    }
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
