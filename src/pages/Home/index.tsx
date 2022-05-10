import React, {  } from 'react'
import { ChainId } from 'hlbscswap-sdk'
// import { Text } from 'rebass'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { useActiveWeb3React } from '../../hooks'
// import { YellowCard } from '../../components/Card'
import Web3Status from '../../components/Web3Status'
// import { useDarkModeManager } from '../../state/user/hooks'
// import { useETHBalances } from '../../state/wallet/hooks'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
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
    margin-bottom: 38px;
    padding: 16px;
    img {
      width: 100%;
      height: auto;
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

  // const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
 return (
   <HomePage>
    <div className='banner_view'>
      <img src={require('./../../assets/img/banner.png')} alt="banner"/>
    </div>
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
    {/* 图标 */}
    <div className='chart_view'>
      <img src={require('./../../assets/img/charts.png')} alt="" />
    </div>
    {/* 数据 */}
    <div className='data_box_view'>
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
    </div>

   </HomePage>
 )
}
