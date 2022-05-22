import React, {  useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import daoPoolConfig from './../../poolAssets/daoPoolConfig'
import daoabi from './../../poolAssets/daoabi'
import Web3 from 'web3'
import startools from '../../poolAssets/startools'
import CountDown from '../../components/CountDown'
import { Modal, Toast } from 'antd-mobile'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  padding-top: 25px;
  margin-top: -95px;
  z-index: 10;
  * {
    margin: 0;
    padding: 0;
  }
  .banner_view {
    
    width: 100%;
    height: auto;
    margin: auto;
    img {
      width: 100%
    }
  }
  .nodata {
    width: 100%;
    font-size: 14px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }
  .tab_view {
    margin-top: 45px;
    display: flex;
    align-items: center;
    margin-bottom: 26px;
    .tab_item {
      padding: 0 10px;
      padding-bottom: 18px;
      position: relative;
      .tab_item_txt {
        width: 100%;
        font-weight: bold;
        text-align: center;
        font-size: 13px;
        color: #93A3C7;
      }
      .choose_tab {
        font-size: 13px;
        color: #fff;
      }
      .tab_item_border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
      }
    }
  }
  .single_view {
    width: 100%;
    min-height: 277px;
    padding-bottom: 20px;
    background: #294081;
    border-radius: 7px;
    margin-bottom: 25px;
    .star_title {
      width: 100%;
      height: 53px;
      text-align: center;
      line-height: 53px;
      font-size: 13px;
      font-weight: bold;
      color: #FFFFFF;
      background: url(${require('./../../assets/img/pool_title_bg.png')}) no-repeat;
      background-size: 100% 100%;
      border-radius: 7px 7px 21px 21px;
      margin-bottom: 23px;
    }
    .coin_view {
      width: calc(100% - 42px);
      height: 135px;
      margin-left: 28px;
      background: url(${require('./../../assets/img/nftfenghong.png')}) no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: auto;
        height: 42px;
        margin-bottom: 10px
      }
      p {
        font-size: 16px;
        font-weight: bold;
        color: #FFFFFF;
        text-align: center;
      }
    }
    .nft_income_info {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 11px;
      margin-bottom: 23px;
      div {
        flex: 1;
      }
      p {
        text-align: center;
      }
      .income_title {
        color: #95A3CF;
        font-size: 12px;
        margin-bottom: 15px;
      }
      .income_value {
        color: #fff;
        font-size: 12px;
      }
    }
    .can_get_title {
      font-size: 12px;
      color: #95A3CF;
      margin-bottom: 10px;
      text-align: center;
    }
    .can_get_value {
      color: #FEAA3D;
      font-size: 13px;
      text-align: center;
      margin-bottom: 16px;
    }
    .get_btn {
      width: 142px;
      height: 39px;
      background: #E48937;
      border-radius: 19px;
      font-size: 15px;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
      line-height: 39px;
      margin: 0 auto;
      margin-bottom: 27px;
    }
    .next_get_countdown {
      font-size: 13px;
      font-weight: 400;
      color: #95A3CF;
      margin-bottom: 23px;
      padding-left: 23px;
      text-align: center;
    }
    /* .nft_stakenum {
      font-size: 13px;
      font-weight: 400;
      color: #95A3CF;
      margin-bottom: 23px;
      padding-left: 23px;
      text-align: left;
    }
    .pool_btn {
      margin: 0 auto;
      width: 142px;
      height: 46px;
      background: #366DFE;
      border-radius: 23px;
      text-align: center;
      line-height: 46px;
      font-size: 15px;
      font-weight: 400;
      color: #FFFFFF;
      
    } */
  }
`
const AlertTxt = styled.p`
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  color: #333;
  text-align: center;
