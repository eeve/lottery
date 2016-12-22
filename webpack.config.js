var path = require('path');
var webpack = require('webpack');

var plugins = [
	new webpack.BannerPlugin('lottery machine'),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin()
];

var browsers = '{browsers:["last 2 version", "ie >= 8"]}';

module.exports = {
	context: __dirname,
	entry: {
		index: './app/index.js'
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].js'
	},
	plugins: plugins,
	devtool: '#source-map',
	module: {
		loaders: [, {
			test: /\.css$/,
			loader: 'style!css!autoprefixer?' + browsers
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			loader: 'vue'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue'
		},
		modulesDirectories: ["node_modules"]
	},
	devServer: {
		hot: true,
		quiet: false,
		colors: true,
		inline: true,
		compress: true,
		contentBase: './app',
		host: '0.0.0.0',
		port: 8000
	}
};
