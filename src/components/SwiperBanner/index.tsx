// SwiperBanner
import React, { } from 'react'
// Import Swiper styles
import styled from 'styled-components'
const BannerCom = styled.div`
  width: 100%;
  img {
    width: 100%
  }
`

export default function SwiperBanner(props:any) {
//  const { list } = props;
//  const data:any = list.length ? list : [{ url:require('./../../assets/img/banner.png') },{ url:require('./../../assets/img/banner.png') },{ url:require('./../../assets/img/banner.png') }];
 return (
   <BannerCom>
    {/* <Swiper className="mySwiper" loop={true} autoplay={true}>
      
          <SwiperSlide>
            <img src={require('./../../assets/img/banner.png')} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={require('./../../assets/img/banner.png')} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={require('./../../assets/img/banner.png')} alt="" />
          </SwiperSlide>
      </Swiper> */}
      <img src={require('./../../assets/img/banner.png')} alt="" />
   </BannerCom>
 )
}

