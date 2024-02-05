import {
  Divider,
  Select,
  Space,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd'
import { useRef, useState } from 'react'
import { useForm } from 'antd/es/form/Form'

import CoinInfo from './CoinInfo'

import { CryptoItem } from '../store/cryptoSlice'
import { addAsset } from '../store/assetsSlice'

import { useAppDispatch, useAppSelector } from '../hooks'
import { percentDifference } from '../utils'

interface AddAssetFormProps {
  onClose: () => void
}

export default function AddAssetForm({ onClose }: AddAssetFormProps) { 
  type newAsset = {
    id: string;
    amount: number;
    price: number;
    date: Date;
  }

  type formData = {
    amount: number
    date: any
    price: number
    total: number
  }

  const crypto = useAppSelector(state => state.crypto.items)
  const dispatch = useAppDispatch()

  const [form] = useForm()
  const [coin, setCoin] = useState<CryptoItem>()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef<newAsset | null>(null) 

  if (submitted && assetRef.current && coin) {
    return (
      <Result
        status="success"
        title="New asset has been added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>Close</Button>,
        ]}
      />
    )
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not valid number',
    },
    number: {
      range: '${label} must be between ${min} and {max}',
    },
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={(v: string) => setCoin(crypto.find((c) => c.id === v) ?? crypto[0])}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(options) => (
          <Space>
            <img width={20} src={options.data.icon} alt={options.data.value} />
            {options.data.label}
          </Space>
        )}
      />
    )
  }

  function onFinish(values: formData) {
    console.log(values)
    if (coin) {
      console.log(coin)
      const newAsset =  {
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: values.date?.$d ?? new Date(),
        name: coin.name,
        rank: coin.rank,
        grow: values.price < coin.price,
        growPercent: percentDifference(values.price, coin.price),
        totalAmount: values.amount * coin.price,
        totalProfit: values.amount * coin.price - values.amount * values.price
      }
      assetRef.current = newAsset
      setSubmitted(true)
      dispatch(addAsset(newAsset))
    }
  }

  function handleAmount(value: number | null) {
    if (value) {
      const price = form.getFieldValue('price')
      form.setFieldsValue({
        // setFieldsValue меняет поле initialValues
        total: +(value * price).toFixed(2),
      })
    }
  }

  function handlePrice(value: number | null) {
    if (value) {
      const amount = form.getFieldValue('amount')
      form.setFieldsValue({
        // setFieldsValue меняет поле initialValues
        total: +(amount * value).toFixed(2),
      })
    }
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmount}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePrice} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}
