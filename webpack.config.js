const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const TerserPlugin = require("terser-webpack-plugin");
const isDev = process.env.NODE_ENV !== "production";
const pkg = require("./package.json");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "mmc-ui.js" : "mmc-ui.min.js",
    library: "mmc-ui",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader?cacheDirectory",
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json"
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]"
              },
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")]
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /(\.(eot|ttf|woff|woff2)|font)$/,
        loader: "file-loader",
        options: { outputPath: "fonts/" }
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: "file-loader",
        options: { outputPath: "images/" }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`mmc-ui ${pkg.version}`),
    new MiniCssExtractPlugin({
      filename: isDev ? "mmc-ui.css" : "mmc-ui.min.css"
    }),
    new WebpackObfuscator(
      {
        rotateStringArray: true
      },
      ["excluded_file_name.js"]
    )
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
