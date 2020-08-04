const path = require('path');

const {ENTRY} = process.env;

const entry = ENTRY
    .split('\n')
    .map((filename) => {
        return `./${filename}`;
    })
    .reduce((a, filename) => {
        const entryname = filename
            .replace('./static/', '')
            .replace(/\.js$/, '');

        a[entryname] = filename;

        return a;
    }, {});

module.exports = {
    entry: {
        ...entry,
        'js/bundle.min': './assets/js/bundle.js'
    },
    output: {
        path: path.resolve(__dirname, './public')
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
    },
    externals: {
        'react': 'React',
        'prop-types': 'PropTypes',
        'react-dom': 'ReactDOM'
    }
};
