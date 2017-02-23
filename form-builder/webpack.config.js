const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      },
      include: __dirname
    },
    {
      exclude: /node_modules/,
      test: /\.scss$/,
      loaders: [
        'style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass'
      ],
      include: __dirname
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
