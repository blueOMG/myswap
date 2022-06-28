import React, { } from 'react'
import styled from 'styled-components'
import SwiperBanner from '../../components/SwiperBanner';
// import { Link, useLocation } from 'react-router-dom'
const HomePage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  
  
  z-index: 10;
  * {
    margin: 0;
    padding: 0;
  }
  .banner_view {
    
    width: 100%;
    height: auto;
    margin: auto;
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
      <SwiperBanner />
    </div>
    <p className='nodata'>敬请期待</p>
   </HomePage>
 )
}
