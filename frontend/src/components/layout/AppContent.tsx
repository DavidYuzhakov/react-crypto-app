import { CSSProperties } from 'react'
import { Layout, Typography } from 'antd'

import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'
import { useAppSelector } from '../../hooks'

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 64px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

export default function AppContent() {
  const assets = useAppSelector(state => state.assets.items)
  const crypto = useAppSelector(state => state.crypto.items)

  const cryptoPriceMap = crypto.reduce((acc: any, c) => { //
    acc[c.rank] = c.price
    return acc
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .reduce((total, asset) => total += asset.amount * cryptoPriceMap[asset.rank], 0).toFixed(2)
        }$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}
