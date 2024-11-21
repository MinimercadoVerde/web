import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'
import clientOrdersReducer from './reducers/clientOrders'
import ordersReducer from './reducers/orders'
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      clientOrders: clientOrdersReducer,
      orders: ordersReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']