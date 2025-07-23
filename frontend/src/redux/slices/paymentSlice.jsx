
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async actions:
export const createOrder = createAsyncThunk(
  'payment/createOrder',
  async (amount, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/app1/payment/create_order/', { amount })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/app1/payment/verify_payment/', paymentData)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    order: null,
    key: '',
    status: 'idle', // idle / loading / succeeded / failed
    verifyStatus: 'idle',
    error: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.order = null
      state.key = ''
      state.status = 'idle'
      state.verifyStatus = 'idle'
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.order = payload.order
        state.key = payload.key
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
      .addCase(verifyPayment.pending, state => {
        state.verifyStatus = 'loading'
        state.error = null
      })
      .addCase(verifyPayment.fulfilled, (state, { payload }) => {
        state.verifyStatus = 'succeeded'
        // optional: payload.status is 'success'
      })
      .addCase(verifyPayment.rejected, (state, { payload }) => {
        state.verifyStatus = 'failed'
        state.error = payload
      })
  }
})

export const { resetPayment } = paymentSlice.actions
export default paymentSlice.reducer
