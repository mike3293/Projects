var path = require('path');

module.exports = {
    entry: './test/all.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};