var express = require ('express')
var app = express()
var cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});



app.use(express.urlencoded({extends: true}))

app.get('/test',(req, res)=>{
    console.log('Test is Ok')
    return res.send({'result':' Test is Ok'})
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
const { Login , TestJwtWithCookie ,TestJwtWithFetchBearer } = require("./controllers/authenticate")
app.post('/Login', Login)
app.get('/TestJwtWithCookie', TestJwtWithCookie)
app.post('/TestJwtWithFetchBearer', TestJwtWithFetchBearer)

/////////////////////////////////////////////////////





app.listen(3500 , ()=>{
    console.log('connected to port 3500')
})

