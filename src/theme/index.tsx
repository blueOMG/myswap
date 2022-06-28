import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // backgrounds / greys
    bg1: darkMode ? '#212429' : '#FFFFFF',
    bg2: darkMode ? '#1a1a1a' : '#F7F8FA',
    bg3: darkMode ? '#40444F' : '#EDEEF2',
    bg4: darkMode ? '#565A69' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#ff007a',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#ff007a',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2172E5',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // 自定义颜色
    headerColor: darkMode ? '#ffffff' : '#302A58',
    headerBorder: darkMode ? '#146DFE' : '#312B57',
    bannerBgColor: darkMode ? 'linear-gradient(#4289FF,#1A59E7);' : 'linear-gradient(#F4E9F2,#F4E9F2);',

    indexBg: darkMode ? 'linear-gradient(227deg,#333 0%,#132022 100%);' : '#fff',
    indexColor1: darkMode ? '#ffffff' : '#312B57',
    indexBorderColor: darkMode ? '#146DFE' : '#F3DEE1',
    indexColor2: darkMode ? '#ffffff' : '#302A58', 
    indexColor3: darkMode ? '#96949f' : '#312B57', 
    
    indexBtnBg: darkMode ? '#146DFE' : '#302A58', 
    indexBtnColor: darkMode ? '#ffffff' : '#C2E5D3', 
    indexColor4: darkMode ? 'rgba(255,255,255,0.49)' : '#312B57',
    inviteBg: darkMode ? '#353535' : 'rgba(244, 233, 242, 0.8)',
    indexColor5: darkMode ? 'rgba(255,255,255,0.45)' : '#302A58',
    indexColor6: darkMode ? '#146DFE' : '#302A58',
    indexColor7: darkMode ?  'rgba(255,255,255,0.5)' : 'rgba(48,42,88,0.5)',
    copyBtnBg: darkMode ? 'none' : '#F3DEE1',
    poolBorderColor: darkMode ? '#000' : '#C2E5D3',
    poolIntroBorderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : '#F9EFF0',
    poolIntroBg: darkMode ? 'none' : '#F9EFF0',
    intro_iconBg: darkMode ? '#fff' : '#FFA8B4',
    intro_iconColor: darkMode ? '#000' : '#fff',
    zuanquBg: darkMode ? '#9EC7FF' : '#FEEAF1',
    zuanquColor: darkMode ? '#146DFE' : '#FF576F',
    otherInfoBg: darkMode ? 'none' : '#C2E5D3',
    otherInfoBorderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : '#C2E5D3',
    otherinfoTitleBg: darkMode ? '#111111' : '#94E2BA',
    otherinfoTitleColor: darkMode ? '#fff' : '#fff',
    otherinfoTitleBorderColor: darkMode ? '#146DFE' : '#C2E5D3',

    countDownBg: darkMode ? 'linear-gradient(270deg,rgba(53,55,58,0) 0%,#35373A 49%,rgba(53,55,58,0) 100%)' : 'linear-gradient(270deg, rgba(249, 247, 250, 0) 0%, #F9F7FA 49%, rgba(249, 247, 250, 0) 100%)',

    poolDetailBg1: darkMode ? 'linear-gradient(227deg,#333 0%,#132022 100%)' : '#EADAE6',
    add_btnBg: darkMode ? '#333' : '#fff',
    myteamBg: darkMode ? 'none' : '#fff',
    myteamBorderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : '#fff',
    myteamColor: darkMode ? '#fff' : '#FF576F',
    earningBg: darkMode ? 'linear-gradient(227deg,#333 0%,#132022 100%)' : '#F3DEE1',
    earningTitleBg: darkMode ? 'linear-gradient(123deg,#448BFF 0%,#1A59E7 100%)' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
    earningTitleColor:  darkMode ? '#fff' : '#302A58',
    earningContentBorderColor: darkMode ? '#fff' : '#F3DEE1',
    earningContentColor: darkMode ? '#146DFE' : '#FF576F',
    daoCountdownBg: darkMode ? '#363636' : '#C2E5D3',
    daoCountdownBorderColor: darkMode ? '#F3DEE1' : '#4CBA8A',

  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

 a {
   color: ${colors(false).blue1}; 
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
      1,
      theme.bg1
    )} 100%)`};
}
`
