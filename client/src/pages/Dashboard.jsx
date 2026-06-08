import {useState,useEffect,useContext,useRef} from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

function Dashboard(){
    const inputRef = useRef("");
    const [shortCode,setShortCode] = useState("");
    const {token} = useAuth();

    const [myUrls,setMyUrls] = useState([]);

    useEffect(()=>{
        async function fetchUrls(){
            const response = await axios.get("http://localhost:3000/api/url/my-urls",{headers:{Authorization:`Bearer ${token}`}});
            console.log(response.data);
            setMyUrls(response.data.shortCodes);
        } 
        fetchUrls();
    },[])

    async function shortenUrl(){
       const response = await axios.post("http://localhost:3000/api/url/shorten",{originalUrl : inputRef.current.value},{headers:{Authorization:`Bearer ${token}`}});
       setShortCode(response.data.shortCode);
    }

    return(
        <div>
            <input ref={inputRef}></input>
            <button onClick={()=>{shortenUrl()}}> Submit </button>
            {shortCode ? <div>{shortCode}</div> : <div></div>}
            <div>
                {myUrls.map((url)=>{
                    return <div key={url._id}>
                        <span>{url.originalUrl}</span> →
                        <a href={`http://localhost:3000/${url.shortCode}`}>{url.shortCode}</a>
                    </div>
                })}
            </div>
        </div>
        
    )
}

export default Dashboard;