import React from 'react'
import Styles from './SideBar.module.scss'
import Logo from '../../assets/bitchest_logo.png'
import { AiOutlineAppstore,AiOutlineWallet,AiOutlineSetting,AiOutlineLogout } from "react-icons/ai";
import { NavLink,useNavigate } from "react-router-dom";
import { RemoveCookie } from '../../Services/Auth';

export default function SideBar() {

  const Navigate = useNavigate();

  const Logout = (e) => {
    e.preventDefault()
    let cookies = (document.cookie).split(';')
    console.log(cookies)
    cookies.forEach(cookie => {
      if(cookie.includes('AuthToken')){
        RemoveCookie('AuthToken');
      }
    });
    Navigate('/')
  }

  return (
    <section className={Styles.SideBar}>
      <img src={Logo} className={Styles.Logo} alt="Logo bitchest" />
      <div className={Styles.Links}>
        <NavLink to='/DashBoardUser'> 
          <AiOutlineAppstore />
          <p>Dashboard</p>
        </NavLink >
        <NavLink to='/DashBoardUser'> 
          <AiOutlineWallet />
          <p>My wallet</p>
        </NavLink >
        <NavLink to='/DashBoardUser'> 
          <AiOutlineSetting  />
          <p>Settings</p> 
        </NavLink >
        <NavLink onClick={Logout}> 
          <AiOutlineLogout />
          <p>logout</p>
        </NavLink >
      </div>
    </section>
  )
}
