import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId | string;
    phone: string;
    name: string; 
    address: {
        building: string;
        apartment: string;
        unit: string;
    } 
}