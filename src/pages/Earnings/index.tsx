import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import otherabi from './../../poolAssets/otherabi'
import Web3 from 'web3'
import { Popup, Toast, SpinLoading } from 'antd-mobile'
import { useParams } from 'react-router-dom'
import startools from '../../poolAssets/startools'
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
  margin-top: -95px;
  z-index: 10;
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
    position: relative;
    padding-bottom: 40px;
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
    
  }
`
const SonList = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
`;
const SonListTitle = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;
const ItemSon = styled.div`
  border-bottom: 1px solid #4C65AB;
  min-height: 40px;
  width: 100%;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 400;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  text-align: center;
  p {
    flex: 1;
    flex-shrink: 0;
    word-break: break-all;
  }
  
  p:first-child {
    padding-right: 13px;
  }
`
const PageView = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  p {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #fff;
    flex: 1;
    text-align: center;
  }
  span {
    flex-shrink: 0;
    width: 100px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    word-break: break-all;
  }
`;
const LoadingView = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoData = styled.p`
  width: 100%;
  height: 300px;
  text-align: center;
  line-height: 300px;
  font-size: 14px;
  color: #999;
`;
export default function Earnings() {
  const localData:any = JSON.parse(localStorage.getItem('liquidityPoolInfo') || '{"demical_out" : "10"}')

  const pageSize = 10

  const paramsData:any = useParams()

  const { account } = useWeb3React();
  
  const [listPoolContract,setlistPoolContract] = useState<any>(null);

  const [ list, setList ] = useState<any>([]) // 
  const [ startLen1, setStartLen1 ] = useState(0); // setStartLen1
  const [ loading1, setLoading1 ] = useState(true);

  
  const [ selectAddr, setSelectAddr ] = useState('') // 二级弹窗列表

  const [ list2, setList2 ] = useState<any>([]) // 
  const [ startLen2, setStartLen2 ] = useState(0); // setStartLen2
  const [ loading2, setLoading2 ] = useState(true);
  

  useEffect(()=>{
    if(account && paramsData.id) {
      initContract()
    }
  },[account,paramsData.id]);
  // 获取一级列表
  const initContract = async ()=>{
    const poolList_addr = '0x2586c611AcA2Cc6f659947C498E9EcCae25DaC99'; // 获取流动性挖矿列表的 合约地址
    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      let web3js = new Web3(web3Obj.currentProvider);
      const listPoolContract = new web3js.eth.Contract(otherabi.listpoolabi, poolList_addr, { from: account || '' });
      setlistPoolContract(listPoolContract)
    }
  }
  useEffect(()=>{
    if(!listPoolContract) {
      return 
    }
    getFaList(null)
  },[listPoolContract])
  const getFaList = async (start?:any)=>{
    if(start!==null && start < 0) {
      return 
    }
    setLoading1(true)
    const lenstart = start===null ? startLen1 : start;
    console.log(lenstart)
    const res = await listPoolContract.methods.getPoolBinderInfo(paramsData.id, account, lenstart, lenstart+pageSize).call(); // 一级得数据
    const addrList:any = (res.returnBinders || []);
    if(addrList.length) {
      let list:any = [];
      addrList.forEach((item:string,index:number)=>{
        if(item !== "0x0000000000000000000000000000000000000000") {
          list.push({
            addr: item,
            stakeNum: (startools.mathpow(res.returnBinderAmount[index],localData.demical_out) * 1).toFixed(4),
            income: (startools.mathpow(res.returnBinderPending[index],localData.demical_out) * 1).toFixed(4)
          })
        }
      })
      if(list.length) {
        setList(list);
        (start!==null) && setStartLen1(start)
      } else {
        (start!==null) && Toast.show({
          content: '已经是最后一页了！'
        })
      }
      
    } else {
      Toast.show({
        content: '已经是最后一页了！'
      })
    }
    setTimeout(()=>{
      setLoading1(false)
    },800)
  }

  useEffect(()=>{
    if(selectAddr) {
      getSonList(null)
    }
  },[selectAddr])

  const getSonList = async (start?:any)=>{
    if(start!==null && start < 0) {
      return 
    }
    setLoading2(true)
    const lenstart = start===null ? startLen2 : start;
    console.log(lenstart)
    const res = await listPoolContract.methods.getPoolBinderInfo(paramsData.id, selectAddr, lenstart, lenstart+pageSize).call(); // 一级得数据
    const addrList:any = (res.returnBinders || []);
    if(addrList.length) {
      let list:any = [];
      addrList.forEach((item:string,index:number)=>{
        if(item !== "0x0000000000000000000000000000000000000000") {
          list.push({
            addr: item,
            stakeNum: (startools.mathpow(res.returnBinderAmount[index],localData.demical_out) * 1).toFixed(4),
            income: (startools.mathpow(res.returnBinderPending[index],localData.demical_out) * 1).toFixed(4)
          })
        }
      })
      console.log('sonlist>>>>>>',list)
      if(list.length) {
        setList2(list);
        (start!==null) && setStartLen2(start)
      } else {
        (start!==null) && Toast.show({
          content: '已经是最后一页了！'
        })
      }
      
    } else {
      (start!==null) && Toast.show({
        content: '已经是最后一页了！'
      })
    }
    setTimeout(()=>{
      setLoading2(false)
    },500)
  }

  return (
    <EarningsPage>
      <div className='earning_view'>
        <div className='list_flex list_title'>
          <p>直推</p>
          <p>质押量</p>
          <p>挖矿收益</p>
        </div>
        {
          loading1
          ? <LoadingView><SpinLoading color='primary' /></LoadingView>
          :(list.length 
            ?list.map((item:any,index:number)=>(
              <div className='list_item' key={index}>
                <div className='list_flex item_fa'>
                  <div className='address_fa' onClick={()=>{
                    setSelectAddr(item.addr)
                  }}>
                    <p>{item.addr  && `${item.addr.slice(0,3)}***${item.addr.slice(-3)}`}</p>
                    <img src={require('./../../assets/img/arrow_bottom.png')} alt="" />
                  </div>
                  <p>{item.stakeNum}</p>
                  <p>{item.income}</p>
                </div>
                {/* 二级菜单 */}
                
              </div>
            ))
            :<NoData>暂无数据</NoData>
          )
        }
        {/* 分页 */}
        <PageView>
          <p onClick={()=>getFaList(startLen1 - pageSize)}>上一页</p>
          <span>第 {(startLen1 / pageSize) + 1 } 页</span>
          <p onClick={()=>{
            if(list.length < 10) {
              Toast.show({
                content: '已经是最后一页了！'
              })
              return 
            }
            getFaList(startLen1 + pageSize)
          }}>下一页</p>
        </PageView>
        {/* 二级 */}
        <Popup
          visible={selectAddr !== ''}
          onMaskClick={() => {
            setSelectAddr('');
            setLoading2(true);
            setStartLen2(0)
          }}
          bodyStyle={{ height: 'calc(100% - 250px)',background:'#294081',paddingBottom: '40px',}}
        >
          <SonListTitle>{`${selectAddr.slice(0,3)}***${selectAddr.slice(-3)}`} 的下级</SonListTitle>
          <SonList>
            {
              loading2
              ? <LoadingView><SpinLoading color='primary' /></LoadingView>
              :(
                list2.length 
                ?list2.map((item:any,index:number)=>(
                  <ItemSon key={index}>
                    <p>{item.addr  && `${item.addr.slice(0,3)}***${item.addr.slice(-3)}`}</p>
                    <p>{item.stakeNum}</p>
                    <p>{item.income}</p>
                  </ItemSon>
                ))
                :<NoData>暂无数据</NoData>
              )
            }
          </SonList>
          <PageView>
            <p onClick={()=>getSonList(startLen2 - pageSize)}>上一页</p>
            <span>第 {(startLen2 / pageSize) + 1 } 页</span>
            <p onClick={()=>{
              if(list2.length < 10) {
                Toast.show({
                  content: '已经是最后一页了！'
                })
                return 
              }
              getSonList(startLen2 + pageSize)
            }}>下一页</p>
          </PageView>
        </Popup>
      </div>
    </EarningsPage>
  )
}
