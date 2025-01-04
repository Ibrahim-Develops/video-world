import React from 'react'
import AddVideo from '../Components/AddVideo'
import AllVideos from '../Components/AllVideos'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <AddVideo/>
    <AllVideos/>
    </>
  )
}

export default Home