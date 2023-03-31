import HtmlWebpackPlugin from 'html-webpack-plugin';

const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const createFileName = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);
export default {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    filename: createFileName('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ],
  },
};
