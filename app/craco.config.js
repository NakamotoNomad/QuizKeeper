const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // Add fallback for 'stream' module
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                stream: require.resolve('stream-browserify'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify'),
                path: require.resolve('path-browserify'),
                crypto: require.resolve('crypto-browserify'),
                buffer: require.resolve('buffer/'),
            };

            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                }),
            ];

            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: NodePolyfillPlugin,
        },
    ],
};
