import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import poolData from './../../poolAssets/poolConfig'
import liquidityabi from './../../poolAssets/liquidityabi'
import liquidityPoolConfig from './../../poolAssets/liquidityPoolConfig'
import startools from '../../poolAssets/startools'
import SwiperBanner from '../../components/SwiperBanner';

import Web3 from 'web3'
import { Modal, SpinLoading } from 'antd-mobile'
import SingleCoin from './SingleCoin'
// import { Link, useLocation } from 'react-router-dom'
const PoolsPage = styled.div`
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
    .intro_view {
      display: flex;
      align-items: center;
      padding: 0 16px;
      margin-bottom: 40px;
      .zuanqu {
        width: 45px;
        height: 36px;
        line-height: 36px;
        font-size: 15px;
        font-weight: 400;
        color: #fff;
        margin: 0 20px;
        background: #132144;
        text-align: center;
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
          font-size: 14px;
          font-weight: bold;
          color: #FFFFFF;
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
        color: #95A3CF
      }
    }
    a {
      color: none;
      text-decoration: none;
    }
    .pool_btn {
      margin: 0 auto;
      width: 260px;
      height: 46px;
      background: linear-gradient(0deg, #5690FE, #3062F7);
      border-radius: 23px;
      text-align: center;
      line-height: 46px;
      font-size: 15px;
      font-weight: 400;
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
const AlertTxt = styled.p`
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  color: #333;
  text-align: center;
