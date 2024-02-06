import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./types";
import axios from "axios";

export type Asset = {
  id: string
  amount: number
  price: number
  date: Date

  name: string
  rank: number
  grow: boolean
  growPercent: number
  totalAmount: number
  totalProfit: number
}

type AssetsState = {
  status: Status
  items: Asset[]
}

export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
  const { data } = await axios.get<Asset[]>('https://425a4901a2adc144.mokky.dev/assets')
  return data
})

export const addAsset = createAsyncThunk('assets/AddAsset', async (newAsset: Asset) => {
  const { data } = await axios.post<Asset>('https://425a4901a2adc144.mokky.dev/assets', newAsset)
  return data
})

const initialState: AssetsState = {
  status: Status.LOADING,
  items: []
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setAssets: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = Status.LOADING
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchAssets.rejected, state => {
        state.status = Status.ERROR
        state.items = []
      })
    builder
      .addCase(addAsset.pending, (state) => {
        state.status = Status.LOADING
      })
      .addCase(addAsset.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]
        state.status = Status.SUCCESS
      })
      .addCase(addAsset.rejected, (state) => {
        state.items = [],
        state.status = Status.ERROR
      })
  }
})

export const { setAssets } = assetsSlice.actions

export default assetsSlice.reducer