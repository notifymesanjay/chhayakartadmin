const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.ASPNETCORE_ENVIRONMENT === 'Development';
//const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = (env) => {
  var config = {
    entry: {
      main: ['./wwwroot/src/index.js'],
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        inject: false,
        minify: false,
        filename: '../../Views/Shared/_LayoutGenerated.cshtml',
        template: './Views/Shared/_Layout.cshtml',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    output: {
      filename: '[name].bundle.[hash].js',
      path: path.resolve(__dirname, 'wwwroot/dist'),
      publicPath: '/dist/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };

  if (isDevelopment) {
    config.devtool = 'inline-source-map';
  } else {
    config.optimization.minimizer = [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ];
    // config.devtool = 'source-map';
  }

  return config;
};
