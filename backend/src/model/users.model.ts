import { Schema, model} from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    whatsapp: {
        type: String
    },
    password: {
        type: String
    },
    cep: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    neighborhood: {
        type: String
    },
    street: {
        type: String
    },
    houseNumber: {
        type: String
    },
    addressComplement: {
        type: String
    }

})

export const userModel = model('Users', userSchema)