// 矿池的配置信息
const poolData:any = {
  cooperate_pool: [
    // {
    //   coin_in: '0x1b5775beb8343729Be3934d5C7DbE5E63Bd8eD72', // 质押币
    //   coin_out: '0xe42c011d14dae3234c02414a3663f2c572be56b5', // 产出币
    //   stake_pool: '0xc596bCee9dFE2F9E91765feA58C3fdc73bE0730E' , // 矿池
    //   demical_in: 18, //质押币精度
    //   demical_in_str: '1000000000000000000', // 质押币精度字符串
    //   demical_out: 18, // 产出币精度
    //   name_in: 'GBT-USDT-LP测试', // 质押币名称
    //   name_out: 'TQ测试', // 产出币名称
    //   start: '2022/5/1 20:13:00', // 挖矿开始时间
    //   end: '2022/11/27 20:13:00', // 挖矿结束时间
    //   total: 75000, // 总量
    //   id: 2, // id
    // },
    {
      coin_in: '0x1b5775beb8343729Be3934d5C7DbE5E63Bd8eD72', // 质押币
      coin_out: '0xe42c011d14dae3234c02414a3663f2c572be56b5', // 产出币
      stake_pool: '0xEdB31501E27D0276235d236C08eFAEdD9b94eC34' , // 矿池
      demical_in: 18, //质押币精度
      demical_in_str: '1000000000000000000', // 质押币精度字符串
      demical_out: 18, // 产出币精度
      name_in: 'GBT-USDT-LP', // 质押币名称
      name_out: 'TQ', // 产出币名称
      start: '2022/5/11 20:13:00', // 挖矿开始时间
      end: '2022/11/27 20:13:00', // 挖矿结束时间
      total: 75000, // 总量
      id: 1, // id
    }
  ]
}
export default poolData;