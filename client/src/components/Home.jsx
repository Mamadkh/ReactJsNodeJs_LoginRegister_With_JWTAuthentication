import { useNavigate } from 'react-router-dom'

const Home = () => {
    let navigate = useNavigate();

    function CallApiCookieJWT() {
        fetch('/TestJwtWithCookie')
            .then(x => { //get status of webapi
                if (!x.ok) {
                    //alert(x.status)
                    if (x.status === 401 || x.status === 402) {
                        alert('UnAthenticated, Login first')
                        navigate('/Login')
                    }
                }
                else return x.json()
            })
            .then(x => { //get result data
                if (x)
                    alert(JSON.stringify(x))
            })
    }
    function CallApiWithFetchBearer() {
        let jwt = localStorage.jwt
        alert(jwt)
        let httpHeaders = {
            'Content-Type': 'application/json', //x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`
        };
        fetch('/TestJwtWithFetchBearer', {
            method: 'post',
            //mode: 'no-cors',
            headers: new Headers(httpHeaders),
            //credentials: 'same-origin',
            body: JSON.stringify({ a: 10, b: 20 })
        }).then(x => {
            if (!x.ok) {
                if (x.status === 401) {
                    alert("You are not allowed to call this Api. Login first")
                    navigate('/login')
                }
            }
            return x.json()
        }).then(x => {
            alert(JSON.stringify(x))
        })
    }
    return (
        <div className="container">
            <h2>Home Page</h2>
            <button onClick={CallApiCookieJWT} className="btn btn-success">
                Call Api with Cookie JWT
            </button>
            <button className="btn btn-warning" onClick={CallApiWithFetchBearer}>
                Call Api with Fetch Bearer JWT
            </button>
        </div>
    )
}

export default Home