const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: './src/js/home/index.js',
    sandbox: './src/js/sandbox.js',
    pagenotfound: './src/scss/404.scss',
    game: ['./src/js/game.js', './src/scss/game.scss'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      "@js": path.resolve(__dirname, '../src/js/'),
      "@scss": path.resolve(__dirname, '../src/scss/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:js)$/,
        exclude: /node_modules|build/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //      },
  //    },
  //  },
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ]
};