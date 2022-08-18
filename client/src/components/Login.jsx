import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    let username = useRef()
    let password = useRef()
    let nav = useNavigate()
    
    const OnLoginBtnClicked = () => {

        fetch('/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:username.value, password: password.value })
        }).then(x => x.json()).then(x => {
            alert(JSON.stringify(x))
            if (x.result) {
                alert('You loggedin successfully...!')
                localStorage.jwt = x.token
                nav('/home')
            }
            else alert('Error on Login.')
        })
    }

    return (
        <div className="container col-md-4"
            style={{
                border: '2px solid blue', marginTop: '30px',
                padding: '30px', borderRadius: '10px'
            }}>
            <div className="form-group">
                <label>Username</label>
                <input defaultValue={''} className="form-control"
                       ref={x=> username = x}></input>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type='password' defaultValue={''} className="form-control" 
                ref={x=> password = x}></input>
            </div>
            <button onClick={OnLoginBtnClicked} className="btn btn-primary">Login</button>
        </div>
    )
}

export default Login;