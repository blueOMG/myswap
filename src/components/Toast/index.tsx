import React, { } from 'react'

import styled from 'styled-components'

const ToasPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .content {
    padding: 5px 8px;
    font-size: 13px;
    color: #fff;
    background: rgba(0,0,0,0.4);
    border-radius: 4px;
    max-width: 200px;
  }
`

const ToasPage1 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .content {
    padding: 15px;
    font-size: 13px;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    max-width: 200px;
    min-width: 100px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: 30px;
      margin-bottom: 15px;
    }
  }
`


export default function Toast(props:any) {
  const { show, text,type,status } = props;
  if(!show) {
    return <></>
  }
  if(type) {
    return <ToasPage1>
      <div className='content'>
        <img src={status=='success'?require('./../../assets/img/success.png'):require('./../../assets/img/faile.png')} alt="" />
        <p>{text}</p>
      </div>
    </ToasPage1>
  }
  return (
    <ToasPage>
      <div className='content'>
        {text}
      </div>
    </ToasPage>
  )
}
