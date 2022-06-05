import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from 'hlbscswap-sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'
// import Settings from '../../components/Settings'

import Question from '../../components/QuestionHelper'
import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE } from '../../theme'
import { Text } from 'rebass'
import { LightCard } from '../../components/Card'
import { RowBetween } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import AppBody from '../AppBody'
import { Dots } from '../../components/swap/styleds'
import SwiperBanner from '../../components/SwiperBanner';
// import Web3Status from '../../components/Web3Status'
import styled from 'styled-components'

const PoolPage = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  position: relative;
  padding-top: 25px;
  margin-top: -95px;
  z-index: 10;
  .banner_view {
    width: 100%;
    height: auto;
    margin: auto;
    margin-bottom: 10px
    
  }
  .wallet_view {
    flex: 1;
    height: 33px;
    background: #427BFC;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    .network_txt {
      font-size: 12px;
      color: #fff;
      line-height: 33px;
      flex-shrink: 0;
      margin-left: 15px;
    }
    button {
      height: 33px;
      width: auto;
      background: none;
      border: none;
      outline: none;
      &:focus {
        background: none;
        border: none;
      }
    }
  }
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()
  
  return (
    <PoolPage>
      <div className='banner_view'>
        <SwiperBanner />
      </div>
      {/* <div style={{display:'flex',marginBottom: 10}}>
        <div className='wallet_view'>
          <Web3Status/>
          { chainId && NETWORK_LABELS[chainId] && <p className='network_txt'>已连接至 { chainId && (NETWORK_LABELS[chainId] && NETWORK_LABELS[chainId])}</p>}
        </div>
        <Settings/>
      </div> */}
      <AppBody>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="lg" justify="center">
          <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/add/ETH">
            <Text fontWeight={500} fontSize={20} color="#fff">
              添加流动性
            </Text>
          </ButtonPrimary>

          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                你的流动性资金池
              </Text>
              <Question text="当你添加了流动性，会收到对应的资金池的流动性代币代表你在池子中的份额。如果你看不到你加入的资金池，尝试在下方导入" />
            </RowBetween>

            {!account ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  连接钱包后查看流动性
                </TYPE.body>
              </LightCard>
            ) : v2IsLoading ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>加载中</Dots>
                </TYPE.body>
              </LightCard>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
              </>
            ) : (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  没有发现流动性资金池
                </TYPE.body>
              </LightCard>
            )}

            <div>
              <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }} color="#fff">
                {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "没有发现你参与的流动性资金池?"}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? 'Migrate now.' : '导入'}
                </StyledInternalLink>
              </Text>
            </div>
          </AutoColumn>
        </AutoColumn>
      </AppBody>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
        {/* <ButtonSecondary as={Link} style={{ width: 'initial' }} to="/migrate/v1">
          Migrate V1 Liquidity
        </ButtonSecondary> */}
      </div>
    </PoolPage>
  )
}
