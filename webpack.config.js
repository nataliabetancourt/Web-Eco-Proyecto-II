const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        signup: './src/signup.js',
        login: './src/login.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
    }
};
