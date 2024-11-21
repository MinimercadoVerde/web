import { ObjectId } from "mongodb";
import { StockStatus } from "./product";

export interface OrderProduct {
    barcode: string;
    image: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    name: string;
    measure: string;
    category: string;
    stockStatus?: StockStatus;   
}

export type OrderStatus = 'pending' | 'packed' | 'delivered';

export interface Order {
    _id?: ObjectId | string;
    sessionId?: string;
    products: OrderProduct[];
    customerName: string;
    customerPhone: string;
    deliveryAddress: {
        building: number;
        apartment: number;
        unit: string;
    };
    createdAt: Date | string;
    totalPrice: number;
    status: OrderStatus;
}
