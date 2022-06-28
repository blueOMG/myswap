// import { ChainId } from 'startswaphl-sdk'
import React, { useEffect, useState } from 'react'

import styled from 'styled-components'



const CountDownPage = styled.div`
  p {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }
`
let intervalObj:any = null;
export default function CountDown(props:any) {
  const { styleobj, time, callBack, contract } = props
  
  const [ timeTxt, setTimeTxt ] = useState<any>({})


  useEffect(()=>{
    console.log(time)
    if(time && contract) {
      
      const now = new Date().getTime()
      startDown(time - now, contract)
    }
  },[time,contract])

  useEffect(()=>{
    return ()=>{
      intervalObj && clearInterval(intervalObj);
    }
  },[])

  const startDown = (nums:number,contractobj:any)=>{
      let clock = setInterval(() => {
          nums-=1000;
          if(nums > 0){
            let d = Math.floor(nums / (1000*60*60*24))  //计算天数
            let h = Math.floor(nums / (1000*60*60)%24)  //计算小时数
            let m = Math.floor(nums / (1000*60)%60)  //计算分钟数
            let s = Math.floor(nums / 1000%60)  //计算秒数
            setTimeTxt({
              day: d.toString(),
              hour: h.toString(),
              minutes: m.toString(),
              seconds: s.toString()
            })
          }else{
            intervalObj && clearInterval(intervalObj);
            callBack && callBack(contractobj)
          }
      },1000);
      intervalObj = clock;
  }
  return (
    <CountDownPage>
      <p style={styleobj || {}}>
        {`${timeTxt.day || '--'} 天 ${timeTxt.hour || '--'} 小时 ${timeTxt.minutes || '--'} 分钟 ${timeTxt.seconds || '--'} 秒`}
      </p>
    </CountDownPage>
  )
}
