import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    async function loginfunc(){
        try{
            const response = await axios.post("http://localhost:3000/api/auth/signin",{email:email,password:password});
            setToken(response.data.token);
            navigate("/dashboard");
        }
        catch(err){
            console.log("Invalid credentials!");
        }
        
    }

    return(
        <div>
            <input type="text" placeholder="enter your email-id" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type="password" placeholder="enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={(()=>{loginfunc()})}> Submit </button>
        </div>
    )
}


export default Login;