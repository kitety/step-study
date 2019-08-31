import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: {
        immer: true
      },
      dynamicImport: true,
      title: 'umi',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
