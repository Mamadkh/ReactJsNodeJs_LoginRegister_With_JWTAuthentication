
const jwt = require('jsonwebtoken')
const jwtKey = "1qazxsw23edcvfr4"
const jwtExpirySeconds = 60; //one minute

const Login = (req, res) => {

    const { username, password } = req.body
    // let username = req.body.username
    // let password = req.body.password
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

const VarifyIsSigninedWithJWT = (req) => {    
    
    const token = req.cookies.mohammadpourtoken
    console.log('Token: ', token)
    if (token === undefined) {
        console.log('Error, Please Login')
        return { result: false, payload: null }
    }
    try {
        var data = jwt.verify(token, jwtKey)
        return { result: true, payload: data };
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            console.log('Error, Please login')
            return { result: false, payload: null }
        }
    }
    return { result: false, payload: null }
}

//Status Codes:
//200: Ok
//401: UnAuthenticated (not loggedin)
//402: Forbidden or UnAuthorized (No right access  )
//404: Not Found
//400: Bad Request
//402: Payment Request

const TestJwtWithCookie = (req, res) => {
    console.log('TestJwtWithCookie')
    const signin = VarifyIsSigninedWithJWT(req)
    console.log('*********************')
    console.log(signin)
    console.log('*********************')

    if (signin.result == false) {
        console.log('Error, signin')
        res.status(401) //unauthenticated
        return res.send({ result: 'Error, Login First.' }) //res.status(401).end()
    }
    console.log(signin)
    res.status(200) //ok
    return res.send({ result: 'Successfully....!' })
}

const TestJwtWithFetchBearer = (req, res) => {
    console.log('TestJwtWithFetchBearer')
    //let { a, b } = req.body
    //console.log(a, b)
    console.log(req.headers)
    console.log(req.headers.Authorization)
}

module.exports = {
    Login,
    TestJwtWithCookie,
    TestJwtWithFetchBearer
}