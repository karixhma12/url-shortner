import {useState,useContext,useRef} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Dashboard(){
    const inputRef = useRef("");
    const [shortCode,setShortCode] = useState("");
    const {token} = useContext(AuthContext);

    async function shortenUrl(){
       const response = await axios.post("http://localhost:3000/api/url/shorten",{originalUrl : inputRef.current.value},{headers:{Authorization:`Bearer ${token}`}});
       setShortCode(response.data.shortCode);
    }

    return(
        <div>
            <input ref={inputRef}></input>
            <button onClick={()=>{shortenUrl()}}> Submit </button>
            {shortCode ? <div>{shortCode}</div> : <div></div>}
        </div>
    )
}

export default Dashboard;