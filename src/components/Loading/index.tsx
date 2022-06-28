import React, {  } from 'react'

import styled from 'styled-components'

const LoadingPage = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
  animation:fadenum 1s linear infinite;
  @keyframes fadenum{
    0%{transform:rotate(0deg);}
   
    100%{transform:rotate(360deg);}

  }
`


export default function Loading() {
  return (
    <LoadingPage>
      <img src={require('./../../assets/img/Loading.png')} alt="" />
    </LoadingPage>
  )
}
