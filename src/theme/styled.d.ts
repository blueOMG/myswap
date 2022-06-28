import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color

  // text
  text1: Color
  text2: Color
  text3: Color
  text4: Color
  text5: Color

  // backgrounds / greys
  bg1: Color
  bg2: Color
  bg3: Color
  bg4: Color
  bg5: Color

  modalBG: Color
  advancedBG: Color

  //blues
  primary1: Color
  primary2: Color
  primary3: Color
  primary4: Color
  primary5: Color

  primaryText1: Color

  // pinks
  secondary1: Color
  secondary2: Color
  secondary3: Color

  // other
  red1: Color
  red2: Color
  red3: Color
  green1: Color
  yellow1: Color
  yellow2: Color
  blue1: Color,

  // 自定义
  headerColor: Color,
  headerBorder: Color,
  bannerBgColor: Color,

  indexBg: Color,
  indexColor1: Color,
  indexColor2: Color, 
  indexColor3: Color, 
  indexBorderColor: Color,
  indexBtnBg: Color,
  indexBtnColor: Color,
  indexColor4: Color,
  inviteBg: Color,
  indexColor5: Color,
  indexColor6: Color,
  copyBtnBg: Color,
  poolBorderColor: Color,
  poolIntroBorderColor: Color,
  poolIntroBg: Color,
  intro_iconBg: Color,
  intro_iconColor: Color,
  zuanquBg: Color,
  zuanquColor: Color,
  otherInfoBg: Color,
  otherInfoBorderColor: Color,
  otherinfoTitleBg: Color,
  otherinfoTitleColor: Color,
  otherinfoTitleBorderColor: Color,
  countDownBg: Color,
  poolDetailBg1: Color,
  indexColor7: Color,
  add_btnBg: Color
  myteamBg: Color,
  myteamBorderColor: Color,
  myteamColor: Color,
  earningBg: Color,
  earningTitleBg: Color,
  earningTitleColor: Color,
  earningContentBorderColor: Color,
  earningContentColor: Color,
  daoCountdownBg: Color,
  daoCountdownBorderColor: Color,
}

export interface Grids {
  sm: number
  md: number
  lg: number
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids

    // shadows
    shadow1: string

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
  }
}
