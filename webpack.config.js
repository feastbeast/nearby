var webpack = require('webpack');
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const common = {
  plugins: [
    new webpack.DefinePlugin({
      'IMAGE_URL': JSON.stringify('https://s3-us-west-1.amazonaws.com/apateez'),
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

const preSSR = {
  entry: `${SRC_DIR}/preSSR.js`,
  output: {
    filename: 'preSSR.js',
    path: DIST_DIR,
  }
};

module.exports = [
  Object.assign({}, common, server),
  Object.assign({}, common, client),
  Object.assign({}, common, preSSR)
];