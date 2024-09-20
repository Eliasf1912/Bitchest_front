import React, { useState,useEffect } from 'react'
import Styles from './DashBoard.module.scss'
import { AiOutlineMenu,AiOutlineAppstore,AiOutlineWallet,AiOutlineSetting,AiOutlineLogout,AiOutlineClose   } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import SideBar from '../../Components/SideBar/SideBar';
import BalanceDisplay from '../../Components/BalanceDisplay/BalanceDisplay';
import LastTransaction from '../../Components/LastTransaction/LastTransaction';
import CryptoTable from '../../Components/CryptoTable/CryptoTable';
import { GetCookie,GetUserDashBoardInformations } from '../../Services/Auth';


export default function DashBoardUser({}) {

  // state pour le menu burger
  const [OpenMenu,setOpenMenu] = useState(false)
  const [UserInformation,setUserInformation] = useState(null)
  const [BalanceHolder,setBalanceHolder] = useState(0)
  const [UserName,setUserName] = useState('User')
  const [TransactionsHolder,setTransactionsHolder] = useState([])
  const [CryptosHolder,setCryptosHolder] = useState([])
  const Navigate = useNavigate();

  // Récupération des données de l'api
  useEffect(() => {  
    async function fetchData(){
      try {
        // Récupèrer le cookie d'identification
        const CookieAuth = GetCookie('AuthToken')
        // je requête l'api
        const Data = await GetUserDashBoardInformations(CookieAuth)
        // On set les informations que l'on a besoins
        setUserInformation(Data)
        setUserName(Data.userConnected)
        setBalanceHolder(Data.Balance)
        setCryptosHolder(Data.Cryptos)
        setTransactionsHolder(Data.Transactions)
        // console.log(Data)
      }catch (Error) {
        console.log(Error)
      }
    }
    fetchData()
  }, []);

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
        <h1>Welcome to BitChest <span>{UserName}</span></h1>
        <section>
          <BalanceDisplay Balance={BalanceHolder} />
          {/* <LastTransaction Transactions={TransactionsHolder}/> */}
        </section>
        <CryptoTable Cryptos={CryptosHolder} />
      </div>
      <SideBar />
    </>
  )
}
