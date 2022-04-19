import './config/env'
import express from 'express'
import cors from 'cors'
import routesV1 from './src/api/v1.routes'
import { connect } from './config/database'

connect.then(() => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use('/api/v1', routesV1)
  app.use(handleErrors)
  app.listen(process.env.PORT, () => {
    console.log(`Chess listening on port ${process.env.PORT}`)
  })
})

function handleErrors(err, req, res, next) {
  console.error(err)

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error!'
  })
  next(err)
}