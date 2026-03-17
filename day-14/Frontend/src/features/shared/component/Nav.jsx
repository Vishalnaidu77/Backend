import React, { useState } from 'react'
import '../../shared/nav.scss'
import { useNavigate } from 'react-router-dom'
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoAdd, IoMoonSharp, IoNotifications, IoNotificationsOutline, IoSettings, IoSettingsOutline, IoSunnyOutline } from "react-icons/io5";
import { useAuth } from '../../auth/hooks/useAuth';
import { TbMessageCircle, TbMessageCircleFilled } from "react-icons/tb";
import { MdAddBox } from "react-icons/md";

const Nav = () => {

  const [ navHover, setNavHover ] = useState(false)
  const [ homeHover, setHomeHover ] = useState(false)
  const [ notificationHover, setNotificationHover ] = useState(false)
  const [ msgHover, setMsgHover ] = useState(false)
  const [ addPostHover, setAddPostHover ] = useState(false)
  const [ profileHover, setProfileHover ] = useState(false)
  const [ settingHover, setSettingHover ] = useState(false)

  const [isSettingOpen, setIsSettingOpen] = useState(false)

  const [theme, setTheme] = useState('dark')


  const { currUser } = useAuth()
    const navigate = useNavigate()

  return (
    <nav className='navbar'>
      <div className="logo">
          <img className="logo-img" src="/logo.png" alt="" />
        </div>
      <div className="container"> 
        <div 
            className="options"
            onMouseEnter={() => setNavHover(true)}
            onMouseLeave={() => setNavHover(false)}>
          <div 
            className={`home option ${homeHover ? 'hover' : ''}`}
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
            onClick={() => navigate('/')}
          >
            {homeHover ? <GoHomeFill /> : <GoHome />}
            <h4>Home</h4>
          </div>
          <div 
            className={`notification option ${notificationHover ? 'hover' : ''}`}
            onMouseEnter={() => setNotificationHover(true)}
            onMouseLeave={() => setNotificationHover(false)}
          >
            {notificationHover ? <IoNotifications /> : <IoNotificationsOutline />}
            <h4>Notification</h4>

          </div>
          <div 
            className={`msg option ${msgHover ? 'hover' : ''}`}
            onMouseEnter={() => setMsgHover(true)}
            onMouseLeave={() => setMsgHover(false)}
          >
            {msgHover ?  <TbMessageCircleFilled /> : <TbMessageCircle />}
            <h4>Message</h4>
          </div>
          <div 
            className={`create-post option ${addPostHover ? 'hover' : ''}`}
            onMouseEnter={() => setAddPostHover(true)}
            onMouseLeave={() => setAddPostHover(false)}
            onClick={() => navigate('/create-post')}
          >
            {addPostHover ? <MdAddBox /> : <IoAdd />}
            <h4>Add Post</h4>

          </div>
          <div 
            className={`profile option ${profileHover ? 'hover' : ''}`}
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
          >
            <img src={currUser?.profileImage} alt="" />
            <h4>{currUser?.username}</h4>
          </div>
        </div> 
      </div>
      <div className={`setting ${settingHover ? 'hover' : ''}`}
        onClick={() => {
          isSettingOpen ? setIsSettingOpen(false) : setIsSettingOpen(true)
        }}
        onMouseEnter={() => setSettingHover(true)}
        onMouseLeave={() => setSettingHover(false)}
      >
        {settingHover ? <IoSettings /> : <IoSettingsOutline />}
      </div>
      {isSettingOpen && (
        <div className={"setting-box"}>
          <div className="theme setting-option" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <IoSunnyOutline /> : <IoMoonSharp />}
            <h4>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</h4>
          </div>
          <div className="logout-btn setting-option">
            <h4>Logout</h4>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
