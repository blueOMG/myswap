import React from 'react'
import { ChainId } from 'hlbscswap-sdk'
// import { Text } from 'rebass'
import styled from 'styled-components';
import { useActiveWeb3React } from '../../hooks'
// import { YellowCard } from '../../components/Card'
import Web3Status from '../Web3Status'
import Settings from '../Settings'


const FooterView = styled.div`
  width: 100%;
  height: 60px;
  background: #283d7e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  .walletInfo {
    display: flex;
    align-items: center;
    .info {
      background: #30478d;
      border-radius: 40px;
      overflow: hidden;
      display: flex;
      height: 30px;
      * {
        border: none;
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
    .network_txt {
      background: #30478d;
      border-radius: 40px;
      font-size: 12px;
      color: #fff;
      line-height: 30px;
      flex-shrink: 0;
      margin-left: 5px;
      padding: 0 10px;
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
export default function HeaderNew() {
  const { chainId } = useActiveWeb3React()

  return (
    <FooterView>
      <div className='walletInfo'>
        <div className='info'><Web3Status/></div>
        { chainId && NETWORK_LABELS[chainId] && <p className='network_txt'>{ chainId && (NETWORK_LABELS[chainId] && NETWORK_LABELS[chainId])}</p>}
      </div>
      <Settings/>
    </FooterView>
  )
}
