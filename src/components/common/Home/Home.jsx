import './Home.css'
import {getDepartments} from "../../../utils/controllers/AuthControllers";

const Home =()=>{

    return <>
        <h1>
            Home common
        </h1>
        <button onClick={async ()=>{
            const res = await getDepartments();
            if (res.data.Error === true){
                console.log(res.data.Error)
            }
            else{
                console.log(res.data);
            }
        }}>Click</button>
    </>
}

export default Home