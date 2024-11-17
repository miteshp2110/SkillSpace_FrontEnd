import './Home.css'
import {getRequest} from "../../../utils/RequestMaker";

const Home =()=>{

    return <>
        <h1>
            Home common
        </h1>
        <button onClick={async ()=>{
            await getRequest("departments")
        }}>Click</button>
    </>
}

export default Home