const path = require('path');

module.exports = {
    entry: "./client/dist/index.js",

    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: "bundle.js",    
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            options: {
                presets: ['react']
            },
        }],
    },

    devServer: {
        contentBase: path.resolve(__dirname, './client/dist'),
        compress: true,
        port: 8000,
        historyApiFallback: {
              rewrites: [
                { from: /^\/app/, to: '/app/index.html' }
              ]
            }
          }


};