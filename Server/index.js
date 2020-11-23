const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Connection done!')
})

app.use('/api/user', require('./routes/api/users'))
app.use('/api/book', require('./routes/api/books'))
app.use('/api/ticket', require('./routes/api/tickets'))
// app.use('/api/car', require('./routes/api/cars'))

app.use('/admin-api/addCarPark', require('./routes/adminApi/addAllCarParkInFirebase'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})