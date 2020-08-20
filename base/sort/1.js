/**
 * splice (n,m,a) 从n开始删除m个元素，将a添加到n的前面，并且返回删除的数组，原来的数组会改变
 */

// let arr = [10, 20, 30, 40];

// let res = arr.splice(1, 2, 50);
// console.log(arr)
// console.log(res)

/* 冒泡 n-1
让数组中的当前项和后一项进行比较，如果当前项比后一项大，则交换
*/
let arr = [12, 8, 24, 16, 1,400,-56];
/**
 *
 * @param {*} arr
 */
function bubble(ary = []) {
  let temp;
  // 爱层控制轮数
  for (let i = 0; i < ary.length - 1; i++) {
    // 里层控制每轮比较次数
    for (let j = 0; j < ary.length - 1 - i; j++) {
      if (ary[j] > ary[j + 1]) {
        temp = ary[j];
        ary[j] = ary[j + 1];
        ary[j + 1] = temp;
      }
    }
  }
  return ary;
}
// console.log(bubble(arr));

// 插入排序
function insert(arr = []) {
  let handle = [];
  handle.push(arr[0]);
  // 从第二项看，开始是循环
  for (let i = 1; i < arr.length; i++) {
    const A = arr[i];
    // 和handle比较
    for (let j = handle.length - 1; j >= 0; j--) {
      const B = handle[j];
      if (A > B) {
        handle.splice(j + 1, 0, A);
        break;
      } else if (j === 0) {
        handle.unshift(A);
        break;
      }
    }
  }
  return handle;
}
// console.log(insert(arr));

// 快速排序
function quick(arr = []) {
  // 结束递归
  if (arr.length <= 0) return arr;
  // 找到数组中间项，从原来的数组中删除
  const middleIdx = Math.floor(arr.length / 2);
  const middleVal = arr.splice(middleIdx, 1)[0];

  // 准备左右两边的数组，循环。小的放在左边
  let arrLeft = [];
  let arrRight = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element < middleVal) {
      arrLeft.push(element);
    } else {
      arrRight.push(element);
    }
  }
  // 递归 左右两边 一直到排好序
  return quick(arrLeft).concat(middleVal, quick(arrRight));
}
console.log(quick(arr));
