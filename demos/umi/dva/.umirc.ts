import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  hash:true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: {
        immer: true
      },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loading.js'
      },
      chunks: ['vendors', 'umi'],
      title: 'umi',
      dll: {
        include: ['dva/router', 'dva/saga', 'dva/fetch'],
        exclude: ['@babel/runtime']
      },
      locale: {
        default: 'zh-CN', //默认语言 zh-CN，如果 baseSeparator 设置为 _，则默认为 zh_CN
        // 后面的设置的权重更高
        baseNavigator: false, // 为true时，用navigator.language的值作为默认语言
        antd: true, // 是否启用antd的<LocaleProvider />
        baseSeparator: '-', // 语言默认分割符 -
      },
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](dva|antd|react|react-dom|react-router|react-router-dom)[\\/]/,
        },
        commons: {
          name: 'commons',
          chunks: 'async',
          minChunks: 2,
          minSize: 0,
        },
      },
    });
  },
}

export default config;
