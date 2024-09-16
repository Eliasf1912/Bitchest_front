import React, { useState } from 'react'
import Styles from './DashBoard.module.scss'
import { AiOutlineMenu,AiOutlineAppstore,AiOutlineWallet,AiOutlineSetting,AiOutlineLogout,AiOutlineClose   } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import SideBar from '../../Components/SideBar/SideBar';


export default function DashBoard() {

  // state pour le menu burger
  const [OpenMenu,setOpenMenu] = useState(false)
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
    <>
      <div className={Styles.DashBoard}>
        <button className={Styles.BurgerMenuOpen} onClick={()=>{setOpenMenu(true)}} ><AiOutlineMenu /></button>
        {/* Menu burger */}
        <section className={OpenMenu ? Styles.MenuOpen : Styles.MenuClose}>
          <button className={Styles.BurgerMenuClose} onClick={()=>{setOpenMenu(false)}} ><AiOutlineClose /></button>
          <div>
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
        <h1>Welcome to BitChest <span>Elias</span></h1>
      </div>
      <SideBar />
    </>
    
  )
}
