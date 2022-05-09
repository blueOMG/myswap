const $BigNumber = require('bignumber.js');
const startools:any = {
  // bigNumber 转换， 参数： （值、精度）,去掉精度、
  mathpow(data:any, num:any) {
    //精度
    var n1;
    if (!data) {
      n1 = $BigNumber(data);
    } else {
      n1 = $BigNumber(data.toString());
    }
    var n2 = $BigNumber(Math.pow(10, num ? num : 8));

    var res = n1.div(n2);
    return res.toString();
  },
  // 值 精度， 给值添加精度
  mathlog(data:any, num:any) {
    var n1 = $BigNumber(data);
    var n2 = $BigNumber(Math.pow(10, num ? num : 8));
    return n1.multipliedBy(n2).toString();
  },
  // 计算加法
  plus(a:any, b:any) {
    if (a !== '' && b !== '') {
      const n1 = $BigNumber(a);
      const n2 = $BigNumber(b);
      return (n1.plus(n2)).toString()
    } else {
      return 0
    }
  },
  // 计算减法
  minus(a:any, b:any) {
    if (a !== '' && b !== '') {
      const n1 = $BigNumber(a);
      const n2 = $BigNumber(b);
      return (n1.minus(n2)).toString()
    } else {
      return 0
    }
  },
  // 转为bignumber 计算乘法
  multiplication(a:any, b:any) {
    if (a !== '' && b !== '') {
      const n1 = $BigNumber(a);
      const n2 = $BigNumber(b);
      return (n1.multipliedBy(n2)).toString()
    } else {
      return 0
    }
  },
  // 计算除法
  division(a:any, b:any) {
    if (a !== '' && b !== '') {
      const n1 = $BigNumber(a);
      const n2 = $BigNumber(b);
      return (n1.div(n2)).toString()
    } else {
      return 0
    }
  },
}
export default startools