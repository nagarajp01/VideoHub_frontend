import React from 'react'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../api/api';






function VideoDetail() {
    const {videoId}=useParams()
    const [loading,setLoading]=useState(true)
    const [video,setVideo]=useState(null)
    const[error,setError]=useState("")

useEffect(() => {
  const fetchVideo=async()=>{
    try {
        const response=await api.get(`/videos/${videoId}`)
        if(response){
            setVideo(response.data.data)
        }
      }
      catch (error) {
        setError(error.message)
    }
    finally{
        setLoading(false)
    }
    } 
    fetchVideo()
}, [videoId])


if(loading){
return <p>..please wait video is loading</p>
}

  return (
    <div className="singleVideoContainer">
        {error && <p className="errorPara">{error}</p>}
       {video && (
         <div className="fetchedVideo">
                <video controls poster={video.thumbnail} className="video">
                    <source src={video.videoFile} type="video/mp4" />
                    your browser does not support video tag
                </video>
                <p className="title">{video.title}</p>
                <p className="duration">{video.duration}</p>
                <p className="owner">{video.owner?.fullName}</p>
                <p className="description">{video.description}</p>
            </div> 
       )}
    </div>
  )
}

export default VideoDetail
