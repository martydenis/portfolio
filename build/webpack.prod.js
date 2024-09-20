const { merge } = require('webpack-merge');

module.exports = merge(require("./webpack.base.js"), {
    mode: "production",
    output: {
        clean: true,
    },
    devtool: "source-map",
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
});
