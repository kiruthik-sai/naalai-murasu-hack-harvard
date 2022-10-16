import React, {useState } from 'react';
import {app} from './firebase'
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [email,setEmail]  = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth(app)
    const navigate = useNavigate()

    return ( 
        <>
                <input value={email} placeholder={"email"} onChange={(e)=>{
                    setEmail(e.target.value)
                }}/><br/>

                <input type="password" value={password} placeholder={"password"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/><br/>

                <button onClick={()=>{
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log("signed in successfully", user)
                        navigate('/')
                        sessionStorage.setItem("user",user)
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                      });
                }}>logIn</button><br/>
                <button onClick={()=>{
                    navigate('/register')
                }}>SignUp</button>
        </>
     );
}

export default Login;