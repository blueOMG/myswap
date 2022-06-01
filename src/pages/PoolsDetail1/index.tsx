import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from 'web3'
import { Modal, Dialog, Toast } from 'antd-mobile'

import abi from '../../poolAssets/abi'
import liquidityabi from './../../poolAssets/liquidityabi'
import startools from '../../poolAssets/startools'
import liquidityPoolConfig from './../../poolAssets/liquidityPoolConfig'
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
    .my_team {
      font-size: 15px;
      font-weight: 400;
      border-bottom: 1px solid #30E9FF;
      color: #30E9FF;
      line-height: 22px;
      margin-bottom: 19px;
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
        overflow: hidden;
        input {
          flex: 1;
          width: 100px;
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
const InviteAlert = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 5px;
    border: 1px solid #366DFE;
    color: #366DFE;
    margin-bottom: 15px;
  }
  span {
    font-size: 13px;
    color: red;
  }
`;

let inviteAddr:any = localStorage.getItem('INVITECODE') || '';

function InviteAlertContent () {
  const [ value, setValue ] = useState(inviteAddr);
  return (
    <InviteAlert>
      <p>请输入邀请地址以激活你的矿池</p>
      <input 
        value={value}
        onChange={(e:any)=>{
          console.log(inviteAddr)
          inviteAddr = e.target.value
          setValue(e.target.value)
        }}
      />
      <span>激活操作需链上确认，请勿重复操作</span>
    </InviteAlert>
  )
}


export default function PoolsDetail1() {

  // inviteAddr = localStorage.getItem('INVITECODE') || ''; // 没邀请人，用固定钱包

  const history = useHistory();

  const { account } = useWeb3React();

  const [ poolInfo, setPoolInfo ] = useState<any>({}) // 矿池信息
  
  const [ contarctObj, setContarctObj ] = useState<any>({}) // 合约对象

  const [ balanceObj, setBalanceObj ] = useState<any>({}) // 余额对象

  const [ allownObj, setAllowObj ] = useState<any>({}) // 授权余额

  const [ earnNum, setEarnNum ] = useState(0) // 可提取收益
  const [ earnStatus, setEarnStatus ] = useState(0) // 提取状态

  const [ inviteNum, setInviteNum ] = useState(0) // 邀请奖励

  const [ stakeNum, setStakeNum ] = useState(0); // setStakeNum


  const [ approveStaus, setapproveStaus ] = useState(0) // 授权状态
  
  const [ pledgeValue, setPledgeValue] = useState('')
  const [ canStake, setCanStake ] = useState(false) // 能否质押  （余额 是否有值）
  const [ stakestatus, setStakeStatus ] = useState(0) // 质押状态

  const [ redeemValue, setRedeemValue ] = useState('')
  const [ canRedeem, setCanRedeem ] = useState(false) // 能否赎回  （余额 是否有值）
  const [ redeemstatus, setRedeemStatus ] = useState(0) // 赎回状态


  const [ showPledge, setShowPledge ] =useState(false)

  const [ showWithdraw, setShowWithdraw ] =useState(false)

  const [ isBindUser, setIsBindUser ] = useState(false) // 是否绑定邀请用户了

  useEffect(()=>{
    const local = localStorage.getItem('liquidityPoolInfo');
    if(local) {
      const res = JSON.parse(local);
      setPoolInfo(res)
    }
  },[])

  useEffect(()=>{
    if(poolInfo.id !== undefined && account) {
      initContract()
    }

  },[ poolInfo, account ]);

  //处理小数  不四舍五入
  const saveNumber = (str:string,index:number)=>{
    const list:any = str.split('.');
    return `${list[0]}.${list[1].slice(0,index)}`
  }

  // 初始化web 创建合约对象
  const initContract = async()=>{
    
    const { poolList_addr } = liquidityPoolConfig; // 获取流动性挖矿列表的 合约地址
    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      
      var web3js = new Web3(web3Obj.currentProvider);
      const inContract = new web3js.eth.Contract(abi, poolInfo.coin_in, { from: account || '' });
      const outContract = new web3js.eth.Contract(abi, poolInfo.coin_out, { from: account || '' });
      const poolContract = new web3js.eth.Contract(liquidityabi.poolabi, poolInfo.stake_pool, { from: account || '' });
      const listPoolContract = new web3js.eth.Contract(liquidityabi.listpoolabi, poolList_addr, { from: account || '' });
     
      const balance_in = await inContract.methods.balanceOf(account).call();
      const balance_out = await outContract.methods.balanceOf(account).call();
      const allow_in = await inContract.methods.allowance(account,poolInfo.stake_pool).call();
      const inviteInfo = await poolContract.methods.getUserInviteInfo(account).call();

      setContarctObj({
        inContract, outContract, poolContract,listPoolContract
      });

      setBalanceObj({
        balance_out: (startools.mathpow(balance_out,poolInfo.demical_out) * 1).toFixed(6),
        balance_in: saveNumber(startools.mathpow(balance_in,poolInfo.demical_in),6) // demical_in
      })
      setAllowObj({
        allow_in: Number(startools.mathpow(allow_in,poolInfo.demical_out))
      })
      setIsBindUser(inviteInfo.depositNum !== '0')
    }
  }

  // 获取收益
  useEffect(()=>{
    let interval:any
    if(contarctObj.poolContract) {
      interval = setInterval(()=>{
        contarctObj.listPoolContract.methods.getUserAllPoolInfo(account).call()
        .then((res:any)=>{
          setEarnNum(Number(startools.mathpow(res.pending[poolInfo.id],poolInfo.demical_out)))
          setInviteNum(Number(startools.mathpow(res.inviteReward[poolInfo.id],poolInfo.demical_out)))
          setStakeNum(Number(startools.mathpow(res.amount[poolInfo.id],poolInfo.demical_in)))
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
        content: <AlertTxt>授权成功!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
    } catch (error) {
      setapproveStaus(0);
    }
  }
  // 质押输入框
  const pledgeInput = (e:any) =>{
    const value  = e.target.value;
    setPledgeValue(value)
    if(Number(value) > balanceObj.balance_in) {
      setCanStake(false);
    } else {
      setCanStake(true);
    }
  }
  // 点击质押需要检查 是否未新用户 若是  则需确定邀请地址 是否可用
  const stakeFn = async ()=>{
    if(stakestatus !== 0 || !canStake) {
      return 
    }
    if(isBindUser){
      pledge()
    } else {
      Dialog.confirm({
        title: '提示',
        content: <InviteAlertContent />,
        closeOnMaskClick: true,
        confirmText: '确定',
        cancelText: '取消',
        onConfirm:()=>{
          checkInvite()
        },
        onCancel:()=>{
          
        },
      })
    }
  }
  // 检查邀请地址 是否可用
  const checkInvite = async ()=> {
    try {
      
      const inviteInfo = await contarctObj.poolContract.methods.getUserInviteInfo(inviteAddr).call()

      if(inviteInfo.depositNum !== '0') {
        setIsBindUser(true);
        pledge()
      } else {
        Toast.show({
          content: '邀请地址无效！'
        })
      }
    } catch (error) {
      Toast.show({
        content: '邀请地址无效！'
      })
    }
    

  }
  // 质押
  const pledge = async ()=>{
    let showalet = false;
    setStakeStatus(1);
    const par = startools.mathlog(pledgeValue,poolInfo.demical_in); // demical_in
    // const par:any = (Number(pledgeValue || 0) *Math.pow(10,9)) + '000000000'
    try {
      contarctObj.poolContract.methods.deposit(poolInfo.id, par, inviteAddr || account).send({from: account})
      .on('transactionHash', ()=>{ // 交易hash
        
      })
      .on('confirmation', ()=>{ // 
        
      })
      .on('receipt', ()=>{ // 交易已广播
        if(!showalet) {
          setTimeout(()=>{
            Modal.show({
              content: <AlertTxt>质押成功!</AlertTxt>,
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
          content: <AlertTxt>质押失败，请重试!</AlertTxt>,
          closeOnMaskClick: true,
          showCloseButton: true,
        })
        
        setPledgeValue('');
        setStakeStatus(0);
      })
    } catch (error) {
      console.log(error)
      Modal.show({
        content: <AlertTxt>质押失败，请重试!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
      
      setPledgeValue('');
      setStakeStatus(0);  
    }

  }


  // 赎回输入框
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
    // 临时处理 先能够使用
    const par = startools.mathlog(redeemValue,poolInfo.demical_in); // demical_in

    // const par:any = (Number(redeemValue || 0) *Math.pow(10,9)) + '000000000'
    console.log(par)
    contarctObj.poolContract.methods.withdraw(poolInfo.id,par).send({from: account})
    .on('transactionHash', ()=>{ // 交易hash
      
    })
    .on('confirmation', ()=>{ // 
      
    })
    .on('receipt', ()=>{ // 交易已广播
      if(!showalet) {
        setTimeout(()=>{
          Modal.show({
            content: <AlertTxt>赎回成功!</AlertTxt>,
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
        content: <AlertTxt>赎回失败，请重试!</AlertTxt>,
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
    contarctObj.poolContract.methods.claim(poolInfo.id).send({from: account})
    .on('transactionHash', ()=>{ // 交易hash
      
    })
    .on('confirmation', ()=>{ // 
      
    })
    .on('receipt', ()=>{ // 交易已广播
      if(!showalet) {
        setTimeout(()=>{
          Modal.show({
            content: <AlertTxt>提取成功!</AlertTxt>,
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
        content: <AlertTxt>提取失败，请重试!</AlertTxt>,
        closeOnMaskClick: true,
        showCloseButton: true,
      })
     
      setEarnStatus(0);
    })
  }
  const regetBalance = async ()=>{
    const balance_in = await contarctObj.inContract.methods.balanceOf(account).call();
    // const balance_out = await contarctObj.outContract.methods.balanceOf(account).call();
    const res = (startools.mathpow(balance_in,poolInfo.demical_out) * 1).toFixed(6);
    if(res === balanceObj.balance_in) {
      setTimeout(()=>{
        regetBalance();
      },2000)
      return   
    }
    setBalanceObj({
      ...balanceObj,
      balance_in: saveNumber(startools.mathpow(balance_in,poolInfo.demical_in),6)
    })
  }

  return (
    <PoolsPage>
      <div className='pledge_view'>
        {/* <p className='pledge_title'>GBT合作矿池</p> */}
        <img src={poolInfo.icon_out || require(`./../../assets/img/money.png`)} alt="" className='pledge_img'/>
        <p className='pledge_txt'>{poolInfo.name_out}挖矿收益</p>
        <p className='pledge_value'>{earnNum.toFixed(6)}</p>
        <div className='pledge_btn' style={earnNum === 0 ? { opacity: 0.5} : {}} onClick={()=>earnFn()}>{earnStatus === 0 ? '立即提现' : '提现中...'}</div>
      </div>

      <div className='pledge_view'>
        {/* <p className='pledge_title'>GBT合作矿池</p> */}
        <img src={poolInfo.icon_out || require(`./../../assets/img/money.png`)} alt="" className='pledge_img'/>
        <p className='pledge_txt'>推广收益</p>
        <p className='pledge_value' style={{marginBottom: '27px'}}>{inviteNum.toFixed(6)}</p>
        <div className='pledge_btn' onClick={()=>history.push(`/earnings/${poolInfo.id}`)}>我的团队</div>
      </div>

      <div className='pledge_view'>
        {/* <p className='pledge_title'>GBT合作矿池</p> */}
        <img src={poolInfo.icon_in || require(`./../../assets/img/money.png`)} alt="" className='pledge_img'/>
        <p className='pledge_txt'>已质押LP</p>
        <p className='pledge_value'>{stakeNum.toFixed(6)}</p>
        { 
          (allownObj.allow_in || 0) === 0
          ?<div className='pledge_btn' onClick={()=>apprveFn()}>{approveStaus===1 ? '授权中...' : `授权${poolInfo.name_in}`}</div>
          :(stakeNum === 0
          ?<div className='pledge_btn' onClick={()=>setShowPledge(true)}>立即质押</div>
          :<div className='btn_view'>
            <div className='pledge_btn' onClick={()=>setShowWithdraw(true)}>取消质押</div>
            <div className='add_btn' onClick={()=>setShowPledge(true)}><img src={require('./../../assets/img/add.png')} alt="" /></div>
          </div>)
        }
      </div>
      {
        showPledge &&
        <div className='pledge_modal'>
          <div className='content_view'>
            <div className='close_img' onClick={()=>setShowPledge(false)}><img src={require('./../../assets/img/close.png')} alt="" /></div>
            <p className='title'>质押</p>

            <div className='input_view'>
              <input onChange={pledgeInput} value={pledgeValue} placeholder="请输入数量" type='number' />
              <p onClick={()=>pledgeInput({target:{value:balanceObj.balance_in}})}>全部</p>
            </div>

            <p className='can_use_text '>{balanceObj.balance_in} 可质押</p>
            <div className='pledge_btn1' style={!canStake ? { opacity: 0.5} : {}} onClick={()=>stakeFn()}>
             {  stakestatus ===0 ? '确定':'交易中...'}
            </div>
          </div>
        </div>
      }
      {
        showWithdraw &&
        <div className='pledge_modal'>
          <div className='content_view'>
            <div className='close_img' onClick={()=>setShowWithdraw(false)}><img src={require('./../../assets/img/close.png')} alt="" /></div>
            <p className='title'>赎回</p>
            <div className='input_view'>
              <input onChange={widthdrawInput} value={redeemValue} placeholder="请输入数量" type='number' />
              <p onClick={()=>widthdrawInput({target:{value:stakeNum+''}})}>全部</p>
            </div>
            <p className='can_use_text '>{stakeNum.toFixed(6)} 可赎回</p>
            <div className='pledge_btn1' style={!canRedeem ? { opacity: 0.5} : {}} onClick={()=>redeemFn()}>
            {  redeemstatus ===0 ? '确定':'赎回中...'}
            </div>
          </div>
        </div>
      }
    </PoolsPage>
  )
}
