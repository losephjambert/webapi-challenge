const express = require('express')
const helmet = require('helmet')

const app = express()
app.use(helmet())

app.get('/', (req, res) => {
  res.send(`
    <h1>Web Node API Challenge I</h1>
    <h2>Joseph Lambert -- WEB23</h2>
  `)
})

module.exports = app