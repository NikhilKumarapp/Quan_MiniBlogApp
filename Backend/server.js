const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config({
    path:  './Config/config.env'
})

connectDatabase()

const app = express() ;
const _dirname = path.resolve();

app.use(express.json())
app.use(cors())

app.use("/",IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

app.use(express.static(path.join(_dirname , "/Frontend/build") ))

app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "build", "index.html"))
})

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})