import React, { useState } from 'react'
import '../../shared/nav.scss'
import { useNavigate } from 'react-router-dom'
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaMessage, FaRegMessage } from "react-icons/fa6";
import { IoAdd, IoNotifications, IoNotificationsOutline } from "react-icons/io5";

const Nav = () => {

  const [ navHover, setNavHover ] = useState(false)
  const [ hover, setHover ] = useState(false)
  
    const navigate = useNavigate()

  return (
    <nav className='navbar'>
      <div className="logo">
          <img src="../../public/logo.png" alt="" />
        </div>
      <div className="container"> 
        <div 
            className="options"
            onMouseEnter={() => setNavHover(true)}
            onMouseLeave={() => setNavHover(false)}>
          <div 
            className="home" 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? <GoHomeFill /> : <GoHome />}
          </div>
          <div 
            className="notification"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ? <IoNotifications /> : <IoNotificationsOutline />}
          </div>
          <div 
            className="msg"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ?  <FaMessage /> : <FaRegMessage />}
          </div>
          <div 
            className="create-post"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <IoAdd />
          </div>
        </div>
        <div className="profile">
          
        </div>
      </div>
        {/* <p>Insta</p>
        <button 
        onClick={() => navigate('/create-post')}
        className='button primary-btn'>New post</button>  */}
    </nav>
  )
}

export default Nav
