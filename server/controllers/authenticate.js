
const jwt = require('jsonwebtoken')
const jwtKey = "1qazxsw23edcvfr4"
const jwtExpirySeconds = 300

const Login = (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    if (username === 'reza' && password === '1234') {
        const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS512",
            expiresIn: jwtExpirySeconds
        })
        console.log('Token: ', token)
        res.cookie('token', token, {maxAge: jwtExpirySeconds * 1000}) //cookie works by milliseconds
        return res.send({'result': true , 'token': token})
    } else {
        res.status(401)
        return res.send({'result': false, 'token': null})
    }
}

module.exports = {
    Login
}