require('dotenv').config()

const app = require("./config/server")
const port = process.env.PORT || 8000;

app.listen( port, () => {
    console.log(`Server listening on ${port}`)
})