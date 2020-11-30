const path = require("path");
class P {
  apply (compiler) {
    compiler.hooks.done.tap("Hello World Plugin", (
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
    ) => {
      // console.log("Hello World!");
    });
  }
}
module.exports = {
  mode: "development",
  entry: "./src/index2.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    // 指定路径
    modules: ["node_modules", path.resolve(__dirname, "loader")],
    // alias: {
    //   loader1:path.resolve(__dirname, "loader", "loader1")
    // }
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // 两个路径
          path.resolve(__dirname, "loader", "style-loader"),
          path.resolve(__dirname, "loader", "css-loader"),
          path.resolve(__dirname, "loader", "less-loader"),
        ],
      },
      {
        test: /\.jpg$/,
        // 根据图片生成md5 发射到dist目录下 还会返回图片路径
        // use: 'file-loader'
        use: {
          loader: 'url-loader',
          options: {
            limit: 200 * 1024//200k
          }
        }
        // url-loader会处理路径 file-loader 发射出来
      },
      {
        test: /\.js$/,
        use: {
          loader: 'banner-loader',
          options: {
            text: 'kitety',
            filename: path.resolve(__dirname, "banner.js")
          }
        }
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ["@babel/preset-env"]
        //   }
        // }
        //  {
        //   loader: "loader1",
        // },
        //  ["loader1", "loader2"],
        // [
        //   两个路径
        //   path.resolve(__dirname, "loader", "loader1"),
        //   'loader1'
        // ],
      },
    ],
  },
  plugins: [new P()],
  devtool: 'source-map'
};
