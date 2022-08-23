

const Home = () => {
    function CallApiCookieJWT() {
        fetch('/TestJwtWithCookie').then(x=>x.json())
        .then(x=>{
            alert(JSON.stringify(x))
        })
    }
    function CallApiWithFetchBearer(){
        let jwt = localStorage.jwt
        alert(jwt)
        fetch('/TestJwtWithFetchBearer',{
            method: 'POST',
            mode:'no-cors',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${jwt}`,
             
            },
            //credentials: 'same-origin',
            body: JSON.stringify({a:10,b:20})
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