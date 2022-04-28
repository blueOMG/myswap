import React, { } from 'react'
import styled from 'styled-components'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
  width: 100%;
  padding: 0 18px;
  box-sizing: border-box;
  padding-top: 190px;
  position: relative;
  background: #162345;
  * {
    margin: 0;
    padding: 0;
  }
  .banner_view {
    position: absolute;
    top: 0;
    left: 8px;
    width: calc(100% - 18px);
    height: auto;
    img {
      width: 100%
    }
  }
  .wallet_view {
    width: 342px;
    height: 33px;
    background: #427BFC;
    border-radius: 7px;
    margin-bottom: 11px;
  }
  .star_value_view {
    width: 342px;
    min-height: 61px;
    background: #23305C;
    border-radius: 7px;
    padding: 16px 11px 14px 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    .star_value_view_left {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      img {
        width: 25px;
        height: auto;
        margin-right: 6px;
      }
      p {
        font-size: 19px;
        font-weight: bold;
        color: #fff;
      }
    }
    .star_value_view_right {
      font-size: 34px;
      font-family: Arial;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 32px;
    }
  }
  .pool_income_view {
    width: 100%;
    width: 342px;
    background: #23305C;
    border-radius: 7px;
    padding: 10px 0;
    .income_view {
      display: flex;
      align-items: center;

    }
  }
`

export default function Home() {
 return (
   <HomePage>
    <div className='banner_view'>
      <img src={require('./../../assets/img/banner.png')} alt="banner"/>
    </div>
    {/* 连接钱包交互区域 */}
    <div className='wallet_view'>

    </div>
    {/* star sum */}
    <div className='star_value_view'>
      <div className='star_value_view_left'>
        <img src={require('./../../assets/img/star_zengzhang.png')} alt=""/>
        <p>STAR</p>
      </div>
      <p className='star_value_view_right'>$500,211,200</p>
    </div>
    {/* 挖矿收益 */}
    <div className='pool_income_view'>
      <div className='income_view'>
        <div className='income_item_view'>
          <div className='item_title'>
            <img src={require('./../../assets/img/wallet.png')} alt=""/>
            <p>钱包余额</p>
          </div>
          <p className='item_blue_value'>0 STAR</p>
          <p className='item_white_value'>0 STAR</p>
        </div>
        <img src={require('./../../assets/img/border.png')} alt="" />
        <div className='income_item_view'>
          <div className='item_title'>
            <img src={require('./../../assets/img/income.png')} alt=""/>
            <p>待领取收益</p>
          </div>
          <p className='item_blue_value'>0 STAR</p>
          <p className='item_white_value'>0 STAR</p>
        </div>
      </div>

    </div>
   </HomePage>
 )
}
