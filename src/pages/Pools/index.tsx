import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import poolData from './../../poolAssets/poolConfig'
import liquidityabi from './../../poolAssets/liquidityabi'
import liquidityPoolConfig from './../../poolAssets/liquidityPoolConfig'
import startools from '../../poolAssets/startools'
import SwiperBanner from '../../components/SwiperBanner';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import CountDown from '../../components/CountDown'
import Web3 from 'web3'
import { useIsDarkMode } from '../../state/user/hooks'
// import SingleCoin from './SingleCoin'
// import { Link, useLocation } from 'react-router-dom'
const PoolsPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  
  
  z-index: 10;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .banner_view {
    width: 100%;
    margin: auto;
    margin-bottom: 46px;
    
  }
  .tab_view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;
    .tab_item {
      padding: 0 10px;
      padding-bottom: 18px;
      position: relative;
      .tab_item_txt {
        width: 100%;
        font-weight: bold;
        text-align: center;
        font-size: 13px;
        color: ${({ theme }) => theme.indexColor1};
      }
      .choose_tab {
        font-size: 13px;
        color: ${({ theme }) => theme.indexColor1};
      }
      .tab_item_border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
    }
  }
  .single_view {
    width: 100%;
    min-height: 277px;
    padding: 23px 18px 15px 18px;
    background: ${({ theme }) => theme.indexBg};
    border-radius: 15px;
    margin-bottom: 25px;
    border:  5px solid ${({ theme }) => theme.poolBorderColor};
    position: relative;
    padding-top: 63px;
    .star_title {
      width: 100%;
      text-align: center;
      line-height: 53px;
      font-size: 14px;
      font-weight: bold;
      color: ${({ theme }) => theme.indexColor2};
      position: absolute;
      top: -5px;
      left: 50%;
      width: 180px;
      height: 40px;
      margin-left: -90px;
      line-height: 40px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .intro_view {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      border: 1px solid ${({ theme }) => theme.poolIntroBorderColor};
      background: ${({ theme }) => theme.poolIntroBg};
      border-radius: 15px;
      padding-top: 29px;
      padding-bottom: 15px;
      position: relative;
      .intro_icon {
        position: absolute;
        width: 80px;
        height: 25px;
        top: -15px;
        left: -1px;
        background: ${({ theme }) => theme.intro_iconBg};
        text-align: center;
        line-height: 25px;
        font-size: 12px;
        color: ${({ theme }) => theme.intro_iconColor};
        border-radius: 25px 25px 25px 0px;
      }
      .zuanqu {
        width: 100px;
        height: auto;
        position: relative;
        margin: 0 10px;
        img {
          width: 100%;
          height: auto;
        }
        p {
          margin: 0 auto;
          margin-top: -4px;
          width: 40px;
          height: 27px;
          background: ${({ theme }) => theme.zuanquBg};
          border-radius: 0px 0px 5px 5px;
          font-size: 15px;
          color: ${({ theme }) => theme.zuanquColor};
          line-height: 27px;
          text-align: center;
        }
      }
      .coin_view {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: auto;
          height: 34px;
          margin-bottom: 10px;
          /* border-radius: 50%; */
        }
        p {
          font-size: 10px;
          font-weight: bold;
          color:  ${({ theme }) => theme.indexColor5};
          text-align: center;
        }
      }
    }
    .otherInfo {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      
      p {
        font-size: 12px;
        color: 1px solid ${({ theme }) => theme.indexColor2};
      } 
      .otherinfoTitle {
        width: 92px;
        height: 25px;
        opacity: 1;
        border: 1px solid ${({ theme }) => theme.otherinfoTitleBorderColor};
        text-align: center;
        line-height: 25px;
        position: absolute;
        left: -1px;
        top: -15px;
        font-size: 12px;
        color: ${({ theme }) => theme.otherinfoTitleColor};
        background: ${({ theme }) => theme.otherinfoTitleBg};;
        border-radius: 25px 25px 25px 0px;
      }
      .nianhua {
        flex: 2;
        height: 45px;
        border-radius: 15px;
        background: ${({ theme }) => theme.otherInfoBg};
        border: 1px solid ${({ theme }) => theme.otherInfoBorderColor};
        padding: 16px;
        display: flex;
        align-items: center;
        position: relative;
        
      }
      .total {
        flex: 3;
        height: 45px;
        border-radius: 15px;
        background: ${({ theme }) => theme.otherInfoBg};
        border: 1px solid ${({ theme }) => theme.otherInfoBorderColor};
        padding: 16px;
        position: relative;
        margin-left: 15px;
      }
    }
    .countDown {
      width: 100%;
      height: 56px;
      background: ${({ theme }) => theme.countDownBg};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      text-align: center;
      span {
        font-size: 12px;
        color: ${({ theme }) => theme.indexColor2};
      }
      p:first-child {
        font-size: 12px;
        color: ${({ theme }) => theme.indexColor6};
        margin-bottom: 5px
      }
      p:last-child {
        font-size: 12px;
        color: ${({ theme }) => theme.indexColor2};
      }
    }
    .pool_info_text {
      font-size: 14px;
      color: #fff;
      margin-bottom: 20px;
      text-align: left;
      padding: 0 16px;
      span {
        color: #146DFE
      }
    }
    a {
      color: none;
      text-decoration: none;
    }
    .pool_btn {
      margin: 0 auto;
      width: 260px;
      height: 50px;
      background: ${({ theme }) => theme.indexColor6};
      border-radius: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 15px;
      font-weight: 500;
      color: ${({ theme }) => theme.indexBtnColor};
      a {
        text-decoration: none;
        color: ${({ theme }) => theme.indexBtnColor};
      }
      
    }
    
  }
  
