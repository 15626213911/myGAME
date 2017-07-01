var webpack = require('webpack');

module.exports = {
	entry: __dirname + '/src/scripts/run.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module:{
		loaders:[
			{test: /\.js$/, loader: 'babel-loader'}
		]
	}
}