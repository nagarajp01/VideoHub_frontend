import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { Link,useNavigate} from "react-router-dom"
import api from '../api/api'
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice'


function Signup() {
    const[error,setError]=useState("")
    const {register,handleSubmit}=useForm()
    const navigate=useNavigate()
     const dispatch=useDispatch()
    const signupHandler=async (data)=>{
        const formData=new FormData()
        try {
            formData.append("fullName",data.fullName)
            formData.append("userName",data.userName)
            formData.append("password",data.password)
            formData.append("email",data.email)
            formData.append("avatar",data.avatar[0])
            formData.append("coverImage",data.cover[0])
            const response=await api.post("/users/register",formData)
                await api.post("/users/login",{
                email:data.email,
                password:data.password
            })
            const userData=await api.get("/users/current-user")
            dispatch(login({userData:userData.data.data}))
            navigate("/")
            
        } catch (error) {
            setError(error.message)
        }
    }

//fullname username email pass
  return (
    <div className='signupContainer'>
        <div className="logoWrap">
                    {/* <span><Logo /></span> */}
                </div>
                <h2>Sign into your account</h2>
                <p>already have an account <Link to="/login" >Login</Link></p>
                {error && <p className='errorPara'>{error}</p>}

        <form className='signUpForm' onSubmit={handleSubmit(signupHandler)}>
            <Input className="fullNameInput" label="full Name" placeholder="Enter your full name" {
                ...register("fullName",{
                    required:true
                })
            } />
            <Input className="userNameInput" label="user Name" placeholder="Enter your User Name" {
                ...register("userName",{
                    required:true
                })
            } />
            <Input className="emailInput" placeholder="enter your email" label="email" 
            
         {...register("email",{
            required:true
         })}
            />

            <Input className="passwordInput" placeholder="enter your password" label="password"
            {...register("password",{
                required:true
            })} />

            <Input className="avatarInput" type="file" label="avatar" {
                ...register("avatar",{
                    required:true
                })
            }/>
            <Input className="coverInput" type="file" label="cover image" {
                ...register("coverImage",{
                    required:true
                })
            } />
            <Button className="signInBtn" type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default Signup