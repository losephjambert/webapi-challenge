const app = require('./app.js')

const PORT = process.env.port || 5001

app.listen(PORT, () => {
  console.log(`App is now listening at port ${PORT}`)
})