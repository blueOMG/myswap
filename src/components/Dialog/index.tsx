import React, {  } from 'react'

import styled from 'styled-components'

const DialogPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  .confirm {
    width: 80%;
    height: auto;
    padding-top: 20px;
    padding-bottom: 1px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      color: #333;
      font-weight: 600;
      margin-bottom: 30px;
      text-align: center;
    }
    .contenthtml {
      margin-bottom: 30px;
      padding: 0 20px;
    }
    .btnView {
      display: flex;
      border-top: 1px solid #eeeeee;
      .btn {
        width: 50%;
        height: 39px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #146DFE;
      }
      .cancel {
        color: #999;
        border-right: 1px solid #eeeeee;
      }
    }
  }
`


export default function Dialog(props:any) {
  const { show, text, type,content,close,confirm } = props;
  if(!show) {
    return <></>
  }
  
    
  if(type==='confirm') {
    return (
      <DialogPage>
        <div className='confirm'>
          <p className='title'>提示</p>
          <div className='contenthtml'>{content}</div>
          <div className='btnView'>
            <div className='btn cancel' onClick={()=>close()}>取消</div>
            <div className='btn' onClick={()=>confirm()}>确定</div>
          </div>
        </div>
      </DialogPage>
    )
  }
  return <DialogPage>
    <div className='content'>
      <p>{text}</p>
      <div>确定</div>
    </div>
  </DialogPage>
}
