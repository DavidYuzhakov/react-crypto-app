import { Divider, Typography, Tag } from "antd";
import { formatDigits } from "../utils";
import CoinInfo from "./CoinInfo";
import { CryptoItem } from "../store/cryptoSlice";

interface CoinModalProps {
  coin: CryptoItem
}

export default function CoinModal ({ coin }: CoinModalProps) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {formatDigits(coin.price.toString())}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {formatDigits(coin.priceBtc.toString())}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {formatDigits(coin.marketCap.toString())}$
      </Typography.Paragraph>
      {coin?.contractAddress && <Typography.Paragraph>
        <Typography.Text strong>Contract Address: </Typography.Text>
        {coin?.contractAddress}
      </Typography.Paragraph>}
    </>
  )
}