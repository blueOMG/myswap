import React, { useState } from 'react'
import styled from 'styled-components'
// import { Link, useLocation } from 'react-router-dom'
const PoolsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  margin-top: -70px;
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
    background: #21305B;
    border-radius: 7px;
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
      margin-bottom: 60px;
      .zuanqu {
        font-size: 15px;
        font-weight: 400;
        color: #95A3CF;
        margin: 0 25px;
      }
      .coin_view {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 42px;
          height: 42px;
          margin-right: 7px
        }
        p {
          font-size: 16px;
          font-weight: bold;
          color: #FFFFFF;
        }
      }
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
  const [ tab, setTab ] = useState(1);
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
        <div className='single_view'>
          <div className='star_title'>STAR</div>
          <div className='intro_view'>
            <div className='coin_view'>
              <img src={require('./../../assets/img/money.png')} alt="" />
              <p>STAR</p>
            </div>
            <p className='zuanqu'>赚取</p>
            <div className='coin_view'>
              <img src={require('./../../assets/img/money.png')} alt="" />
              <p>STAR</p>
            </div>
          </div>
          <div className='pool_btn'>去挖矿</div>
        </div>
      }
      {/* 流动性挖矿 */}
      {
        tab === 2 &&
        <div className='single_view'>
          <div className='star_title'>STAR</div>
          <div className='intro_view'>
            <div className='coin_view'>
              <img src={require('./../../assets/img/money.png')} alt="" />
              <p>STAR-STAR</p>
            </div>
            <p className='zuanqu'>赚取</p>
            <div className='coin_view'>
              <img src={require('./../../assets/img/money.png')} alt="" />
              <p>STAR</p>
            </div>
          </div>
          <div className='pool_btn'>选择</div>
        </div>
      }
      {/* 社区合作 */}
      {
        tab === 3 &&
        <div>
          <div className='single_view'>
            <div className='star_title'>GBT合作矿池</div>
            <div className='intro_view'>
              <div className='coin_view'>
                <img src={require('./../../assets/img/money.png')} alt="" />
                <p>GBT</p>
              </div>
              <p className='zuanqu'>赚取</p>
              <div className='coin_view'>
                <img src={require('./../../assets/img/money.png')} alt="" />
                <p>USDT</p>
              </div>
            </div>
            <div className='pool_btn'>进入矿池</div>
          </div>

          <div className='single_view' style={{marginTop: 50}}>
            <div className='star_title'>NFT分红池</div>
            <div className='pool_balance'>
              <p>矿池存量：</p>
              <p>135415321.0000</p>
            </div>
            <div className='pool_btn'>进入矿池</div>
          </div>
        </div>
      }
      
    </PoolsPage>
  )
}
