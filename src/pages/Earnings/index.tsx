import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
// import Web3 from 'web3'

// import abi from '../../poolAssets/abi'
// import startools from '../../poolAssets/startools'
// import { clearInterval } from 'timers'
const EarningsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 13px 0 20px;
  box-sizing: border-box;
  position: relative;
  padding-top: 25px;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .earning_view {
    width: 100%;
    min-height: 480px;
    background: #294081;
    border-radius: 7px;
    .list_flex {
      display: flex;
      align-items: center;
      text-align: center;
      p {
        flex: 1;
        flex-shrink: 0;
        word-break: break-all;
      }
    }
    .list_title {
      width: 100%;
      height: 65px;
      font-size: 17px;
      font-weight: bold;
      color: #FFFFFF;
      border-bottom: 1px solid #3F507F;
    }
    .list_item {
      min-height: 65px;
      width: 100%;
    }
    .item_fa {
      font-size: 14px;
      font-weight: 400;
      color: #FFFFFF;
      min-height: 65px;
      border-bottom: 1px solid #3F507F;
      .address_fa {
        flex: 1;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0BFCFF;
        p {
          flex: initial
        }
        img {
          width: 8px;
          height: auto;
          margin-left: 5px;
        }
      }
    }
    .item_son {
      border-bottom: 1px solid #4C65AB;
      min-height: 40px;
      width: calc(100% - 20px);
      margin: 0 auto;
      font-size: 13px;
      font-weight: 400;
      color: #FFFFFF;
      &:last-child {
        border: none;
      }
      p:first-child {
        padding-right: 13px;
      }
    }
  }
  
  
`
export default function Earnings() {

  const { account } = useWeb3React();
  const data:any = [
    { show: false },
    { show: false },
    { show: false },
    { show: false },
  ]
  const [ list, setList ] = useState<any>(data)
  console.log(account)

  return (
    <EarningsPage>
      <div className='earning_view'>
        <div className='list_flex list_title'>
          <p>直推</p>
          <p>质押量</p>
          <p>挖矿收益</p>
        </div>
        {
          list.map((item:any,index:number)=>(
            <div className='list_item' style={item.show ? { background: '#2e4893' }: {}} key={index}>
              <div className='list_flex item_fa'>
                <div className='address_fa' onClick={()=>{
                  item.show = !item.show;
                  const res = JSON.parse(JSON.stringify(list))
                  setList(res)
                }}>
                  <p>0xa***TxE</p>
                  <img src={require('./../../assets/img/arrow_bottom.png')} alt="" />
                </div>
                <p>123131321231212514253142531</p>
                <p>4121532465</p>
              </div>
              {/* 二级菜单 */}
              {
                item.show &&
                <div className='list_flex item_son'>
                  <p>0xa***TxE</p>
                  <p>311235415341534153445354342</p>
                  <p>416534</p>
                </div>
              }
            </div>
          ))
        }
        
      </div>
    </EarningsPage>
  )
}
