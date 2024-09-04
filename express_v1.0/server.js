const app = require('./app')
const mongoose = require('mongoose')
const initRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost:27017/ENJS")
    .then(() => {
        console.log("Conenction successfully")
    })
    .catch(() => {
        console.log("Unable to connect database")
    })

initRoutes(app)

app.listen(5000, () => {
    console.log(`App listen on port ${5000}`)
})