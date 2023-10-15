import { connect, set } from 'mongoose'

export function connectDB() {
    set('strictQuery', true)

    const mongoURL = process.env.MONGO_URL

    try {
        connect(`${mongoURL}`).then(() => {
            console.log('Banco de dados conectado!')
        })
    } catch (err) {
        console.log(err)
    }
}