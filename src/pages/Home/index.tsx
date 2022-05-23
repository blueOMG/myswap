import React, { useEffect, useState } from 'react'
import { ChainId } from 'hlbscswap-sdk'
// import { Text } from 'rebass'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components';
import { useActiveWeb3React } from '../../hooks'
// import { YellowCard } from '../../components/Card'
import Web3Status from '../../components/Web3Status'
import SwiperBanner from '../../components/SwiperBanner';
import { Toast } from 'antd-mobile'
// import { useDarkModeManager } from '../../state/user/hooks'
// import { useETHBalances } from '../../state/wallet/hooks'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
  width: 100%;
  z-index: 10;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  padding-top: 25px;
  margin-top: -95px;
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
    margin-bottom: 21px;
    display: flex;
    justify-content: center;
    .network_txt {
      font-size: 12px;
      color: #fff;
      line-height: 33px;
      flex-shrink: 0;
      margin-left: 15px;
    }
    button {
      width: auto;
      background: none;
      border: none;
      outline: none;
      &:focus {
        background: none;
        border: none;
      }
    }
  }
  .star_inter_view {
    width: 100%;
    height: 264px;
    background: url(${require('./../../assets/img/introbg.png')}) no-repeat;
    background-size: 85% auto;
    background-position: center center;
    background-color: #23305C;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0 22px;
    text-align: left;
    margin-bottom: 19px;
    .txt1 {
      font-size: 21px;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: 14px;
      width: 100%;
    }
    .txt2 {
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: 25px;
      width: 100%;
    }
    .txt3 {
      font-size: 10px;
      font-weight: 400;
      color: #B0BEEC;
      margin-bottom: 46px;
      width: 100%;
      line-height: 18px;
    }
    .btn {
      width: 228px;
      height: 38px;
      background: linear-gradient(0deg, #2E63FD, #4782F6);
      border-radius: 19px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 13px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 38px;
    }
    a {
      color: none;
      text-decoration: none;
    }
  }
  .chart_view {
    width: 100%;
    background: #23305C;
    border-radius: 7px;
    margin-bottom: 17px;
    padding: 16px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .invite_view {
    width: 100%;
    background: #23305C;
    border-radius: 7px;
    margin-bottom: 20px;
    padding: 25px 12px;
    position: relative;
    .invite_top {
      display: flex;
      align-items: center;
      img {
        width: 97px;
        height: auto;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .invite_txt_view {
        flex: 1;
        p {
          &:first-child {
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            color: #FFFFFF;
            margin-bottom: 10px;
          }
          &:last-child {
            width: 100%;
            min-height: 40px;
            padding: 0 10px;
            border-radius: 2px;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            color: #fff;
            background: #37477C;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .copy_link {
      width: 228px;
      height: 38px;
      background: linear-gradient(0deg, #2E63FD, #4782F6);
      border-radius: 19px;
      margin: 0 auto;
      margin-top: 20px;
      font-size: 13px;
      font-weight: bold;
      color: #FFFFFF;
      text-align: center;
      line-height: 38px;
      
    }
    .copy_input {
      position: absolute;
      right: 0;
      opacity: 0;
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
      .value {
        font-size: 14px;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 10px;
      }
      .title {
        font-size: 8px;
        font-weight: 400;
        color: #989DC5;
      }
    }
  }
  .shenji_title {
    text-align: center;
    font-size: 17px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #939FC7;
    margin-bottom: 22px;
    margin-top: 37px;
  }
  /*
  .shenji_item {
    width: 50%;
    height: 40px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%
    }
  } */
  .hezuo_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .hezuo_item {
      flex: 1;
      min-width: 40%;
      max-width: 50%;
      height: 40px;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:nth-child(even) {
        margin-left: 10px;
      }
      img {
        width: 100%;
        height: 100%
      }
    }
  }
`
const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.BSCTEST]: 'BSCTEST', // 需要修改
  [ChainId.BSC]: 'BSC',
}
export default function Home() {

  const { chainId } = useActiveWeb3React()
  const { account } = useWeb3React()

  const [ inviteUrl, setInviteUrl ] = useState('')
  
  useEffect(()=>{
    if(account) {
      setInviteUrl(`https://www.starswap.cn?code=${account}`)
    }
  },[account])
  // const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const copy = ()=>{
    var input:any = document.getElementById('copyText');
    input.select();
    document.execCommand("Copy");
    Toast.show({
      content: '复制成功！',
    })
  }
 return (
   <HomePage>
    <SwiperBanner/>
    {/* 连接钱包交互区域 */}
    <div className='wallet_view'>
        
        <Web3Status/>
        { chainId && NETWORK_LABELS[chainId] && <p className='network_txt'>已连接至 { chainId && (NETWORK_LABELS[chainId] && NETWORK_LABELS[chainId])}</p>}
    </div>
    {/* star 简介 */}
    <div className='star_inter_view'>
      <p className='txt1'>STAR DAO</p>
      <p className='txt2'>全球领先的加密基金社区自治组织</p>
      <p className='txt3'>专注于加密数字资产价值投资，由web3技术和社区驱动，为用户捕获行业增长红利。</p>
      <Link to="/pools">
        <div className='btn'>参与/进入矿池</div>
      </Link>
    </div>
    {/* 邀请 */}
    <div className='invite_view'>
      <div className='invite_top'>
        <img src={require('./../../assets/img/invite.png')} alt="" />
        <div className='invite_txt_view'>
          <p>邀请好友挖矿可以获得超高的推广奖励，复制下面的推荐链接立即分享并获得奖励。</p>
          <p>{inviteUrl}</p>
        </div>
      </div>
      <div className='copy_link' onClick={()=>{copy()}}>复制链接</div>
      <input value={inviteUrl} id="copyText" readOnly className='copy_input'/>
    </div>
    {/* 图标 */}
    {/* <div className='chart_view'>
      <img src={require('./../../assets/img/charts.png')} alt="" />
    </div> */}
    {/* 数据 */}
    {/* <div className='data_box_view'>
      <div className='data_box_item marginRight' style={{borderColor:'#E7C047'}}>
        <p className='value' style={{color:'#E58932'}}>$0.468921</p>
        <p className='title'>STAR 价格</p>
      </div>
      <div className='data_box_item' style={{borderColor:'#C83C7B'}}>
        <p className='value'>894540154</p>
        <p className='title'>STAR 总供应量</p>
      </div>
      <div className='data_box_item marginRight' style={{borderColor:'#189DEA'}}>
        <p className='value'>894540154.6591</p>
        <p className='title'>STAR 流通量</p>
      </div>
      <div className='data_box_item' style={{borderColor:'#15DD72'}}>
        <p className='value'>894540154.6582</p>
        <p className='title'>STAR锁仓量</p>
      </div>
    </div> */}
    {/* 审计 */}
    {/* <p className='shenji_title'>审计机构</p>
    <div className='shenji_item'>
      <img src={require('./../../assets/img/shenji.png')} alt="" />
    </div> */}
    <p className='shenji_title'>合作伙伴</p>
    <div className='hezuo_list'>
      <div className='hezuo_item'>
        <img src={require('./../../assets/img/partner1.png')} alt="" />
      </div>
      <div className='hezuo_item'>
        <img src={require('./../../assets/img/partner2.png')} alt="" />
      </div>
      <div className='hezuo_item'>
        <img src={require('./../../assets/img/partner3.png')} alt="" />
      </div>
      <div className='hezuo_item'>
        <img src={require('./../../assets/img/partner4.png')} alt="" />
      </div>
      <div className='hezuo_item'>
        <img src={require('./../../assets/img/partner5.png')} alt="" />
      </div>
    </div>

   </HomePage>
 )
}
