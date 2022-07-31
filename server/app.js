var app = require ('express')()
const cookieParser = require("cookie-parser")
app.use(cookieParser)

app.get('/test',(req, res)=>{
    res.send({'result':' Test is Ok'})
})

app.get('/writecookie',(req, res)=>{
    res.cookie('data','this is reza mohammadpour cookie.')
    res.send({'result':'Wrote in Cookie'})
})
app.get('/readcookie',(req, res)=>{
     let data = req.cookies.data
    res.send({'result':  data})
})

app.listen(3500 , ()=>{
    console.log('connected to port 3500')
})

