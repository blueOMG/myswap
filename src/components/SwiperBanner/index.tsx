// SwiperBanner
import React, { } from 'react'
import styled from 'styled-components'
import { useIsDarkMode } from '../../state/user/hooks'
const BannerCom = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background:${({ theme }) => theme.bannerBgColor};
  img {
    width: 100%;
    border-radius: 10px;
    display: block;
    margin: 0 auto;
  }
`

export default function SwiperBanner(props:any) {
  const darkMode = useIsDarkMode()
//  const { list } = props;
//  const data:any = [{img:require('./../../assets/img/banner.png') },{img:require('./../../assets/img/banner1.png')},{img:require('./../../assets/img/banner2.png')},{img:require('./../../assets/img/banner3.png')}];
 return (
   <BannerCom>
    {/* <Swiper autoplay={true} loop={true} autoplayInterval={1000} style={{borderRadius: 10}}>
      {
        (list || data).map((item:any, index:number) => (
          <Swiper.Item key={index} >
            <img src={item.img} alt="" />
          </Swiper.Item>
        ))
      }
    </Swiper> */}
    <img src={props.type ?require(`./../../assets/img/banner2${darkMode?'':'_white'}.png`):require(`./../../assets/img/banner1${darkMode?'':'_white'}.png`)} alt="" />
   </BannerCom>
 )
}

