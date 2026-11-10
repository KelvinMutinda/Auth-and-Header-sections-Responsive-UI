require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())

const PORT=process.env.PORT
const MONGO_URI=process.env.MONGO_URI

if(!MONGO_URI){
    console.error('missing mongo_uri')
    process.exit(1)
}

app.use('/api',require('./routes/routes'))

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Database connected successfully')
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message)
    process.exit(1)
  })
