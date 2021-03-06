const path = require('path');

module.exports = {
    entry: path.join(__dirname, './client/src/index.jsx'),
    output: {
        path: path.join(__dirname, './client/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            include: path.join(__dirname, './client/src'),
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}