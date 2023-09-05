import React from 'react'
import VideoCallContainer from '../../components/videoCall/VideoCallContainer'
import Sidebar from '../../components/patient/sideBar/SideBar'

function VideoCall() {
  return (

    <>
      <div className='container mx-auto bg-slate-900 py-5 flex flex-col relative' >

        <VideoCallContainer />
      </div>
    </>
  
  )
}

export default VideoCall
