import React, {  useState } from 'react'
// import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
// import poolData from './../../poolAssets/poolConfig'
// import otherabi from './../../poolAssets/otherabi'
// import Web3 from 'web3'
import { Modal } from 'antd-mobile'
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
    .nft_stakenum {
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

export default function DAO() {
  const { account } = useWeb3React();
  console.log(account)
  const [ tab, setTab ] = useState(1);
  const extract = ()=>{
    if(!account) {
      Modal.show({
        content: <AlertTxt>请先到首页连接钱包!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
      return 
    }
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
        <div className='single_view'>
          <div className='star_title'>股东NFT分红池</div>
          <div className='coin_view'>
            <img src={require('./../../assets/img/money.png')} alt="" />
            <p>STAR</p>
          </div>

          <div className='nft_income_info'>
            <div>
              <p className='income_title'>已奖励金额</p>
              <p className='income_value'>2000</p>
            </div>
            <div>
              <p className='income_title'>当日奖励金额</p>  
              <p className='income_value'>2000</p>
            </div>
            <div>
              <p className='income_title'>STAR</p>
              <p className='income_value'>2000</p>
            </div>
          </div>
          <div className='get_btn'>领取</div>
          <p className='nft_stakenum'>已质押:</p>
          <div className='pool_btn' onClick={()=>extract()}>提取</div>
        </div>
      }
      {
        tab === 2 &&  <p className='nodata'>敬请期待</p>
      }
    </HomePage>
  )
}