`
const LoadingView = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoData = styled.p`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: ${({ theme }) => theme.indexColor2};
`
export default function Pools() {
  const darkMode = useIsDarkMode()

  // 获取url 邀请地址
  const getInviteAddr = (name:string)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const history = useHistory();
  const { account } = useWeb3React();
  const [ tab, setTab ] = useState(2);
  const [ liquidityPool, setLiquidityPool ] = useState<any>({end:[],doing:[]});
  const [ liquidityLoading, setLiquidityLoading ] = useState(true)
  useEffect(()=>{
    localStorage.removeItem('INVITECODE');
    const res = getInviteAddr('code')
    localStorage.setItem('INVITECODE',res || '')
    getPoolList()
  },[]);
  // 获取流动性挖矿列表
  const getPoolList = async ()=>{

    // 获取流动性挖矿列表的 合约地址   质押地址
    const { poolList_addr, poolStake_addr } = liquidityPoolConfig

    const web3Obj:any = window.web3;
    if (typeof web3Obj !== 'undefined') {
      
      var web3js = new Web3(web3Obj.currentProvider);
      const listPoolContract = new web3js.eth.Contract(liquidityabi.listpoolabi, poolList_addr, { from: account || '' });
      const res = await listPoolContract.methods.getAllPoolInfo().call(); // 获取全部矿池列表
      console.log('zzzzzz',res)
      const res1 = await listPoolContract.methods.getAllPoolExtraInfo().call();  //  获取矿池的扩展信息
      const result = res.lpToken.reduce((acc:any,item:any,index:number)=>{
        const lp0 = res1.lpToken0Symbol[index]
        const lp1 = res1.lpToken1Symbol[index]
        const reward = res1.rewardTokenSymbol[index];
        const itemobj = {
          name_in: lp0 === lp1 ? lp0 : `${lp0}-${lp1}`,
          name_out: reward,
          total:  Number(startools.mathpow(res.amount[index],res1.rewardTokenDecimals[index])),
          start: new Date(res.startTime[index]*1000).toLocaleString(),
          end: new Date(res.endTime[index]*1000).toLocaleString(),
          id: index,
          demical_out: res1.rewardTokenDecimals[index],
          demical_in: res1.lpTokenDecimals[index],
          coin_in: item,
          coin_out: res.rewardToken[index],
          stake_pool: poolStake_addr,
          title: `STAR官方${index+1}号矿池`
        }
        if(Number(res.rewardPerBlock[index]) === 0 || (new Date().getTime() > new Date(res.endTime[index]*1000).getTime()) ) {
          acc.end.push(itemobj)
        } else {
          acc.doing.push(itemobj)
        }
        return acc
      },{end: [],doing:[]})
      setLiquidityPool(result)
      setLiquidityLoading(false)
    }
  }
  const goDetail = (item:any, type:number)=> {
    if(type === 1) {
      return 
    }
    if(type === 2) {
      localStorage.setItem('liquidityPoolInfo',JSON.stringify(item))
      history.push(`/poolsDetail1/liquidity_pool/${item.id}`)
      return 
    }
    if(type === 3) {
      const now = (new Date().getTime()) *1 ;
      const start = (new Date(item.start).getTime())*1;
      if(start > now) {
        showToastFn('挖矿未开始','faile')
        return 
      }
      history.push(`/poolsDetail/cooperate_pool/${item.id}`)
      return 
    }
    
  }

  const [ showToast, setshowToast] = useState(false);
  const [ toastText, settoastText ] = useState('');
  const [ toastStatus,settoastStatus ] = useState('success');
  const showToastFn = (text:any,status:string)=>{
    setshowToast(true);
    settoastText(text);
    settoastStatus(status)
    setTimeout(()=>{
      setshowToast(false);
      settoastText('');
    },2000)
  }
  return (
    <PoolsPage>
      {/* toast */}
      <Toast show={showToast}  text={toastText} type={true} status={toastStatus}/>
      <div className='banner_view'>
        <SwiperBanner />
      </div>
      <div className='tab_view'>
        {/* <div className='tab_item' onClick={()=>setTab(1)}>
          <p className={`tab_item_txt ${tab===1 && 'choose_tab'}`}>単币质押</p>
          {tab === 1 && <img src={require('./../../assets/img/pool_tab_bg.png')} alt="" className='tab_item_border'/>}
        </div> */}
        <div className='tab_item' onClick={()=>setTab(2)}>
          <p className={`tab_item_txt ${tab===2 && 'choose_tab'}`}>流动性挖矿</p>
          {tab === 2 && <img src={require(`./../../assets/img/pool_tab_bg${darkMode?'':'_white'}.png`)} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(3)}>
          <p className={`tab_item_txt ${tab===3 && 'choose_tab'}`}>社区合作矿池</p>
          {tab === 3 && <img src={require(`./../../assets/img/pool_tab_bg${darkMode?'':'_white'}.png`)} alt="" className='tab_item_border'/>}
        </div>
        <div className='tab_item' onClick={()=>setTab(4)}>
          <p className={`tab_item_txt ${tab===4 && 'choose_tab'}`}>已结束矿池</p>
          {tab === 4 && <img src={require(`./../../assets/img/pool_tab_bg${darkMode?'':'_white'}.png`)} alt="" className='tab_item_border'/>}
        </div>
      </div>
      {/* 单币质押 */}
      {/* {
        tab === 1 &&
        <SingleCoin />
      } */}
      {/* 流动性挖矿 */}
      {
        tab === 2 &&
        <>
          {
            liquidityLoading
            ?<LoadingView><Loading  /></LoadingView>
            :(
              liquidityPool.doing.length === 0
              ?<NoData>暂无矿池</NoData>
              :liquidityPool.doing.map((item:any,index:number)=>{
              return(
                <div className='single_view' key={index+'liquidityPoolList'}>
                  <div className='star_title'>
                    <p>{item.title}</p>
                    <img src={require(`./../../assets/img/poolitemtitle${darkMode?'':'_white'}.png`)} alt="" />
                  </div>
                  <div className='intro_view'>
                    <div className='intro_icon'>矿池信息</div>
                    <div className='coin_view'>
                      <img src={require(`./../../assets/img/money0_in.png`)}  alt="" />
                      <p>{item.name_in}</p>
                    </div>
                    
                    <div className='zuanqu'>
                      <img src={require(`./../../assets/img/zuanqu${darkMode?'':'_white'}.png`)}alt="" />
                      <p>赚取</p>
                    </div>
                    <div className='coin_view'>
                      <img src={require(`./../../assets/img/money0_out.png`)}  alt="" />
                      <p>{item.name_out}</p>
                    </div>
                  </div>
                  <div className='otherInfo'>
                    <div className='nianhua'>
                      <p>36%</p>
                      <div className='otherinfoTitle'>年化收益率</div>
                    </div>
                    <div className='total'>
                      <p>{item.total}</p>
                      <div className='otherinfoTitle'>总质押量</div>
                    </div>
                  </div>
                  <div className='countDown'>
                    {
                      new Date(item.start).getTime() > new Date().getTime()
                      ? <span>挖矿未开始</span>
                      :<div>
                        <p>挖矿结束倒计时</p>
                        <CountDown time={new Date(item.end).getTime()} callBack={()=>{}} contract={true}/>
                      </div>
                    }
                  </div>
                  {
                    account
                    ?<div className='pool_btn' onClick={()=>goDetail(item,tab)}>
                        进入矿池
                      </div>
                    :<div className='pool_btn' onClick={()=>{
                      showToastFn('请先到首页连接钱包','faile');
                    }}>
                      进入矿池
                    </div>
                  }
                  
                </div>
              
              )
            }))
          }
        </>
      }
      {/* 社区合作 */}
      {
        tab === 3 &&
        <>
          {
            poolData.cooperate_pool.map((item:any,index:number)=>{
              return <div className='single_view' key={index+'cooperate_pool'}>
                <div className='star_title'>
                    <p>{item.title}</p>
                    <img src={require(`./../../assets/img/poolitemtitle${darkMode?'':'_white'}.png`)} alt="" />
                  </div>
                <div className='intro_view'>
                  <div className='intro_icon'>矿池信息</div>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/${item.icon_in}.png`)} alt="" />
                    <p>{item.name_in}</p>
                  </div>
                  <div className='zuanqu'>
                      <img src={require(`./../../assets/img/zuanqu${darkMode?'':'_white'}.png`)}alt="" />
                      <p>赚取</p>
                    </div>
                  <div className='coin_view'>
                    <img src={require(`./../../assets/img/${item.icon_out}.png`)} alt="" />
                    <p>{item.name_out}</p>
                  </div>
                </div>
                
                <div className='otherInfo'>
                  <div className='nianhua'>
                    <p>36%</p>
                    <div className='otherinfoTitle'>年化收益率</div>
                  </div>
                  <div className='total'>
                    <p>{item.total}</p>
                    <div className='otherinfoTitle'>总质押量</div>
                  </div>
                </div>

                <div className='countDown'>
                  {
                    new Date(item.start).getTime() > new Date().getTime()
                    ? <span>挖矿未开始</span>
                    :<div>
                      <p>挖矿结束倒计时</p>
                      <CountDown time={new Date(item.end).getTime()} callBack={()=>{}} contract={true}/>
                    </div>
                  }
                </div>
                
                {
                  account
                  ?<div className='pool_btn' onClick={()=>goDetail(item,tab)}>
                      进入矿池
                    </div>
                  :<div className='pool_btn' onClick={()=>{
                    showToastFn('请先到首页连接钱包','faile');
                  }}>
                    进入矿池
                  </div>
                }
                
              </div>
            })
          }
          

          {/* <div className='single_view' style={{marginTop: 50}}>
            <div className='star_title'>NFT分红池</div>
            <div className='pool_balance'>
              <p>矿池存量：</p>
              <p>135415321.0000</p>
            </div>
            <div className='pool_btn'>进入矿池</div>
          </div> */}
        </>
      }
      {
        tab === 4 &&
        <>
          {
            liquidityPool.end.length
            ?liquidityPool.end.map((item:any,index:number)=>{
              return(
                <div className='single_view' key={index+'liquidityPoolList'}>
                  <div className='star_title'>
                    <p>{item.title}</p>
                    <img src={require(`./../../assets/img/poolitemtitle${darkMode?'':'_white'}.png`)} alt="" />
                  </div>
                  <div className='intro_view'>
                    <div className='intro_icon'>矿池信息</div>
                    <div className='coin_view'>
                      <img src={require('./../../assets/img/money.png')}  alt="" />
                      <p>{item.name_in}</p>
                    </div>
                    <div className='zuanqu'>
                      <img src={require(`./../../assets/img/zuanqu${darkMode?'':'_white'}.png`)} alt="" />
                      <p>赚取</p>
                    </div>
                    <div className='coin_view'>
                      <img src={require('./../../assets/img/money.png')}  alt="" />
                      <p>{item.name_out}</p>
                    </div>
                  </div>
                  {/* <p className='pool_info_text'><span>矿池总量：</span>{item.total}</p>
                  <p className='pool_info_text'><span>开始时间：</span>{item.start}</p>
                  <p className='pool_info_text'><span>结束时间：</span>{item.end}</p> */}
                  <div className='otherInfo'>
                    <div className='nianhua'>
                      <p>36%</p>
                      <div className='otherinfoTitle'>年化收益率</div>
                    </div>
                    <div className='total'>
                      <p>{item.total}</p>
                      <div className='otherinfoTitle'>总质押量</div>
                    </div>
                  </div>
                  <div className='countDown'>
                    <span>挖矿已结束</span>
                  </div>
                  {
                    account
                    ?<div className='pool_btn' onClick={()=>goDetail(item,2)}>
                        进入矿池
                      </div>
                    :<div className='pool_btn' onClick={()=>{
                      showToastFn('请先到首页连接钱包','faile')
                    }}>
                      进入矿池
                    </div>
                  }
                  
                </div>
              
              )})
            :<NoData>暂无矿池</NoData>
          }
        </>
      }
      
    </PoolsPage>
  )
}
