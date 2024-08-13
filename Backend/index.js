import compression from 'compression'
import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import 'express-async-errors'
import routes from './routes/index.js'
import { CustomError } from './helpers/error-handlers.js'

const app = express()

app.use(cors({
  origin: [process.env.CLIENT_URL],
}))

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:false,limit:'50mb'}))
app.use(compression())

//app routes
app.use('/api/v1', routes)

//global routes
app.all('*', (req,res) => {
  return res.status(404).json({
    status: 404,
    message: `${req.originalUrl} not found`,
  })
})

//custom error handlers
app.use((error, _req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.serializeErrors())
}
next()
})

mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB Connecetd'))
.catch((error) => console.log(error.message))


app.listen(process.env.PORT, () => {
  console.log('Server connected to port', process.env.PORT)
})

