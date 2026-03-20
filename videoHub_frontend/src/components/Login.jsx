import React from 'react'
import {useForm} from "react-hook-form"
import { useState,useEffect } from "react"
import { login as authLogin } from "../store/slices/authSlice"
import {Link,useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import api from '../api/api'
import Input from './Input'

function Login() {
    const [error,setError]=useState("")
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const login= async(data)=>{
        setError("")
        try {
            const session=await api.post("/users/login",data)
            if(session){
                const userData=await api.get("/users/current-user")
                if(userData){
                    dispatch(authLogin({userData:userData.data.data}))
                    navigate("/")
                }
            }
            
        } catch (error) {
            setError(error.message)
        }
    }



  return (
    <div className='loginContainer'>
        <div className="logoWrap">
            <span><Logo /></span>
        </div>
        <h2>Sign into your account</h2>
        <p>Dont have an account <Link to="/signup" >SignUp</Link></p>

        {error && <p className='errorPara'>{error}</p>}
        <form className='loginForm' onSubmit={handleSubmit(login)}>
            <div className="innerForm">
                <Input label="email" className="emailInput" placeholder="enter your email" type="email" 
                {...register("email",{
                    required:true,
                    validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}/>
                <Input label="password" className="passwordInput" placeholder="enter your password" 
                {...register("password",{
                    required:true
                })}
                />
                <Button className="signInBtn" type="submit">Sign In</Button>

            </div>

        </form>






    </div>
  )
}

export default Login