import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Web3 from 'web3'
import { Modal } from 'antd-mobile'

import poolData from '../../poolAssets/poolConfig'
import abi from '../../poolAssets/abi'
import startools from '../../poolAssets/startools'
// import { clearInterval } from 'timers'
const PoolsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 18px;
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
  
  .pledge_view {
    width: 100%;
    min-height: 310px;
    background: #294081;
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
      height: 55px;
      margin-bottom: 16px;
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
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          flex: 1;
          height: 40px;
          border-radius: 19px;
          padding: 0 10px;
          font-size: 14px;
          color: #333;
          background: rgba(54, 109, 254, 0.1);
          border: 1px solid rgba(54, 109, 254, 0.1);
          outline: none;
        }
        p {
          width: 50px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 15px;
          color: #366DFE;
          flex-shrink: 0;
        }
      }
      .can_use_text {
        font-size: 12px;
        width: 85%;
        margin: 0 auto;
        margin-top: 10px;
        padding: 0 10px;
        color: #366DFE;
        text-align: right;
      }
      .pledge_btn1 {
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
const AlertTxt = styled.p`
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  color: #333;
  text-align: center;
`;
export default function PoolsDetail() {

  const paramsData:any = useParams()

  const { account } = useWeb3React();

  const [ poolInfo, setPoolInfo ] = useState<any>({}) // ????????????
  
  const [ contarctObj, setContarctObj ] = useState<any>({}) // ????????????

  const [ balanceObj, setBalanceObj ] = useState<any>({}) // ????????????

  const [ allownObj, setAllowObj ] = useState<any>({}) // ????????????

  const [ earnNum, setEarnNum ] = useState(0) // ???????????????
  const [ earnStatus, setEarnStatus ] = useState(0) // ????????????

  const [ stakeNum, setStakeNum ] = useState(0); // setStakeNum

  const [ approveStaus, setapproveStaus ] = useState(0) // ????????????
  
  const [ pledgeValue, setPledgeValue] = useState('')
  const [ canStake, setCanStake ] = useState(false) // ????????????  ????????? ???????????????
  const [ stakestatus, setStakeStatus ] = useState(0) // ????????????

  const [ redeemValue, setRedeemValue ] = useState('')
  const [ canRedeem, setCanRedeem ] = useState(false) // ????????????  ????????? ???????????????
  const [ redeemstatus, setRedeemStatus ] = useState(0) // ????????????


  const [ showPledge, setShowPledge ] =useState(false)

  const [ showWithdraw, setShowWithdraw ] =useState(false)

  useEffect(()=>{
    const list = poolData[paramsData.type];
    const res = list.filter((i:any)=>i.id === Number(paramsData.id))
    if(res.length) {
      setPoolInfo(res[0])
    }
  },[paramsData])

  useEffect(()=>{
    
    if(poolInfo.id && account) {
      initContract()
    }

  },[ poolInfo, account ]);

  // ?????????web ??????????????????
  const initContract = async()=>{
    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      var web3js = new Web3(web3Obj.currentProvider);
      const inContract = new web3js.eth.Contract(abi, poolInfo.coin_in, { from: account || '' });
      const outContract = new web3js.eth.Contract(abi, poolInfo.coin_out, { from: account || '' });
      const poolContract = new web3js.eth.Contract(abi, poolInfo.stake_pool, { from: account || '' });
      const balance_in = await inContract.methods.balanceOf(account).call();
      const balance_out = await outContract.methods.balanceOf(account).call();
      const allow_in = await inContract.methods.allowance(account,poolInfo.stake_pool).call();
      setContarctObj({
        inContract, outContract, poolContract
      });
      console.log('balance_in*****',Number(startools.mathpow(allow_in,poolInfo.demical_out)))
      setBalanceObj({
        balance_out: (startools.mathpow(balance_out,poolInfo.demical_out) * 1).toFixed(6),
        balance_in: (startools.mathpow(balance_in,poolInfo.demical_in) * 1).toFixed(6)
      })
      setAllowObj({
        allow_in: Number(startools.mathpow(allow_in,poolInfo.demical_out))
      })
    }
  }

  // ????????????
  useEffect(()=>{
    let interval:any
    if(contarctObj.poolContract) {
      interval = setInterval(()=>{
        contarctObj.poolContract.methods.earned(account).call()
        .then((res:any)=>{
          setEarnNum(Number(startools.mathpow(res,poolInfo.demical_out)))
        })

        contarctObj.poolContract.methods.balanceOf(account).call()
        .then((res:any)=>{
          setStakeNum(Number(startools.mathpow(res,poolInfo.demical_out)))
        })

      },2000)
      
      
    }
    return () => {
      
      interval && clearInterval(interval)
    }
    
  },[contarctObj])

  // approve
  const apprveFn = async()=>{
    if(approveStaus === 1) {
      return 
    }
    setapproveStaus(1)
    try {
      await contarctObj.inContract.methods.approve(poolInfo.stake_pool,startools.mathlog('1000000000000',poolInfo.demical_in)).send({ from: account || '' });
      setapproveStaus(0);
      setAllowObj({
        allow_in: 10000
      })
      Modal.show({
        content: <AlertTxt>????????????!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
    } catch (error) {
      setapproveStaus(0);
    }
  }
  // ???????????????
  const pledgeInput = (e:any) =>{
    const value  = e.target.value;
    setPledgeValue(value)
    if(Number(value) > balanceObj.balance_in) {
      setCanStake(false);
    } else {
      setCanStake(true);
    }
  }
  // ??????
  const stakeFn = async ()=>{
    let showalet = false;
    if(stakestatus !== 0 || !canStake) {
      return 
    }
    setStakeStatus(1);
    const par = startools.mathlog(pledgeValue,poolInfo.demical_in);
    // const par:any = (Number(pledgeValue || 0) *Math.pow(10,9)) + '000000000'
    // alert(par)
    contarctObj.poolContract.methods.deposit(par).send({from: account})
    .on('transactionHash', ()=>{ // ??????hash
      
    })
    .on('confirmation', ()=>{ // 
      
    })
    .on('receipt', ()=>{ // ???????????????
      if(!showalet) {
        setTimeout(()=>{
          Modal.show({
            content: <AlertTxt>????????????!</AlertTxt>,
            closeOnMaskClick: true,
            showCloseButton: true,
          })
          setPledgeValue('');
          setStakeStatus(0);
        },1000);
        regetBalance();
      }
    })
    .on('error',(error:any, receipt:any)=>{
      console.log(error,receipt)
      Modal.show({
        content: <AlertTxt>????????????????????????!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
      setPledgeValue('');
      setStakeStatus(0);
    })
  }


  // ???????????????
  const widthdrawInput = (e:any) =>{
    const value  = e.target.value;
    setRedeemValue(value)
    if(Number(value) > stakeNum) {
      setCanRedeem(false);
    } else {
      setCanRedeem(true);
    }
  }
  const redeemFn = async()=>{
    let showalet = false;
    if(redeemstatus !== 0 || !canRedeem) {
      return 
    }
    setRedeemStatus(1);
    // ???????????? ???????????????
    const par = startools.mathlog(redeemValue,poolInfo.demical_in);

    // const par:any = (Number(redeemValue || 0) *Math.pow(10,9)) + '000000000'
    console.log(par)
    contarctObj.poolContract.methods.withdraw(par).send({from: account})
    .on('transactionHash', ()=>{ // ??????hash
      
    })
    .on('confirmation', ()=>{ // 
      
    })
    .on('receipt', ()=>{ // ???????????????
      if(!showalet) {
        setTimeout(()=>{
          Modal.show({
            content: <AlertTxt>????????????!</AlertTxt>,
            closeOnMaskClick: true,
            showCloseButton: true,
          })
          setRedeemValue('');
          setRedeemStatus(0);
          setStakeNum(0)
        },1000)
      }
    })
    .on('error',(error:any, receipt:any)=>{
      console.log(error,receipt)
      Modal.show({
        content: <AlertTxt>????????????????????????!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
      setRedeemValue('');
      setRedeemStatus(0);
    })
  }

  const earnFn = async()=> {
    // getReward
    let showalet = false;
    if(earnStatus !== 0 || earnNum === 0) {
      return 
    }
    
    setEarnStatus(1);
    contarctObj.poolContract.methods.getReward().send({from: account})
    .on('transactionHash', ()=>{ // ??????hash
      
    })
    .on('confirmation', ()=>{ // 
      
    })
    .on('receipt', ()=>{ // ???????????????
      if(!showalet) {
        setTimeout(()=>{
          Modal.show({
            content: <AlertTxt>????????????!</AlertTxt>,
            closeOnMaskClick: true,
            showCloseButton: true,
          })
          setEarnNum(0);
          setEarnStatus(0);
        },1000)
      }
    })
    .on('error',(error:any, receipt:any)=>{
      console.log(error,receipt)
      Modal.show({
        content: <AlertTxt>????????????????????????!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
      setEarnStatus(0);
    })
  }
  const regetBalance = async ()=>{
    const balance_in = await contarctObj.inContract.methods.balanceOf(account).call();
    // const balance_out = await contarctObj.outContract.methods.balanceOf(account).call();
    const res = (startools.mathpow(balance_in,poolInfo.demical_in) * 1).toFixed(6);
    if(res === balanceObj.balance_in) {
      setTimeout(()=>{
        regetBalance();
      },2000)
      return   
    }
    setBalanceObj({
      ...balanceObj,
      balance_in: (startools.mathpow(balance_in,poolInfo.demical_in) * 1).toFixed(6)
    })
  }

  return (
    <PoolsPage>
      <div className='pledge_view'>
        {/* <p className='pledge_title'>GBT????????????</p> */}
        <img src={poolInfo.icon_out && require(`./../../assets/img/${poolInfo.icon_out}.png`)} alt="" className='pledge_img'/>
        <p className='pledge_txt'>TQ????????????</p>
        <p className='pledge_value'>{earnNum.toFixed(6)}</p>
        <div className='pledge_btn' style={earnNum === 0 ? { opacity: 0.5} : {}} onClick={()=>earnFn()}>{earnStatus === 0 ? '????????????' : '?????????...'}</div>
      </div>

      <div className='pledge_view'>
        {/* <p className='pledge_title'>GBT????????????</p> */}
        <img src={poolInfo.icon_in && require(`./../../assets/img/${poolInfo.icon_in}.png`)} alt="" className='pledge_img'/>
        <p className='pledge_txt'>?????????LP</p>
        <p className='pledge_value'>{stakeNum.toFixed(6)}</p>
        { 
          (allownObj.allow_in || 0) === 0
          ?<div className='pledge_btn' onClick={()=>apprveFn()}>{approveStaus===1 ? '?????????...' : `??????${poolInfo.name_in}`}</div>
          :(stakeNum === 0
          ?<div className='pledge_btn' onClick={()=>setShowPledge(true)}>????????????</div>
          :<div className='btn_view'>
            <div className='pledge_btn' onClick={()=>setShowWithdraw(true)}>????????????</div>
            <div className='add_btn' onClick={()=>setShowPledge(true)}><img src={require('./../../assets/img/add.png')} alt="" /></div>
          </div>)
        }
      </div>
      {
        showPledge &&
        <div className='pledge_modal'>
          <div className='content_view'>
            <div className='close_img' onClick={()=>setShowPledge(false)}><img src={require('./../../assets/img/close.png')} alt="" /></div>
            <p className='title'>??????</p>
            <div className='input_view'>
              <input onChange={pledgeInput} value={pledgeValue} placeholder="???????????????" type='number' />
              <p onClick={()=>pledgeInput({target:{value:balanceObj.balance_in}})}>??????</p>
            </div>
            <p className='can_use_text '>{balanceObj.balance_in} ?????????</p>
            <div className='pledge_btn1' style={!canStake ? { opacity: 0.5} : {}} onClick={()=>stakeFn()}>
             {  stakestatus ===0 ? '??????':'?????????...'}
            </div>
          </div>
        </div>
      }
      {
        showWithdraw &&
        <div className='pledge_modal'>
          <div className='content_view'>
            <div className='close_img' onClick={()=>setShowWithdraw(false)}><img src={require('./../../assets/img/close.png')} alt="" /></div>
            <p className='title'>??????</p>
            <div className='input_view'>
              <input onChange={widthdrawInput} value={redeemValue} placeholder="???????????????" type='number' />
              <p onClick={()=>widthdrawInput({target:{value:stakeNum+''}})}>??????</p>
            </div>
            <p className='can_use_text '>{stakeNum.toFixed(6)} ?????????</p>
            <div className='pledge_btn1' style={!canRedeem ? { opacity: 0.5} : {}} onClick={()=>redeemFn()}>
            {  redeemstatus ===0 ? '??????':'?????????...'}
            </div>
          </div>
        </div>
      }
    </PoolsPage>
  )
}
