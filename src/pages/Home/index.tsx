import React, { } from 'react'
import styled from 'styled-components'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
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
  }
  .banner_view {
    
    width: 100%;
    height: auto;
    margin: auto;
    img {
      width: 100%
    }
  }
  .wallet_view {
    margin-top: 33px;
    width: 100%;
    height: 33px;
    background: #427BFC;
    border-radius: 7px;
    margin-bottom: 11px;
  }
  .star_value_view {
    width: 100%;
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
    background: #23305C;
    border-radius: 7px;
    padding: 10px 0;
    .income_view {
      display: flex;
      align-items: center;
      margin-bottom: 13px;
      .income_item_view {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item_title {
          display: flex;
          align-items: center;
          img {
            width: 21px;
            height: 21px;
          }
          p {
            font-size: 14px;
            font-weight: 400;
            color: #919ECB;
          }
        }
        .item_blue_value {
          font-size: 15px;
          color: #4072E9;
          margin-top: 25px;
          font-weight: bold;
        }
        .item_white_value {
          margin-top: 22px;
          font-size: 16px;
          color: #fff;
          font-weight: bold;
        }
      }
      .mid_border {
        width: 2px;
        height: 110px;
        flex-shrink: 0;
      }
    }
    .get_pool_btn {
      width: 228px;
      height: 37px;
      background: linear-gradient(0deg, #2E63FD, #4782F6);
      border-radius: 19px;
      text-align: center;
      line-height: 37px;
      font-size: 13px;
      font-weight: bold;
      color: #FFFFFF;
      margin: 0 auto;
    }
  }
  .data_box_view {
    width: 100%;
    background: #23305C;
    border-radius: 7px;
    padding: 17px 11px;
    padding-top: 34px;
    display: flex;
    display: flex;
    flex-wrap: wrap;
    margin-top: 17px;
    .mid_border {
      width: 100%;
      padding: 0 18px;
      box-sizing: border-box;
      margin-bottom: 17px;
      img {
        width: 100%;
        height: 2px;
      }
    }
    .data_box_item {
      flex: 1;
      min-width: 40%;
      height: 80px;
      background: #2C3753;
      border: 1px solid #E7C047;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 17px;
      &.marginRight {
        margin-right: 23px;
      }
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
        <img src={require('./../../assets/img/border.png')} alt="" className='mid_border'/>
        <div className='income_item_view'>
          <div className='item_title'>
            <img src={require('./../../assets/img/income.png')} alt=""/>
            <p>待领取收益</p>
          </div>
          <p className='item_blue_value'>0 STAR</p>
          <p className='item_white_value'>0 STAR</p>
        </div>
      </div>
      <div className='get_pool_btn'>提取挖矿收益</div>
    </div>
    {/* 数据 */}

    <div className='data_box_view'>
      <div className='data_box_item marginRight'>
      </div>
      <div className='data_box_item'>
      </div>
      <div className='data_box_item marginRight'>
      </div>
      <div className='data_box_item'>
      </div>
      <div className='mid_border'>
        <img src={require('./../../assets/img/border1.png')} alt="" />
      </div>
      <div className='data_box_item marginRight'>
      </div>
      <div className='data_box_item'>
      </div>
      <div className='data_box_item marginRight'>
      </div>
      <div className='data_box_item'>
      </div>
    </div>

   </HomePage>
 )
}
