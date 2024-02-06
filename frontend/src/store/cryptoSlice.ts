import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./types";
import axios from "axios";

export type CryptoItem = {
  id: string
  icon: string
  name: string
  symbol: string
  rank: number
  price: number
  priceBtc: number
  volume: number
  marketCap: number
  availableSupply: number
  totalSupply: number
  priceChange1h: number
  priceChange1d: number
  priceChange1w: number
  redditUrl: string
  websiteUrl: string
  twitterUrl: string
  contractAddress: string
  explorers: string[]
}

type CryptoState = {
  status: Status
  items: CryptoItem[]
}

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async () => {
  const { data } = await axios.get<CryptoItem[]>('https://425a4901a2adc144.mokky.dev/crypto') 
  return data
})

const initialState: CryptoState = {
  status: Status.LOADING,
  items: [],
}

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.status = Status.SUCCESS
        state.items = action.payload
      })
      .addCase(fetchCrypto.pending, (state) => {
        state.status = Status.LOADING
      })
      .addCase(fetchCrypto.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
      })
  }
})

export default cryptoSlice.reducer