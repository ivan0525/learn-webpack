const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'production'
const config = require('./config')[isDev ? 'dev' : 'prod']
module.exports = {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: '3300',
    open: true,
    quiet: false,
    compress: true,
    overlay: { // 编译出错，全屏提示
      warnings: true,
      errors: true
    }
  },
  devtool: 'cheap-module-eval-source-map', //开发环境下使用(帮我们将编译后的代码，映射回原始代码)
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(c|le)ss$/,
        // style-loader动态创建style标签，将css插入到head中。
        // css-loader负责处理@import等语句。
        // postcss-loader和autoprefixer，自动生成浏览器兼容性前缀。
        // less-loader 负责处理编译.less文件，将其转为css
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')()
              ]
            }
          }
        }, 'less-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10k
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets'
            }
          }
        ],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      config: config.template
    })
  ]
}
