import mongoose from 'mongoose'

export const connect = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(db => {
    console.log('DB connected!')
    return db
  })
  .catch(err => console.error(err))
