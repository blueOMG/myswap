import React, { } from 'react'
import styled from 'styled-components'
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
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
  }
  .banner_view {
    
    width: 100%;
    height: auto;
    margin: auto;
    img {
      width: 100%
    }
  }
  .nodata {
    width: 100%;
    font-size: 14px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }
`

export default function NFT() {
 return (
   <HomePage>
    <div className='banner_view'>
      <img src={require('./../../assets/img/banner.png')} alt="banner"/>
    </div>
    <p className='nodata'>敬请期待</p>
   </HomePage>
 )
}
