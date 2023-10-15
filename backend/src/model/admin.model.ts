import { Schema, model} from 'mongoose'

const adminSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean
    }

})

export const adminModel = model('Admin', adminSchema)