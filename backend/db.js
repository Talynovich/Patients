import mongoose from 'mongoose'

const url = process.env.MONGO_URL

export const connectDB = async () => {
  try {
    await mongoose.connect(url, { dbName: 'patients' })
    console.log('бд подключена')
  } catch (err) {
    console.error('Ошибка подключения к бд', err)
    process.exit(1)
  }
}
