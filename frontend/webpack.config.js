var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var cssnano = require('cssnano');
var responsiveImages = require('postcss-responsive-images');
var webpack = require('webpack');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

var rewriteUrl = function (replacePath) {
  return function (req, opt) {  // gets called with request and proxy object
    var queryIndex = req.url.indexOf('?');
    var query = queryIndex >= 0 ? req.url.substr(queryIndex) : '';
    req.url = req.path.replace(opt.path, replacePath) + query;
  };
};

var config = {
  entry: {
    app: './index'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('../static'),
    publicPath: '/static'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [  
    new HtmlWebpackPlugin({
      inject: true,
      template: '../templates/index.html'
    }),
    new webpack.DefinePlugin({__IS_BROWSER__ : true }),
    new webpack.LoaderOptionsPlugin({    
      options: {
         postcss: [
		  cssnano({
	       autoprefixer: {
	        add: true,
	        remove: true,
	        browsers: ['last 2 versions']
	       },
	       safe: true,
	       discardComments: {
		    removeAll: true
	       }
          }),
          responsiveImages
         ]
      }
    })
 ],
 module: {
  loaders: [
    {
      test: /\.es6$/, exclude: /node_modules/, loader: 'babel-loader',
      query: {presets: ['es2015', 'stage-2', 'react']}
    },
    { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader',
      query: {presets: ['es2015', 'stage-2', 'react']}
    },
	{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
	  query: {
	   presets: ['es2015', 'stage-2', 'react']
	  }
	},
	{
		test: /\.scss$/,
		loaders: [
		  'style-loader',
	      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
	      'postcss-loader',
	      'sass-loader'
		]
	},
	{ test: /\.css$/, loader: 'style!css' },
	{ test: /\.(png|svg)$/, loader: 'url-loader?limit=100000' },
	{ test: /\.jpg$/, loader: 'file-loader' }
  ]
 },
 devServer: {
    proxy: [{
      path: new RegExp('/api/(.*)'),
      rewrite: rewriteUrl('/$1'),
      target: ''
    }]
  }
};

module.exports = config;
