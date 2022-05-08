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
  
  .pledge_view {
    width: 100%;
    min-height: 310px;
    background: #21305B;
    border-radius: 7px;
    padding: 30px 16px;
    margin-bottom: 47px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    .pledge_title {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: 32px;
    }
    .pledge_img {
      width: 40px;
      margin-bottom: 16px
    }
    .pledge_txt {
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #95A3CF;
      margin-bottom: 23px;
    }
    .pledge_value {
      font-size: 19px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFFFFF;
      word-break: break-all;
      margin-bottom: 50px;
    }
    .pledge_btn {
      flex: 1;
      width: 100%;
      height: 39px;
      background: #366DFE;
      border-radius: 8px;
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
      line-height: 39px;
    }
    .btn_view {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .add_btn {
        width: 39px;
        height: 39px;
        margin-left: 10px;
        border-radius: 4px;
        background: #366DFE;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .pledge_modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    .content_view {
      width: 85%;
      background: #fff;
      border-radius: 7px;
      padding: 20px 14px;
      position: relative;
      .close_img {
        position: absolute;
        right: 14px;
        top: 15px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 15px;
          height: 15px;
        }
      }
      .title {
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        margin-bottom: 50px;
        color: #333;
      }
      .input_view {
        width: 85%;
        height: 40px;
        border-radius: 19px;
        padding: 0 10px;
        font-size: 14px;
        color: #333;
        background: rgba(54, 109, 254, 0.1);
        border: 1px solid rgba(54, 109, 254, 0.1);
        outline: none;
        display: block;
        margin: 0 auto;
      }
      .pledge_btn {
        margin: 0 auto;
        width: 50%;
        height: 39px;
        background: #366DFE;
        border-radius: 19px;
        font-size: 15px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        line-height: 39px;
        margin-top: 30px;
      }
    }
  }
  
`
export default function PoolsDetail() {
  const [ stakeNum ] = useState(11); // setStakeNum

  const [ showPledge, setShowPledge ] =useState(false);

  const [ showWithdraw, setShowWithdraw ] =useState(false);
  // 质押输入框
  const pledgeInput = (val:any) =>{
    console.log(val)
  }
  // 提现输入框
  const widthdrawInput = (val:any) =>{
    console.log(val)
  }
  return (
    <PoolsPage>
      <div className='pledge_view'>
        <p className='pledge_title'>GBT合作矿池</p>
        <img src={require('./../../assets/img/money.png')} alt="" className='pledge_img'/>
        <p className='pledge_txt'>待提现挖矿收益</p>
        <p className='pledge_value'>66666666666666.6666</p>
        <div className='pledge_btn'>立即提现</div>
      </div>

      <div className='pledge_view'>
        <p className='pledge_title'>GBT合作矿池</p>
        <img src={require('./../../assets/img/money.png')} alt="" className='pledge_img'/>
        <p className='pledge_txt'>已质押</p>
        <p className='pledge_value'>66666666666666.6666</p>
        {
          stakeNum === 0
          ?<div className='pledge_btn' onClick={()=>setShowPledge(true)}>立即质押</div>
          :<div className='btn_view'>
            <div className='pledge_btn' onClick={()=>setShowWithdraw(true)}>取消质押</div>
            <div className='add_btn'><img src={require('./../../assets/img/add.png')} alt="" /></div>
          </div>
        }
      </div>
      {
        showPledge &&
        <div className='pledge_modal'>
          <div className='content_view'>
            <div className='close_img' onClick={()=>setShowPledge(false)}><img src={require('./../../assets/img/close.png')} alt="" /></div>
            <p className='title'>质押</p>
            <input onChange={pledgeInput} placeholder="请输入数量" type='number' className='input_view'/>
            <div className='pledge_btn'>确定</div>
          </div>
        </div>
      }
      {
        showWithdraw &&
        <div className='pledge_modal'>
          <div className='content_view'>
            <div className='close_img' onClick={()=>setShowWithdraw(false)}><img src={require('./../../assets/img/close.png')} alt="" /></div>
            <p className='title'>赎回</p>
            <input onChange={widthdrawInput} placeholder="请输入数量" type='number' className='input_view'/>
            <div className='pledge_btn'>确定</div>
          </div>
        </div>
      }
    </PoolsPage>
  )
}
