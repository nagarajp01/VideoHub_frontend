import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import api from './api/api'
import { login } from './store/slices/authSlice'
import { Route, Routes ,Navigate} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import VideoDetail from './components/VideoDetail'



function App() {
const[loading,setloading]=useState(true)
const dispatch=useDispatch()

useEffect(() => {
const checkUser=async()=>{
  try {
    const token=localStorage.getItem("token")
    if(token){
      const response=await api.get("/users/current-user")
      dispatch(login({userData:response.data.data}))
    }
  } catch (error) {
    console.log("Not loggged in")
  }finally{
    setloading(false)
  }
}
checkUser()
}, [])

if(loading){
  return <p>...loading please wait</p>
}
  return (
<Routes>
  <Route path='/login' element={localStorage.getItem("token")?<Navigate to="/"/> : <Login />} />
  <Route path='/signup' element={localStorage.getItem("token")?<Navigate to="/"/> : <Signup />}/>


  <Route path="/" element={<Home />} />

  <Route path="/video/:videoId" element={<VideoDetail />}/>
</Routes>
  )
}

export default App
