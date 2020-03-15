const webpack = require('webpack');
const { version } = require('./package.json');

module.exports = (env={}, args={}) => {

    const config = {
        mode: env.dev ? 'development' : 'production',
        entry : {
            zsim: './src/main.js',
            'examples/ksim3/ksim': './examples/ksim3/src/main.js',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
            library: 'zsim',
            libraryTarget: 'window',
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
            new webpack.DefinePlugin({ __DEV__: env.dev }),
            new webpack.BannerPlugin(`zsim ${version}`)
        ],
        resolve: {
            extensions: ['.js', '.json'],
            alias: { },
        },
        devtool: env.dev && 'source-map',
    };

    return config;
};
