const { resolve, join } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const path = require("path")
// const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
// const CopyPlugin = require("copy-webpack-plugin")

const isProduction = process.env.NODE_ENV === "production"
const indexHTML =
  process.env.NODE_ENV === "production"
    ? resolve(__dirname, "public", "index.html")
    : resolve(__dirname, "src", "index.html")

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
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      "crypto-browserify": resolve("crypto-browserify"),
      os: resolve("os-browserify"),
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
                  return [require("autoprefixer")]
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
        test: /\.(png|jp(e*)g|svg|gif)$/,
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
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
    }),
    new HtmlWebpackPlugin({
      template: indexHTML,
      filename: "index.html",
      inject: "body",
      favicon: join(__dirname, "src", "assets", "images", "favicon.svg"),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "./src/assets/images/favicon.svg", to: "" },
    //     { from: "./src/manifest.json", to: "" },
    //     { from: "./src/assets/pwa/logo192.png", to: "" },
    //     { from: "./src/assets/pwa/logo512.png", to: "" },
    //     { from: "./src/assets/.well-known", to: "" },
    //   ],
    // }),
    // new WorkboxWebpackPlugin.InjectManifest({
    //   swSrc: "./src/sw.js",
    //   swDest: "sw.js",
    //   maximumFileSizeToCacheInBytes: 100000000,
    //   mode: process.env.NODE_ENV,
    // }),
  ],
}

if (isProduction) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  }
} else {
  config.devServer = {
    static: resolve(__dirname, "public"),
    compress: true,
    hot: true,
    host: "localhost",
    port: 8067,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  }
}

module.exports = config
