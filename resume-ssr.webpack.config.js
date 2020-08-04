const path = require('path');

module.exports = {
    target: 'node',
    entry: {
        'resume-ssr.min': './resume-ssr.js',
    },
    output: {
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
