/* 1.使用console代表控制台 */
// console.log('log')
// console.info('info')
// console.error('error')
// console.warn('warn')
// console.dir
// console.time
// console.tiemEnd
// console.trace
// console.log

/* 2.全局作用域 */
/**
 * 全局作用域global指的是不需要加载任何模块就可以使用的变量、函数、类
 * 定义全局变量会成为global的属性
 * 不要使用clear关键字，全局污染
 * setTimeout clearTimeout
 * setInterval clearInterval
 * unref和ref
 */
{
    // let test = function () {
    //     console.log('callback')
    // }
    // let timer = setInterval(() => {
    //     test
    // }, 1000);
    // timer.unref();
    // setTimeout(() => {
    //     timer.ref();
    // }, 3000);
}

/* 3.函数 */
/**
 * require
 * 模块加载过程
 * require.resolve供外部调用，用于从模块名取到绝对路径
 * 模板缓存(require.cache);
 * require.main
 * 模块导出
 */
// module.exports require module filename dirname
