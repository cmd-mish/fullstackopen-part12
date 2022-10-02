const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  return res.json({ 'NODE_ENV': process.env.NODE_ENV })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})