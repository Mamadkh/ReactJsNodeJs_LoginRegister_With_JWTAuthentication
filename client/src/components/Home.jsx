

const Home = () => {
    function CallApiCookieJWT() {
        fetch('/TestJwt').then(x=>x.json())
        .then(x=>{
            alert(JSON.stringify(x))
        })
    }
    return (
        <div className="container">
            <h2>Home Page</h2>
            <button onClick={CallApiCookieJWT} className="btn btn-success">
                Call Api with Cookie JWT
            </button>
            <button className="btn btn-success">
                Call Api with Fetch Bearer JWT
            </button>
        </div>
    )
}

export default Home