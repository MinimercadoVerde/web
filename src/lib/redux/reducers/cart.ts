import { Category, StockStatus } from "@/model/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
    barcode: string;
    brand: string;
    name: string;
    price: number;
    image: string;
    measure: string;
    category: Category;
    quantity: number;
    stockStatus?: StockStatus;
}

export interface CartState {
    value: CartProduct[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CartState = {
    value: [] as CartProduct[],
    status: 'idle'
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    selectors: {
        selectSubtotal: (state: CartState) => {
            return state.value.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0);
        },
        selectItemsCount: (state: CartState) => state.value.reduce((total, product) => {
            return total + product.quantity;
        }, 0)
    },
    reducers: {
        addProduct(state, action: PayloadAction<CartProduct>) {
            const product = action.payload

            const found = state.value.findIndex(p => p.barcode === product.barcode)
            if (found !== -1) {
                state.value[found].quantity += product.quantity
            } else {
                state.value.push(product)
            }
        },
        addItem(state, action: PayloadAction<string>) {
            const found = state.value.findIndex(p => p.barcode === action.payload)
            state.value[found].quantity += 1
        },
        removeItem(state, action: PayloadAction<string>) {
            const found = state.value.findIndex(p => p.barcode === action.payload)
            if (state.value[found].quantity > 1) {
                state.value[found].quantity -= 1

            } else {
                state.value.splice(found, 1)
            }
        },
        resetCart(state) {
            state.value = []
        }
    }
})

export const { selectSubtotal, selectItemsCount } = cartSlice.selectors;
export const { addProduct, removeItem, addItem, resetCart} = cartSlice.actions
export default cartSlice.reducer