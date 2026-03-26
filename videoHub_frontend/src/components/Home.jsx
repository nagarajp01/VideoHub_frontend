import {  useEffect, useState } from "react";
import api from "../api/api";



import React from 'react'
import { Link } from "react-router-dom";

function Home() {
    const [videos,setVideos]=useState([])
    const[error,setError]=useState("")
    const[loading,setLoading]=useState(true)

   useEffect(() => {
     const fetchVideos=async()=>{
       try {
         const response=await api.get("/videos/allvideos")
         if(response){
             setVideos(response.data.data)
             setLoading(false)
         }
       } catch (error) {
        setError(error.message)
       }finally{
        setLoading(false)
       }

     }
   fetchVideos()
   }, [])
   



  return (
   <div className="homeContainer">
    <div className="div">ALL VIDEOS</div>
    {error && <p className="errorPara">{error}</p>}
    {loading ? (<p>..loading</p>):

         videos.length===0 ?(<p>No videos found</p>):(
        videos.map((item)=>(
            <Link to={`/video/${item._id}`} key={item._id} className="allVideosLinktag">
                <div className="videoContainer" >
               <img src={item.thumbnail} alt={item.title} />
               <h2 className="videoTitle">{item.title}</h2>
               <p className="videoDuration">{item.duration}</p>
               <p className="videoOwner">{item.owner?.userName}</p>
            </div>
            </Link>
        )

    )




    )}
   




   </div>
  )
}

export default Home