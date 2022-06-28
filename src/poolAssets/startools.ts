import { formatUnits,parseUnits } from 'ethers/lib/utils';
const $BigNumber = require('bignumber.js');
const startools:any = {
  // bigNumber 转换， 参数： （值、精度）,去掉精度、
  mathpow(data:any, num:any) {
    let res:any;
    try {
      res = formatUnits(data.toString(),num)
    } catch (error) {
      
    }
    return (res || 0).toString();
  },
  // 值 精度， 给值添加精度
  mathlog(data:any, num:any) {
    let res:any;
    try {
      res = parseUnits(data.toString(),num)
    } catch (error) {
      
    }
    return res.toString();
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
  // 保留小数  不去四舍五入
  saveNumber(str:string,index:number = 6){
    if(!str.includes('.')) return str
    const list:any = str.split('.');
    return `${list[0]}.${list[1].slice(0,index)}`
  }
}
export default startools