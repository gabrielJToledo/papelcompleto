import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    category: {
        type: String
    },
    description: {
        type: String,
    },
    coverImage: {
        type: Buffer
    },
    images: [{
        type: Buffer
    }],
    price: {
        type: Number
    },
    discountPrice: {
        type: Number
    }
})

export const productModel = model('Products', productSchema)