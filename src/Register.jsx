import React,{useState} from "react";
import Header from "./Header";
import './Login.css'


function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    
        const onSubmitValue = ( name, value )  => {
             
              if(name === 'email') { 
                setEmail(value)
              }
              if(name === 'password'){
                 setPassword(value)
            }
          

        } 
        
        const  handleSubmit  = () => {
              console.log("Handle submit is clicked : " + password  + " " + email )
    }
    
    return (
        <>
            <Header></Header>
            
            <div>
            <form >
            <h2>Register</h2>
            <label> Email :</label>
            <input type="text" name="email"  value={email} onChange={(event) => {
                    onSubmitValue(event.target.name, event.target.value)
                    }} />
                    <br/><br/>

                    <label> Password :</label>
                    
            <input type="password" name="password" value={password} onChange={(event) => {
                    onSubmitValue(event.target.name, event.target.value)
            }}  />
                <br/><br/>

            <button  onClick={(event) =>{
                      event.preventDefault() 
                      handleSubmit()
            }} >Register</button>
    </form>
                
            </div>
        </>
    )
}

export default Register;