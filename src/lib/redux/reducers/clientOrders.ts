import { getOrdersBySessionId } from "@/lib/mongo/orders";
import { Order } from "@/model/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getInitialOrders = createAsyncThunk('orders/getInitialOrders', async () => {
    return JSON.parse(await getOrdersBySessionId()) as Order[]
})

export interface OrdersState {
    orders: Order[],
}

const initialState: OrdersState = {
    orders: [] as Order[],
}

const ordersSlice = createSlice({
    name: 'clientOrders',
    initialState: initialState,
    reducers: {
        addOrder(state, action) {
            state.orders.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInitialOrders.fulfilled, (state, action) => {
            state.orders = action.payload
        })
        builder.addCase(getInitialOrders.rejected, (state, action) => {
            console.error('Error fetching orders:', action.error.message)
        })
    }
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer