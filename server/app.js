var express = require ('express')
var app = express()
var cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

app.get('/test',(req, res)=>{
    res.send({'result':' Test is Ok'})
})

// app.get('/writecookie',(req, res)=>{
//     res.cookie('data','this is reza mohammadpour cookie.')
//     res.send({'result':'Wrote in Cookie'})
// })
// app.get('/readcookie',(req, res)=>{
//      let data = req.cookies.data
//     res.send({'result':  data})
// })

////////////////////// Authenticate ////////////////////////////////
const {Login} = require("./controllers/authenticate")
app.post('/Login', Login)
/////////////////////////////////////////////////////

app.listen(3500 , ()=>{
    console.log('connected to port 3500')
})

