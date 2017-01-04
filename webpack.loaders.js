module.exports = [
    {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
            presets:['react','es2015']
        }
    },
    {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader?name=assets/fonts/[hash].[ext]',
    },
    {
        test: /\.(woff|woff2)$/,
        loader: "url?name=assets/fonts/[hash].[ext]&limit=10000"
    },
    {
        test: /\.gif/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
    },
    {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
    },
    {
        test: /\.png/,
        loader: "url-loader?limit=10000&mimetype=image/png"
    },
    {
        test: /\.css$/,
        exclude: /[\/\\]src[\/\\]/,
        loaders: [
            'style?sourceMap',
            'css'
        ]
    },
    {
        test: /\.scss$/,
        loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
        ],
    },
    {
        test: /\.css$/,
        loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
            'postcss-loader',
        ],
    },
    {
        test: /\.json$/,
        loader: 'json'
    }
];