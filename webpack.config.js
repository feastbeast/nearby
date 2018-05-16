var webpack = require('webpack');
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const common = {
  plugins: [
    new webpack.DefinePlugin({
      'IMAGE_URL': JSON.stringify('https://s3-us-west-1.amazonaws.com/apateez'),
      'BASE_URL': JSON.stringify('http://13.57.191.101:3004')
    })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
       }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  }
}

const client = {
  entry: `${SRC_DIR}/client.js`,
  output: {
    filename: 'nearby.js',
    path: DIST_DIR,
  }
};

const server = {
  entry: `${SRC_DIR}/server.js`,
  target: 'node',
  output: {
    filename: 'nearby-server.js',
    path: DIST_DIR,
    libraryTarget: "commonjs-module"
  },
};

module.exports = [
  Object.assign({}, common, server),
  Object.assign({}, common, client)
];