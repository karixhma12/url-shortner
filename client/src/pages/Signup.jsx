import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function signup(){
        await axios.post("http://localhost:3000/api/auth/signup",{email:email,password:password});
        navigate("/login");
    }

    return(
        <div>
            <input type="text" placeholder="enter your email-id" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
            <input type="password" placeholder="enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> 
            <button onClick={()=>signup()}> Submit </button>
        </div>
    )
}

export default Signup;