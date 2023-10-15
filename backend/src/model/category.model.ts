import { Schema, model} from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    }
})

export const categoryModel = model('Categories', categorySchema)