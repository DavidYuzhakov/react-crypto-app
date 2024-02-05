import { Flex, Typography } from "antd";
import { CryptoItem } from "../store/cryptoSlice";

interface CoinInfoProps {
  coin: CryptoItem
  withSymbol?: boolean
}

export default function CoinInfo({ coin, withSymbol }: CoinInfoProps) { 
  return (
    <Flex align="center">
      <img
        width={40}
        style={{ marginRight: 10 }}
        src={coin.icon}
        alt={coin.name}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
      {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  )
}