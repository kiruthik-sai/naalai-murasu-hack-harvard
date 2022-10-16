import React, {useState } from 'react';
import {app} from './firebase'
import {regist, getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const auth = getAuth(app)
    return ( 
    <>
        <input type="text" value={email} placeholder="email" onChange={e=>{setEmail(e.target.value)}} /><br/>
        <input type="text" value={password} placeholder="password" onChange={e=>{setPassword(e.target.value)}} /><br/>
        <input type="text" value={confirmPassword} placeholder="Confirm password" onChange={e=>{setConfirmPassword(e.target.value)}} /><br/>
        <button onClick={()=>{
            if(password==confirmPassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential=>{
                    const user = userCredential.user;
                    console.log("signed in successfully", user)
                    navigate('/login')

                })
                .catch(error=>{
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                })
            }
            else{
                console.log("password dont match")
            }
        }}>Register</button>
    </> 
)}

export default Register;