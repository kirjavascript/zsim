const webpack = require('webpack');
const path = require('path');

module.exports = (env={}, args={}) => {

    const config = {
        mode: env.dev ? 'development' : 'production',
        entry : {
            main: './src/main.js',
        },
        output: {
            path:     path.join(__dirname, 'examples'),
            filename: '[name].js',
            library: 'zsim',
            libraryTarget: 'window',
            auxiliaryComment: 'zsim - embeddable cube simulator',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: env.dev ? /node_modules/ : void 0,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                ],
                                plugins: [
                                ]
                            }
                        }
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: env.dev
            }),
        ],
        resolve: {
            extensions: ['.js', '.json'],
            alias: { },
        },
        devtool: env.dev && 'source-map',
    };

    return config;
};
