
const jwt = require('jsonwebtoken')
const jwtKey = "1qazxsw23edcvfr4"
const jwtExpirySeconds = 60; //one minnute

const Login = (req, res) => {

    const { username, password } = req.body
    console.log(username, password)


    if (username === 'reza' && password === '1234') {
        const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS512",
            expiresIn: jwtExpirySeconds
        })
        console.log('Token: ', token)
        res.cookie('mohammadpourtoken', token, { maxAge: jwtExpirySeconds * 1000 }) //cookie works by milliseconds
        return res.send({ 'result': true, 'token': token })
    } else {
        res.status(401)
        return res.send({ 'result': false, 'token': null })
    }
}

const VarifyIsSigninedWithJWT = (req)=>{

    const token = req.cookies.mohammadpourtoken
    console.log('Token: ', token)
    if (token === undefined) {
        console.log('Error, Please Login')
        return {result: false , payload: null} 
    }
    try {
        var data = jwt.verify(token, jwtKey)
        return {result: true , payload: data}; 
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            console.log('Error, Please login')
            return {result: false , payload: null}
        }
    }
    return {result: false , payload: null}
}

const TestJwt = (req, res) => {
    const signin = VarifyIsSigninedWithJWT(req)
    if(!signin.result) {
        console.log('Error, signin')
        return  res.send({result:'Error, Login First.'}) //res.status(401).end()
    }
    console.log(signin)
    return res.send({result:'Successfully....!'})
}


module.exports = {
    Login,
    TestJwt
}