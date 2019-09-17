// dva-immer的另一种用法
import useImmer from 'dva-immer'
export const dva = {
  config: {
    onError (e) {
      e.preventDefault();
      console.error(e.message);
    },
    // 看dva源码，另一种方式使用immer
    // ...useImmer()
  },
  plugins: [
    require('dva-logger')(),
  ],
};
// export const locale = {
//   default: 'en-US', //默认语言 zh-CN，如果 baseSeparator 设置为 _，则默认为 zh_CN
// };
