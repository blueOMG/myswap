import React, { useEffect, useState } from 'react'
// import { Text } from 'rebass'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components';
// import { YellowCard } from '../../components/Card'
import SwiperBanner from '../../components/SwiperBanner';
import Toast from '../../components/Toast';
import { useIsDarkMode } from '../../state/user/hooks'
// import { useDarkModeManager } from '../../state/user/hooks'
// import { useETHBalances } from '../../state/wallet/hooks'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
  width: 100%;
  z-index: 10;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  
  
  * {
    margin: 0;
    padding: 0;
  }

  .star_inter_view {
    width: 100%;
    height: 160px;
    background: ${({ theme }) => theme.indexBg};
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    text-align: center;
    margin: 19px 0;
    .txt1 {
      font-size: 20px;
      font-weight: bold;
      color: ${({ theme }) => theme.indexColor1};
      margin-bottom: 5px;
      width: 100%;
    }
    span {
      width: 160px;
      height: 2px;
      background: ${({ theme }) => theme.indexBorderColor};
      margin: 10px 0;
    }
    .txt2 {
      font-size: 11px;
      font-weight: 600;
      color: ${({ theme }) => theme.indexColor1};
      width: 100%;
      text-transform: uppercase;
    }
    .txt3 {
      font-size: 10px;
      font-weight: 400;
      color: ${({ theme }) => theme.indexColor3};
      width: 100%;
      line-height: 18px;
      text-align: center;
    }
  }
  .goPool {
    width: 100%;
    height: 40px;
    background: ${({ theme }) => theme.indexBtnBg};
    box-shadow: 0px 0px 10px 1px rgba(20, 109, 254, 0.5);
    border-radius: 10px 10px 10px 10px;
    margin: 15px 0;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.indexBtnColor};
    line-height: 40px;
    a {
      color: ${({ theme }) => theme.indexBtnColor};
      text-decoration: none;
    }
  }
  .invite_view {
    width: 100%;
    background: ${({ theme }) => theme.indexBg};
    border-radius: 15px;
    margin-bottom: 30px;
    padding: 25px 18px;
    position: relative;
    .invite_top {
      display: flex;
      align-items: center;
      img {
        width: 102px;
        height: auto;
        margin-right: 25px;
        flex-shrink: 0;
      }
      .invite_txt_view {
        flex: 1;
        p {
          &:first-child {
            width: 100%;
            font-size: 12px;
            font-weight: 500;
            color: ${({ theme }) => theme.indexColor4};
            margin-bottom: 16px;
          }
          &:last-child {
            width: 100%;
            min-height: 40px;
            padding: 0 10px;
            border-radius: 2px;
            text-align: center;
            line-height: 18px;
            font-size: 9px;
            color: ${({ theme }) => theme.indexColor5};
            background: ${({ theme }) => theme.inviteBg};
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
      width: 200px;
      height: 40px;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      border: 1px solid ${({ theme }) => theme.indexBorderColor};
      background: ${({ theme }) => theme.copyBtnBg};
      margin: 0 auto;
      margin-top: 25px;
      font-size: 14px;
      font-weight: bold;
      color: ${({ theme }) => theme.indexColor6};
      text-align: center;
      line-height: 40px;
    }
    .copy_input {
      position: absolute;
      right: 0;
      opacity: 0;
    }
  }
  .shenji_title {
    text-align: center;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: ${({ theme }) => theme.indexColor2};
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
export default function Home() {
  
  const darkMode = useIsDarkMode()

  const { account } = useWeb3React()

  const [ inviteUrl, setInviteUrl ] = useState('')

  const [ showToast, setshowToast] = useState(false);
  const [ toastText, settoastText ] = useState('');
  
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
    setshowToast(true);
    settoastText('复制成功');
    setTimeout(()=>{
      setshowToast(false);
      settoastText('');
    },2000)
  }
 return (
   <HomePage>
    {/* toast */}
    <Toast show={showToast}  text={toastText} type={true} status={'success'}/>

    <SwiperBanner/>
    {/* 连接钱包交互区域 */}
    {/* star 简介 */}
    <div className='star_inter_view' style={{padding: '0 10px'}}>
      <p className='txt1'>全球领先的去中心化交易所</p>
      <p className='txt2'>THE world’s leading decentralized exchange</p>
      <span></span>
      <p className='txt3'>由社区和加密技术构建DFi、Web3、元宇宙</p>
      <p className='txt3'>为社区捕获行业增长红利</p>
      
    </div>
    <div className='goPool'>
      <Link to="/pools">
        <div>进入矿池</div>
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
    <p className='shenji_title'>- 合作伙伴 -</p>
    <div className='hezuo_list'>
      <img src={require(`./../../assets/img/partner${darkMode?'':'_white'}.png`)} alt="" style={{width:'100%'}}/>
      {/* <div className='hezuo_item'>
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
      </div> */}
    </div>

   </HomePage>
 )
}
