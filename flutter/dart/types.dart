void main() {
  String str = 'hello';
  // 三个引号可以换行
  String str1 = '''hello
  world''';
  // 字符串拼接的两种方式
  String strAdd = str1 + str;
  print(strAdd);
  print('hello $str');
  /**
   * int 整型
   * double 浮点
   */
  int numa = 12;
  // 浮点既可以是整型，也可以是浮点型
  double numb = 2.3;
  // 加减乘除取余
  /* 布尔类型 true/false */
  bool isShow = false;
  /* if语句与在js的一样 */
  if (!isShow) {
    print('hidden');
  } else {
    print('show');
  }
  /* List 数组 集合 */
  var l1 = [1, 2, 3];
  List<int> l2 = [2, 3, 5];
  var l3 = <dynamic>[];
  l1.insert(0, 555);
  l1.add(8);
  print(l1[1]);
  // 指定类型
  var l4 = new List<String>();
  l3.add('hello');

  /* Map 有点像json */
  var person = {"name": 'kitety', "age": 23};
  print(person['name']);
  var person2 = new Map();
  person2['age'] = 23;
  /* is 关键词来判断类型 */
  print(person2 is Map);
}
