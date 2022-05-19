import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import poolData from './../../poolAssets/poolConfig'
import otherabi from './../../poolAssets/otherabi'
import otherpoolConfig from './../../poolAssets/otherpoolConfig'
import Web3 from 'web3'
import { Modal } from 'antd-mobile'
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
    img {
      width: 100%
    }
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
          margin-bottom: 10px
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
`
const AlertTxt = styled.p`
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  color: #333;
  text-align: center;
`;
export default function Pools() {
  // 获取url 邀请地址
  const getInviteAddr = (name:string)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const history = useHistory();
  const { account } = useWeb3React();
  const [ tab, setTab ] = useState(2);
  const [ liquidityPoolList, setLiquidityPoolList ] = useState<any>([]);
  useEffect(()=>{
    localStorage.removeItem('INVITECODE');
    const res = getInviteAddr('code')
    localStorage.setItem('INVITECODE',res || '')
    getPoolList()
  },[]);
  // 获取流动性挖矿列表
  const getPoolList = async ()=>{
    // 获取流动性挖矿列表的 合约地址   质押地址
    const { poolList_addr, poolStake_addr } = otherpoolConfig

    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      
      var web3js = new Web3(web3Obj.currentProvider);
      const listPoolContract = new web3js.eth.Contract(otherabi.listpoolabi, poolList_addr, { from: account || '' });
      const res = await listPoolContract.methods.getAllPoolInfo().call(); // 获取全部矿池列表
      const res1 = await listPoolContract.methods.getAllPoolExtraInfo().call();  //  获取矿池的扩展信息
      console.log(res)
      console.log(res1)
      const result = res.lpToken.map((item:any,index:number)=>{
        const lp0 = res1.lpToken0Symbol[index]
        const lp1 = res1.lpToken1Symbol[index]
        const reward = res1.rewardTokenSymbol[index];
        return {
          name_in: lp0 === lp1 ? lp0 : `${lp0}-${lp1}`,
          name_out: reward,
          total: res.amount[index],
          start: new Date(res.startTime[index]*1000).toLocaleString(),
          end: new Date(res.endTime[index]*1000).toLocaleString(),
          id: index,
          demical_out: res1.rewardTokenDecimals[index],
          demical_in: res1.lpTokenDecimals[index],
          coin_in: item,
          coin_out: res.rewardToken[index],
          stake_pool: poolStake_addr
        }
      })
      setLiquidityPoolList(result)
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
          content: <AlertTxt>挖矿未开始!</AlertTxt>,
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
        <img src={require('./../../assets/img/banner.png')} alt="banner"/>
      </div>
      <div className='tab_view'>
        <div className='tab_item' onClick={()=>setTab(1)}>
          <p className={`tab_item_txt ${tab===1 && 'choose_tab'}`}>単币质押</p>
          {tab === 1 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(2)}>
          <p className={`tab_item_txt ${tab===2 && 'choose_tab'}`}>流动性挖矿</p>
          {tab === 2 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(3)}>
          <p className={`tab_item_txt ${tab===3 && 'choose_tab'}`}>社区合作矿池</p>
          {tab === 3 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div>
      </div>
      {/* 单币质押 */}
      {
        tab === 1 &&
        <p style={{height:'100px',lineHeight:'100px',color:'#ccc',fontSize:'14px',textAlign:'center'}}>暂无矿池</p>
        // <div className='single_view'>
        //   <div className='star_title'>STAR</div>
        //   <div className='intro_view'>
        //     <div className='coin_view'>
        //       <img src={require('./../../assets/img/money.png')} alt="" />
        //       <p>STAR</p>
        //     </div>
        //     <p className='zuanqu'>赚取</p>
        //     <div className='coin_view'>
        //       <img src={require('./../../assets/img/money.png')} alt="" />
        //       <p>STAR</p>
        //     </div>
        //   </div>
        //   <div className='pool_btn'>去挖矿</div>
        // </div>
      }
      {/* 流动性挖矿 */}
      {
        tab === 2 &&
        <>
          {
            liquidityPoolList.map((item:any,index:number)=>{
              return <div className='single_view' key={index+'liquidityPoolList'}>
                <div className='star_title'>{item.title}</div>
                <div className='intro_view'>
                  <div className='coin_view'>
                    <img src={require('./../../assets/img/money.png')}  alt="" />
                    <p>{item.name_in}</p>
                  </div>
                  <p className='zuanqu'>赚取</p>
                  <div className='coin_view'>
                    <img src={require('./../../assets/img/money.png')}  alt="" />
                    <p>{item.name_out}</p>
                  </div>
                </div>
                <p className='pool_info_text'><span>矿池总量：</span>{item.total}</p>
                <p className='pool_info_text'><span>开始时间：</span>{item.start}</p>
                <p className='pool_info_text'><span>结束时间：</span>{item.end}</p>
                
                {
                  account
                  ?<div className='pool_btn' onClick={()=>goDetail(item,tab)}>
                      进入矿池
                    </div>
                  :<div className='pool_btn' onClick={()=>{
                    Modal.show({
                      content: <AlertTxt>请先到首页连接钱包!</AlertTxt>,
                      closeOnMaskClick: true,
                      showCloseButton: true,
                    })
                  }}>
                    进入矿池
                  </div>
                }
                
              </div>
            })
          }
        </>
      }
      {/* 社区合作 */}
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
                  <p className='zuanqu'>赚取</p>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/${item.icon_out}.png`)} alt="" />
                    <p>{item.name_out}</p>
                  </div>
                </div>
                <p className='pool_info_text'><span>矿池总量：</span>{item.total}</p>
                <p className='pool_info_text'><span>开始时间：</span>{item.start}</p>
                <p className='pool_info_text'><span>结束时间：</span>{item.end}</p>
                
                {
                  account
                  ?<div className='pool_btn' onClick={()=>goDetail(item,tab)}>
                      进入矿池
                    </div>
                  :<div className='pool_btn' onClick={()=>{
                    Modal.show({
                      content: <AlertTxt>请先到首页连接钱包!</AlertTxt>,
                      closeOnMaskClick: true,
                      showCloseButton: true,
                    })
                  }}>
                    进入矿池
                  </div>
                }
                
              </div>
            })
          }
          

          {/* <div className='single_view' style={{marginTop: 50}}>
            <div className='star_title'>NFT分红池</div>
            <div className='pool_balance'>
              <p>矿池存量：</p>
              <p>135415321.0000</p>
            </div>
            <div className='pool_btn'>进入矿池</div>
          </div> */}
        </>
      }
      
    </PoolsPage>
  )
}
