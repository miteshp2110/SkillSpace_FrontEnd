import './Home.css'
import {getDepartments, getRefreshToken, jwtStatus, login} from "../../../utils/controllers/AuthControllers";

const Home =()=>{

    return <>
        <h1>
            Home common
        </h1>
        <button onClick={async () => {
            const res = await getDepartments();
            if (res.data.Error === true) {
                console.log(res.data.Error)
            } else {
                console.log(res.data);
            }
        }}>departments
        </button>
        <br/>
        <button onClick={async () => {
            const res = await jwtStatus();
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>jwt status
        </button>
        <br/>
        <button onClick={async () => {
            const res = await getRefreshToken();
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>refresh Token
        </button>
        <br/>
        <button onClick={async () => {
            const res = await login("mitehpaliwal2110@gmail.com","12345678")
            if (res.data.Error === true) {
                console.log(res.data)
            } else {
                console.log(res.data);
            }
        }}>login
        </button>

    </>
}

export default Home