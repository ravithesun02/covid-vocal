const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv=require('dotenv-webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/public/'),
        filename: "server.generated.js",
        publicPath: '/public/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' 
            ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
                }
        ]
    },
    plugins:[
        new Dotenv()
    ]

}

module.exports = config
