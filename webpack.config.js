// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './app-browser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' /// browser keeps looking for bundle.js even if this is named something different...
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            // options: {
            //     includePaths: ["absolute/path/a", "absolute/path/b"]
            // }
        }]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(), // was glitching out on perfectly normal "let" code...
    // new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;



// module.exports = {
// 	entry: "./app-browser.js",
// 	output: {
// 		path: __dirname,
// 		filename: "bundle.js"
// 	},
// 	devtool: 'source-map',
// 	module: {
// 		loaders: [
// 			{ test: /\.css$/, loader: "style!css" }, // could tell this to be loaders: ['style','css']?
// 			{
//                 test: /\.scss$/,
//                 loaders: ["style", "css?sourceMap", "sass?sourceMap"]
//             }
// 		]
// 	}
// }