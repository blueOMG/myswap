import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import singleabi from './../../poolAssets/singleabi'
import singlePoolConfig from './../../poolAssets/singlePoolConfig'
import startools from '../../poolAssets/startools'

import Web3 from 'web3'
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';

// import { Link, useLocation } from 'react-router-dom'
const SinglePage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  
  
  z-index: 10;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .banner_view {
    width: 100%;
    margin: auto;
    margin-bottom: 46px;
    
  }
  .tab_view {
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
    padding: 23px 18px 15px 18px;
    background: linear-gradient(227deg, #333 0%, #132022 100%);;
    border-radius: 15px;
    margin-bottom: 25px;
    .star_title {
      width: 100%;
      text-align: center;
      line-height: 53px;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: 60px;
    }
    .intro_view {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      .zuanqu {
        width: 100px;
        height: auto;
        position: relative;
        margin: 0 10px;
        img {
          width: 100%;
          height: auto;
        }
        p {
          margin: 0 auto;
          margin-top: -4px;
          width: 40px;
          height: 27px;
          background: #9EC7FF;
          border-radius: 0px 0px 5px 5px;
          font-size: 15px;
          color: #146DFE;
          line-height: 27px;
          text-align: center;
        }
      }
      .coin_view {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: auto;
          height: 34px;
          margin-bottom: 10px;
          /* border-radius: 50%; */
        }
        p {
          font-size: 10px;
          font-weight: bold;
          color: rgba(255,255,255,0.5);
          text-align: center;
        }
      }
    }
    .pool_info_text {
      font-size: 14px;
      color: #fff;
      margin-bottom: 20px;
      text-align: left;
      padding: 0 16px;
      span {
        color: #146DFE
      }
    }
    a {
      color: none;
      text-decoration: none;
    }
    .pool_btn {
      margin: 0 auto;
      width: 260px;
      height: 50px;
      background: #146DFE;
      border-radius: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 15px;
      font-weight: 500;
      color: #FFFFFF;
      a {
        text-decoration: none;
        color: #FFFFFF;
      }
      
    }
    .pool_balance {
      width: 269px;
      height: 36px;
      background: #132144;
      margin: 70px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      p {
        font-size: 15px;
        font-weight: 400;
        color: #95A3CF;
        &:last-child {
          color: #fff;
        }
      }
    }
  }
  .secound_tab {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 10px;
    p {
      flex: 1;
      line-height: 40px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      position: relative;
    }
    .select_liqui {
      border-bottom: 1px solid #fff;
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -20px;
      width: 40px;
    }
  }
`

const LoadingView = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoData = styled.p`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
`
export default function Pools() {
  const history = useHistory();
  const { account } = useWeb3React();
  const [ poolList, setPoolList ] = useState<any>({end:[],doing:[]});
  const [ liquidityLoading, setLiquidityLoading ] = useState(true)
  useEffect(()=>{
    
    getPoolList()
  },[]);
  // 获取流动性挖矿列表
  const getPoolList = async ()=>{

    // 获取流动性挖矿列表的 合约地址   质押地址
    const { poolList_addr, poolStake_addr } = singlePoolConfig

    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      
      var web3js = new Web3(web3Obj.currentProvider);
      const listPoolContract = new web3js.eth.Contract(singleabi.listpoolabi, poolList_addr, { from: account || '' });
      const res = await listPoolContract.methods.getAllPoolInfo().call(); // 获取全部矿池列表
      console.log('single',res)
      const res1 = await listPoolContract.methods.getAllPoolExtraInfo().call();  //  获取矿池的扩展信息
      console.log('single111',res1)
      const result = res.lpToken.reduce((acc:any,item:any,index:number)=>{
        const lp0 = res1.lpToken0Symbol[index]
        const lp1 = res1.lpToken1Symbol[index]
        const reward = res1.rewardTokenSymbol[index];
        const itemobj = {
          name_in: lp0 === lp1 ? lp0 : `${lp0}-${lp1}`,
          name_out: reward,
          total:  Number(startools.mathpow(res.amount[index],res1.rewardTokenDecimals[index])),
          start: new Date(res.startTime[index]*1000).toLocaleString(),
          end: new Date(res.endTime[index]*1000).toLocaleString(),
          id: index,
          demical_out: res1.rewardTokenDecimals[index],
          demical_in: res1.lpTokenDecimals[index],
          coin_in: item,
          coin_out: res.rewardToken[index],
          stake_pool: poolStake_addr,
          title: 'STAR官方矿池'
        }
        if(Number(res.rewardPerBlock[index]) === 0 || (new Date().getTime() > new Date(res.endTime[index]*1000).getTime()) ) {
          acc.end.push(itemobj)
        } else {
          acc.doing.push(itemobj)
        }
        return acc
      },{end: [],doing:[]})
      setPoolList(result)
      setLiquidityLoading(false)
    }
  }
  const goDetail = (item:any, type:number)=> {
    const now = (new Date().getTime()) *1 ;
    const start = (new Date(item.start).getTime())*1;
    if(start > now) {
      showToastFn('挖矿未开始','faile')
      return 
    }
    localStorage.setItem('singlePoolInfo',JSON.stringify(item))
    history.push(`/poolsDetailSingle/cooperate_pool/${item.id}`)
    return 
    
    
  }
  const [ showToast, setshowToast] = useState(false);
  const [ toastText, settoastText ] = useState('');
  const [ toastStatus,settoastStatus ] = useState('success');
  const showToastFn = (text:any,status:string)=>{
    setshowToast(true);
    settoastText(text);
    settoastStatus(status)
    setTimeout(()=>{
      setshowToast(false);
      settoastText('');
    },2000)
  }
  return (
    <SinglePage>
      {/* toast */}
      <Toast show={showToast}  text={toastText} type={true} status={toastStatus}/>
      {
        liquidityLoading
        ?<LoadingView><Loading /></LoadingView>
        :(
          poolList.doing.length === 0
          ?<NoData>暂无矿池</NoData>
          :poolList.doing.map((item:any,index:number)=>{
            return(
              <div className='single_view' key={index+'liquidityPoolList'}>
                <div className='star_title'>{item.title}</div>
                <div className='intro_view'>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/money.png`)}  alt="" />
                    <p>{item.name_in}</p>
                  </div>
                  <p className='zuanqu'>赚取</p>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/money.png`)}  alt="" />
                    <p>{item.name_out}</p>
                  </div>
                </div>
                <p className='pool_info_text'><span>矿池总量：</span>{item.total}</p>
                <p className='pool_info_text'><span>开始时间：</span>{item.start}</p>
                <p className='pool_info_text'><span>结束时间：</span>{item.end}</p>
                
                {
                  account
                  ?<div className='pool_btn' onClick={()=>goDetail(item,1)}>
                      进入矿池
                    </div>
                  :<div className='pool_btn' onClick={()=>{
                    showToastFn('请先到首页连接钱包','faile')
                  }}>
                    进入矿池
                  </div>
                }
                
              </div>
            
            )
          })
        )
      }
    </SinglePage>
  )
}