`;
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
  color: #ccc;
`
export default function Pools() {
  // ??????url ????????????
  const getInviteAddr = (name:string)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const history = useHistory();
  const { account } = useWeb3React();
  const [ tab, setTab ] = useState(2);
  const [ liquidityPool, setLiquidityPool ] = useState<any>({end:[],doing:[]});
  const [ liquidityLoading, setLiquidityLoading ] = useState(true)
  useEffect(()=>{
    localStorage.removeItem('INVITECODE');
    const res = getInviteAddr('code')
    localStorage.setItem('INVITECODE',res || '')
    getPoolList()
  },[]);
  // ???????????????????????????
  const getPoolList = async ()=>{

    // ?????????????????????????????? ????????????   ????????????
    const { poolList_addr, poolStake_addr } = liquidityPoolConfig

    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      
      var web3js = new Web3(web3Obj.currentProvider);
      const listPoolContract = new web3js.eth.Contract(liquidityabi.listpoolabi, poolList_addr, { from: account || '' });
      const res = await listPoolContract.methods.getAllPoolInfo().call(); // ????????????????????????
      console.log('zzzzzz',res)
      const res1 = await listPoolContract.methods.getAllPoolExtraInfo().call();  //  ???????????????????????????
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
          title: `STAR??????${index+1}?????????`
        }
        if(Number(res.rewardPerBlock[index]) === 0 || (new Date().getTime() > new Date(res.endTime[index]*1000).getTime()) ) {
          acc.end.push(itemobj)
        } else {
          acc.doing.push(itemobj)
        }
        return acc
      },{end: [],doing:[]})
      setLiquidityPool(result)
      setLiquidityLoading(false)
    }
  }
  const goDetail = (item:any, type:number)=> {
    
   console.log(tab)
    if(type === 1) {
      return 
    }
    if(type === 2) {
      localStorage.setItem('liquidityPoolInfo',JSON.stringify(item))
      history.push(`/poolsDetail1/liquidity_pool/${item.id}`)
      return 
    }
    if(type === 3) {
      const now = (new Date().getTime()) *1 ;
      const start = (new Date(item.start).getTime())*1;
      if(start > now) {
        Modal.show({
          content: <AlertTxt>???????????????!</AlertTxt>,
          closeOnMaskClick: true,
          showCloseButton: true,
        })
        return 
      }
      history.push(`/poolsDetail/cooperate_pool/${item.id}`)
      return 
    }
    
  }
  return (
    <PoolsPage>
      <div className='banner_view'>
        <SwiperBanner />
      </div>
      <div className='tab_view'>
        <div className='tab_item' onClick={()=>setTab(1)}>
          <p className={`tab_item_txt ${tab===1 && 'choose_tab'}`}>????????????</p>
          {tab === 1 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(2)}>
          <p className={`tab_item_txt ${tab===2 && 'choose_tab'}`}>???????????????</p>
          {tab === 2 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(3)}>
          <p className={`tab_item_txt ${tab===3 && 'choose_tab'}`}>????????????</p>
          {tab === 3 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(4)}>
          <p className={`tab_item_txt ${tab===4 && 'choose_tab'}`}>?????????</p>
          {tab === 4 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
      </div>
      {/* ???????????? */}
      {
        tab === 1 &&
        <SingleCoin />
      }
      {/* ??????????????? */}
      {
        tab === 2 &&
        <>
          {
            liquidityLoading
            ?<LoadingView><SpinLoading color='primary' /></LoadingView>
            :liquidityPool.doing.map((item:any,index:number)=>{
              return(
                <div className='single_view' key={index+'liquidityPoolList'}>
                  <div className='star_title'>{item.title}</div>
                  <div className='intro_view'>
                    <div className='coin_view'>
                      <img src={require(`./../../assets/img/money0_in.png`)}  alt="" />
                      <p>{item.name_in}</p>
                    </div>
                    <p className='zuanqu'>??????</p>
                    <div className='coin_view'>
                      <img src={require(`./../../assets/img/money0_out.png`)}  alt="" />
                      <p>{item.name_out}</p>
                    </div>
                  </div>
                  <p className='pool_info_text'><span>???????????????</span>{item.total}</p>
                  <p className='pool_info_text'><span>???????????????</span>{item.start}</p>
                  <p className='pool_info_text'><span>???????????????</span>{item.end}</p>
                  
                  {
                    account
                    ?<div className='pool_btn' onClick={()=>goDetail(item,tab)}>
                        ????????????
                      </div>
                    :<div className='pool_btn' onClick={()=>{
                      Modal.show({
                        content: <AlertTxt>???????????????????????????!</AlertTxt>,
                        closeOnMaskClick: true,
                        showCloseButton: true,
                      })
                    }}>
                      ????????????
                    </div>
                  }
                  
                </div>
              
              )
            })
          }
        </>
      }
      {/* ???????????? */}
      {
        tab === 3 &&
        <>
          {
            poolData.cooperate_pool.map((item:any,index:number)=>{
              return <div className='single_view' key={index+'cooperate_pool'}>
                <div className='star_title'>{item.title}</div>
                <div className='intro_view'>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/${item.icon_in}.png`)} alt="" />
                    <p>{item.name_in}</p>
                  </div>
                  <p className='zuanqu'>??????</p>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/${item.icon_out}.png`)} alt="" />
                    <p>{item.name_out}</p>
                  </div>
                </div>
                <p className='pool_info_text'><span>???????????????</span>{item.total}</p>
                <p className='pool_info_text'><span>???????????????</span>{item.start}</p>
                <p className='pool_info_text'><span>???????????????</span>{item.end}</p>
                
                {
                  account
                  ?<div className='pool_btn' onClick={()=>goDetail(item,tab)}>
                      ????????????
                    </div>
                  :<div className='pool_btn' onClick={()=>{
                    Modal.show({
                      content: <AlertTxt>???????????????????????????!</AlertTxt>,
                      closeOnMaskClick: true,
                      showCloseButton: true,
                    })
                  }}>
                    ????????????
                  </div>
                }
                
              </div>
            })
          }
          

          {/* <div className='single_view' style={{marginTop: 50}}>
            <div className='star_title'>NFT?????????</div>
            <div className='pool_balance'>
              <p>???????????????</p>
              <p>135415321.0000</p>
            </div>
            <div className='pool_btn'>????????????</div>
          </div> */}
        </>
      }
      {
        tab === 4 &&
        <>
          {
            liquidityPool.end.length
            ?liquidityPool.end.map((item:any,index:number)=>{
              return(
                <div className='single_view' key={index+'liquidityPoolList'}>
                  <div className='star_title'>{item.title}</div>
                  <div className='intro_view'>
                    <div className='coin_view'>
                      <img src={require('./../../assets/img/money.png')}  alt="" />
                      <p>{item.name_in}</p>
                    </div>
                    <p className='zuanqu'>??????</p>
                    <div className='coin_view'>
                      <img src={require('./../../assets/img/money.png')}  alt="" />
                      <p>{item.name_out}</p>
                    </div>
                  </div>
                  <p className='pool_info_text'><span>???????????????</span>{item.total}</p>
                  <p className='pool_info_text'><span>???????????????</span>{item.start}</p>
                  <p className='pool_info_text'><span>???????????????</span>{item.end}</p>
                  
                  {
                    account
                    ?<div className='pool_btn' onClick={()=>goDetail(item,2)}>
                        ????????????
                      </div>
                    :<div className='pool_btn' onClick={()=>{
                      Modal.show({
                        content: <AlertTxt>???????????????????????????!</AlertTxt>,
                        closeOnMaskClick: true,
                        showCloseButton: true,
                      })
                    }}>
                      ????????????
                    </div>
                  }
                  
                </div>
              
              )})
            :<NoData>????????????</NoData>
          }
        </>
      }
      
    </PoolsPage>
  )
}
