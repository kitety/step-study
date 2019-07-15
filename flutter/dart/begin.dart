// 入口方法

// 方式1
// main(){
//   print('1212');
// }

// 方式2
// main方法没有返回值
import 'dart:math';

void main() {
  // 打印
  print('1212');
  // 声明变量，dart里面有命名规则
  // 两者不能一同写
  var a = 1; // 任意类型，dart会自动推断类型
  String ccc = 'hello';
  int b = 12;
  print(ccc);
  // const 值不变，一开始就赋值
  // final 可以开始不赋值，只能赋值一次
  const Pi = 3.14;
  final PI = 3.14159;
  // final运行时常量
  final Timea = DateTime.now();
  // const编译时常量
  // const Timeb=DateTime.now();
  print(Timea);
}
