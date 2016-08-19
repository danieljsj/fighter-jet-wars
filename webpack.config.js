module.exports = {
	entry: "./app-browser.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" }, // could tell this to be loaders: ['style','css']?
			{
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }
		]
	}
}