import React, { useState } from "react";
const App =() =>{
    const [name, steName] = useState("");
    const [fullName, setFullName] = useState ();

    const onSubmit =(e) = >{
        event.preventDefault();
        setFullName(nsme);
    }
};

return (
    <>
        <div>
            <h1> Hollo {fullName}</h1>
            <input type="text" placeholder="Enter Your Name" onChange={inputEvent} value={Name}>
            <br/>
            <button type="Submit" onClick={onSubmite}> Submit Me</button>

            </input>
        </div>
    </>

)
