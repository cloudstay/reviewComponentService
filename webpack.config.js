const path = require('path');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './client/src/index.jsx'),
    output: {
        path: path.join(__dirname, './public'),
        filename: 'bundleReview.js'
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            include: path.join(__dirname, './client/src'),
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        },
        {
            test: /\.css$/,
            include: path.join(__dirname, './client/src'),
            loader: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(gif|svg|jpg|png)$/,
            include: path.join(__dirname, './public/images'),
            loader: "file-loader",
          }
        ]
    },
    plugins: [
        new BrotliGzipPlugin({
            asset: '[path].br[query]',
            algorithm: 'brotli',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            quality: 11
        }),
        new BrotliGzipPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
}