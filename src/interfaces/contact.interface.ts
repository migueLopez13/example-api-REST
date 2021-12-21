import { Document } from "mongoose";

export interface Contact extends Document{
    dni: string,
    name: string,
    surname: string,
    phone: string,
    gender: string,
    address: string,
}