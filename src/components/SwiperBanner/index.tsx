// SwiperBanner
import React, { } from 'react'
import { Swiper } from 'antd-mobile'
import styled from 'styled-components'
const BannerCom = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 98%;
    border-radius: 10px;
    display: block;
    margin: 0 auto;
  }
`

export default function SwiperBanner(props:any) {
 const { list } = props;
 const data:any = [{img:require('./../../assets/img/banner.png') },{img:require('./../../assets/img/banner1.png')},{img:require('./../../assets/img/banner2.png')},{img:require('./../../assets/img/banner3.png')}];
 return (
   <BannerCom>
    <Swiper autoplay={true} loop={true} autoplayInterval={1000} style={{borderRadius: 10}}>
      {
        (list || data).map((item:any, index:number) => (
          <Swiper.Item key={index} >
            <img src={item.img} alt="" />
          </Swiper.Item>
        ))
      }
    </Swiper>
   </BannerCom>
 )
}

