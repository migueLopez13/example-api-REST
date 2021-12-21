import { Schema, model} from 'mongoose';
import { Contact } from '../interfaces/contact.interface';

const contact = new Schema({
    dni: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
});

export default model<Contact>('Contact', contact);