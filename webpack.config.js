const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV === "production";
const indexHTML =
  process.env.NODE_ENV === "production"
    ? resolve(__dirname, "public", "index.html")
    : resolve(__dirname, "src", "index.html");

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./src/index.tsx",
  },
  // Where the transpiled code will be
  output: {
    // The path to the transpiled code
    path: resolve(__dirname, "dist"),
    // How the transpiled and bundled code will be called
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".js", ".jsx", ".ts"],
    fallback: {
      //   fs: false,
      //   tls: false,
      //   net: false,
      //   path: false,
      //   zlib: false,
      //   http: false,
      //   https: false,
      //   stream: false,
      //   crypto: false,
      //   "crypto-browserify": resolve("crypto-browserify"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: indexHTML,
      filename: "index.html",
      inject: "body",
    }),
  ],
};

if (isProduction) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    static: resolve(__dirname, "public"),
    compress: true,
    hot: true,
    host: "localhost",
    port: 8066,
  };
}

module.exports = config;
