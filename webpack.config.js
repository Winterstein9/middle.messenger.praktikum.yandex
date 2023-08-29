const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'
const target = 'web'
const devtool = devMode ? 'source-map' : undefined

module.exports={
    mode,
    target,
    devtool,
    devServer: {
        port:3000,
        open:false,
        historyApiFallback: true
    },
    entry: path.resolve(__dirname, 'engine', 'navigator.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: "www.[contenthash].js",
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: path.resolve(__dirname, "index", "index.html")
        }
    )],
    module: {
        rules:[
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            {
                test: /\.(styl|css)$/,
                use: ["style-loader", "css-loader", "stylus-loader"],
            },
            {
                test: /\.ts$/,
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                      configFile: path.resolve(__dirname, 'tsconfig.json'),
                    },
                  },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.(hbs|handlebars)$/, 
                loader: "handlebars-loader",
            }
        ]
    }
}
