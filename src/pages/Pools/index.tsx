import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import poolData from './../../poolAssets/poolConfig'

// import { Link, useLocation } from 'react-router-dom'
const PoolsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  padding-top: 25px;
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
    background: #21305B;
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
export default function Pools() {
  const history = useHistory();
  const { account } = useWeb3React();
  const [ tab, setTab ] = useState(3);
  const goDetail = (item:any)=> {
    const now = (new Date().getTime()) *1 ;
    const start = (new Date(item.start).getTime())*1;
    if(start > now) {
      alert('挖矿未开始！')
      return 
    }
   
    history.push(`/poolsDetail/cooperate_pool/${item.id}`)
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
        <p style={{height:'100px',lineHeight:'100px',color:'#ccc',fontSize:'14px',textAlign:'center'}}>暂无矿池</p>
        // <div className='single_view'>
        //   <div className='star_title'>STAR</div>
        //   <div className='intro_view'>
        //     <div className='coin_view'>
        //       <img src={require('./../../assets/img/money.png')} alt="" />
        //       <p>STAR-STAR</p>
        //     </div>
        //     <p className='zuanqu'>赚取</p>
        //     <div className='coin_view'>
        //       <img src={require('./../../assets/img/money.png')} alt="" />
        //       <p>STAR</p>
        //     </div>
        //   </div>
        //   <div className='pool_btn'>选择</div>
        // </div>
      }
      {/* 社区合作 */}
      {
        tab === 3 &&
        <div>
          {
            poolData.cooperate_pool.map((item:any)=>{
              return <div className='single_view'>
                <div className='star_title'>GBT合作矿池</div>
                <div className='intro_view'>
                  <div className='coin_view'>
                    <img src={require('./../../assets/img/gbt.png')} alt="" />
                    <p>{item.name_in}</p>
                  </div>
                  <p className='zuanqu'>赚取</p>
                  <div className='coin_view'>
                    <img src={require('./../../assets/img/tq.png')} alt="" />
                    <p>{item.name_out}</p>
                  </div>
                </div>
                <p className='pool_info_text'><span>矿池总量：</span>{item.total}</p>
                <p className='pool_info_text'><span>开始时间：</span>{item.start}</p>
                <p className='pool_info_text'><span>结束时间：</span>{item.end}</p>
                
                {
                  account
                  ?<div className='pool_btn' onClick={()=>goDetail(item)}>
                      进入矿池
                    </div>
                  :<div className='pool_btn' onClick={()=>alert('请先到首页连接钱包！')}>
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
        </div>
      }
      
    </PoolsPage>
  )
}
