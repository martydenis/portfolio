const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        // Page specific assets
        'index': './static/src/js/pages/index.js',
        'projects': './static/src/js/pages/projects.js',
        'contact':  './static/src/js/pages/contact.js',
        '404': './static/src/scss/pages/404.scss',

        // Comomn assets
        'global': './static/src/scss/global.scss',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../static/dist'),
        clean: true
    },
    resolve: {
        alias: {
            "@js": path.resolve(__dirname, '../static/src/js/'),
            "@scss": path.resolve(__dirname, '../static/src/scss/'),
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
    optimization: {
        // Extract shared modules (like jQuery, lodash, etc.) into a separate chunk
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                common: {
                    name: 'common',
                    minChunks: 2,  // Split out any modules used in at least 2 entry points
                    chunks: 'all',
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ]
};