`;

export default function DAO() {
  const { account } = useWeb3React();
  const [ tab, setTab ] = useState(1);

  const [ poolContract, setPoolContract ] = useState<any>(null);

  const [ list, setList ] = useState<any>([]);

  const [ getStatus, setGetStatus ] = useState(0) // 领取状态

  useEffect(()=>{
    if(account) {
      initContract()
      // console.log(web3jsObj)
    }

  },[ account ]);

  // 初始化
  const initContract = async()=>{
    
    const { poolList_addr } = daoPoolConfig; // 获取流动性挖矿列表的 合约地址
    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      var web3js = new Web3(web3Obj.currentProvider);
      // const poolContract = new web3js.eth.Contract(daoabi.poolabi, poolList_addr, { from: account || '' });
      const listPoolContract = new web3js.eth.Contract(daoabi.poolList_abi, poolList_addr, { from: account || '' })
      const res1 = await listPoolContract.methods.getAllPoolInfo().call()
      const res2 = await listPoolContract.methods.getUserAllPoolInfo(account).call()
      console.log(res2)
      if(res1.rewardToken && res1.rewardToken.length) {
        const listResult = res1.rewardToken.map((item:any,index:number)=>{
          const decimal = res1.rewardTokenDecimals[index];
          return {
            coin_out: res1.rewardToken[index],
            decimal_out: res1.rewardTokenDecimals[index],
            name_out: res1.rewardTokenSymbol[index],
            // aNftPrize: res1.rewardPerNFT[index],
            start: res1.startTime[index],
            end: res1.endTime[index],
            // prizeCycle: res1.durationPerReward[index],
            nftBalance: res2.amount[index],
            willGetPrize: 0, //(startools.mathpow(res2.pending[index],decimal) * 1).toFixed(4),
            getedPrize: (startools.mathpow(res2.claimed[index],decimal) * 1).toFixed(4),
            nextPrizeTime: new Date(res2.newRewardTime[index]*1000),
            pid: index
          }
        })
        setList(listResult)
        setPoolContract(listPoolContract)
      }
    }
  }

  const regetData = async(item:any,contractObj?:any)=>{
    const res1 = await (contractObj || poolContract).methods.getAllPoolInfo().call()
    const res2 = await (contractObj || poolContract).methods.getUserAllPoolInfo(account).call()
    if(res1.rewardToken && res1.rewardToken.length) {
      const itemDecimal:any = res1.rewardTokenDecimals[item.pid]
      const itemWillGet:any = (startools.mathpow(res2.pending[item.pid],itemDecimal) * 1).toFixed(4)
      const itemNext = res2.newRewardTime[item.pid]*1000
      if((itemWillGet === item.willGetPrize) || (itemNext===item.nextPrizeTime)) { // 数据相同则重新请求数据
        setTimeout(()=>{
          regetData(item)
        },1000)
        return 
      }

      const listResult = res1.rewardToken.map((item:any,index:number)=>{
        const decimal = res1.rewardTokenDecimals[index];
        return {
          coin_out: res1.rewardToken[index],
          decimal_out: res1.rewardTokenDecimals[index],
          name_out: res1.rewardTokenSymbol[index],
          // aNftPrize: res1.rewardPerNFT[index],
          start: res1.startTime[index],
          end: res1.endTime[index],
          // prizeCycle: res1.durationPerReward[index],
          nftBalance: res2.amount[index],
          willGetPrize: (startools.mathpow(res2.pending[index],decimal) * 1).toFixed(4),
          getedPrize: (startools.mathpow(res2.claimed[index],decimal) * 1).toFixed(4),
          nextPrizeTime: new Date(res2.newRewardTime[index]*1000),
          pid: index
        }
      })
      setList(listResult)
    }
  }

  // 是否展示下次领取时间
  const showNextTime = (item:any)=> {
    const noEnd = new Date().getTime() < item.end*1000

    const hasNft = (item.nftBalance * 1) > 0

    const noIncome =  !((item.willGetPrize * 1) > 0)
   

    return noEnd && hasNft && noIncome
  }


  const getPrize = (item:any)=>{
    let showalet = false;
    if(!account) {
      Modal.show({
        content: <AlertTxt>请先到首页连接钱包!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
      return 
    }
    if(getStatus != 0) {
      return 
    }
    if(!((item.willGetPrize * 1) > 0)) {
      Toast.show({
        content: '暂无可领取数量！'
      })
      return 
    }
    setGetStatus(1)
    poolContract.methods.claim(item.pid).send({from: account})
    .on('transactionHash', ()=>{ })
    .on('confirmation', ()=>{  })
    .on('receipt', ()=>{ // 交易已广播
      if(!showalet) {
        setTimeout(()=>{
          Modal.show({
            content: <AlertTxt>领取成功!</AlertTxt>,
            closeOnMaskClick: true,
            showCloseButton: true,
          })
          setGetStatus(0)
          regetData(item)
        },1000)
        
        showalet = true;
      }
    })
    .on('error',(error:any, receipt:any)=>{
      console.log(error,receipt)
      Modal.show({
        content: <AlertTxt>领取失败，请重试!!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
    })

  }
  const downCallback = (item:any,data:any)=>{
    regetData(item,data)
  }
  return (
    <HomePage>
      <div className='banner_view'>
        <img src={require('./../../assets/img/banner.png')} alt="banner"/>
      </div>
      <div className='tab_view'>
        <div className='tab_item' onClick={()=>setTab(1)}>
          <p className={`tab_item_txt ${tab===1 && 'choose_tab'}`}>NFT分红</p>
          {tab === 1 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(2)}>
          <p className={`tab_item_txt ${tab===2 && 'choose_tab'}`}>投票治理</p>
          {tab === 2 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        
      </div>
      {
        tab === 1 &&
        list.map((item:any,index:number)=>{
          return (
            <div className='single_view' key={index}>
              <div className='star_title'>股东NFT分红池</div>
              <div className='coin_view'>
                <img src={require('./../../assets/img/money.png')} alt="" />
                <p>{item.name_out}</p>
              </div>

              <div className='nft_income_info'>
                <div>
                  <p className='income_title'>已奖励金额</p>
                  <p className='income_value'>{item.getedPrize}</p>
                </div>
                {/* <div>
                  <p className='income_title'>当日奖励金额</p>  
                  <p className='income_value'>2000</p>
                </div> */}
                <div>
                  <p className='income_title'>NFT 数量</p>
                  <p className='income_value'>{item.nftBalance}</p>
                </div>
              </div>
              <p className='can_get_title'>可领取金额</p>
              <p className='can_get_value'>{item.willGetPrize} {item.name_out}</p>
              <div className='get_btn' onClick={()=>getPrize(item)}>{getStatus==1 ? '领取中...' :'领取'}</div>
              {
                showNextTime(item) && 
                <div className='next_get_countdown'>
                  <p>距下次领取还有：</p>
                  <CountDown time={item.nextPrizeTime} callBack={(data:any)=>downCallback(item,data)} contract={poolContract}/>
                </div>
              }
            
            </div>
          )
        })
      }
      {
        tab === 2 &&  <p className='nodata'>敬请期待</p>
      }
    </HomePage>
  )
}
