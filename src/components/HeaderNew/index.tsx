// import { ChainId } from 'hlbscswap-sdk'
import React, { useEffect, useState } from 'react'
// import { isMobile } from 'react-device-detect'
// import { Text } from 'rebass'

import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
// import Logo from '../../assets/svg/logo.png'
// import LogoDark from '../../assets/svg/logo.png'
// import { useActiveWeb3React } from '../../hooks'
// import { useDarkModeManager } from '../../state/user/hooks'
// import { useETHBalances } from '../../state/wallet/hooks'

// import { YellowCard } from '../Card'
// import Settings from '../Settings'
// import Menu from '../Menu'

// import Row, { RowBetween } from '../Row'
// import { RowBetween } from '../Row'
// import Web3Status from '../Web3Status'
// import VersionSwitch from './VersionSwitch'

const HeaderFrame = styled.div`
  width: 100%;
  background:pink;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  padding-top: 73px;
  padding-bottom: 40px;
  p {
    margin: 0;
    padding: 0;
  }
`
const NavView = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    height: 35px;
    text-decoration: none;
  }
`
const NavItem = styled.div`
  position: relative; 
  height: 35px;
  p {
    font-size: 17px;
    font-weight: 400;
    color: #FFFFFF;
  }
  span {
    width: 100%;
    height: 5px;
    background: #FFFFFF;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`


export default function HeaderNew() {
  // const { account, chainId } = useActiveWeb3React()

  // const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()
  const location:any = useLocation();
  console.log('location',location);
  const [ navTab, setNavTab ] = useState(1);

  useEffect(()=>{
    const path = location.pathname;
    console.log(path)
    if(path=== '/home') {
      setNavTab(1)
    } else if(path=== '/swap') {
      setNavTab(2)
    }
  },[location.pathname])

  return (
    <HeaderFrame>
      <NavView>
        <Link to="/home">
        <NavItem>
          <p style={navTab === 1 ? {fontSize:18,fontWeight:'bold'}:{}}>首页</p>
          { navTab === 1 && <span></span>}
        </NavItem>
        </Link>
        <Link to="/swap">
        <NavItem>
          <p style={navTab === 2 ? {fontSize:18,fontWeight:'bold'}:{}}>兑换</p>
          { navTab === 2 && <span></span>}
        </NavItem>
        </Link>
        <NavItem>
          <p style={navTab === 3 ? {fontSize:18,fontWeight:'bold'}:{}}>矿池</p>
          { navTab === 3 && <span></span>}
        </NavItem>
        <NavItem>
          <p style={navTab === 4 ? {fontSize:18,fontWeight:'bold'}:{}}>DAO</p>
          { navTab === 4 && <span></span>}
        </NavItem>
        <NavItem>
          <p style={navTab === 5 ? {fontSize:18,fontWeight:'bold'}:{}}>NFT交易</p>
          { navTab === 5 && <span></span>}
        </NavItem>
      </NavView>
    </HeaderFrame>
  )
}
