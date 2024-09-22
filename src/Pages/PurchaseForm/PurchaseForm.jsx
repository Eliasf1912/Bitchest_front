import React, { useState,useEffect } from 'react'
import Styles from './PurchaseForm.module.scss'
import { AiOutlineMenu,AiOutlineAppstore,AiOutlineWallet,AiOutlineSetting,AiOutlineLogout,AiOutlineClose,AiFillCreditCard } from "react-icons/ai";
import { FaCoins } from "react-icons/fa6";
import { NavLink, useNavigate,useLocation } from "react-router-dom";
import SideBar from '../../Components/SideBar/SideBar';

export default function PurchaseForm() {

  // On récupèrte les state envoyé depuis le dashboard 
  const location = useLocation()
  const { crypto, CryptosArr } = location.state || {}
  const [OpenMenu,setOpenMenu] = useState(false)
  const [CryptoInput,setCryptoInput]  = useState(crypto)
  const [AmountInput,setAmountInput]  = useState(0)
  const [TotalInput,setTotalInput]  = useState(0)
  const [Method,setMethod] = useState('Coins')
  const [Cryptos,setCryptos]  = useState(CryptosArr)
  const [UnitInput,setUnitInput]  = useState(0)


  const Logout = (e) => {
    e.preventDefault()
    let cookies = (document.cookie).split(';')
    cookies.forEach(cookie => {
      if(cookie.includes('AuthToken')){
        RemoveCookie('AuthToken');
      }
    });
    Navigate('/')
  }

  const HandleDropdown = (e) => {
    const CryptoChoose = e.target.value 
    Cryptos.forEach(Crypto => {
      if(Crypto.name === CryptoChoose){
        let PriceCrypto = (Crypto.price + ((Crypto.cotation * (Crypto.price)) / 100 ))
        let TotalPrice  = Math.trunc((PriceCrypto * AmountInput))
        setCryptoInput(e.target.value)
        setUnitInput(Crypto.price)
        setTotalInput(TotalPrice)
      }
    })
  }

  const HandleAmount = (e) => {
    Cryptos.forEach(Crypto => {
      if(Crypto.name === CryptoInput){
        let PriceCrypto = (Crypto.price + ((Crypto.cotation * (Crypto.price)) / 100 ))
        let TotalPrice  = Math.trunc((PriceCrypto * e.target.value))
        setTotalInput(TotalPrice)
        setAmountInput(e.target.value)
      }
    })
  }

  // Effet pour initialiser le prix unitaire en fonction de la crypto sélectionnée au chargement de la page
  useEffect(() => {
    if (CryptoInput && Cryptos) {
    const cryptoData = Cryptos.find((c) => c.name === CryptoInput);
    if (cryptoData) {
      setUnitInput(cryptoData.price); // Mettre à jour UnitPrice en fonction de la crypto initiale
    }
  } }, [CryptoInput, Cryptos]);
  
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
        {/* Purchase Form */}
        <section className={Styles.PurchaseForm}>
          <h2>Purchase</h2>
          {/* Top part */}
          <form>
            <fieldset>
              <div>
                <select name="Crypto" value={CryptoInput} onChange={HandleDropdown}>
                {
                  Cryptos.map(((Crypto,index) => {
                    return <option key={index} value={Crypto.name}>{Crypto.name}</option>
                  }))
                }
                </select>
                <input type='number' name='Amount' placeholder='Amount' value={AmountInput} onChange={HandleAmount}/>

              </div>
              <div>
                <input type="number" name='UnitPrice' placeholder='Unit price'  value={UnitInput} readOnly={true}/>
                <input type="number" name='Total' placeholder='Total' readOnly={true} value={TotalInput}/>
              </div>
            </fieldset>
            {/* Select Part */}
            <div className={Styles.Coins} onClick={()=>{setMethod('Coins')}}>
              <span className={Method === 'Coins' ? Styles.Selected : null }></span>
              <FaCoins />
              <p>Chest coins</p>
            </div>
            {/* Card method */}
            <div className={Styles.CardMethod}>
              <div className={Styles.Coins} onClick={()=>{setMethod('Card')}}>
                <span className={Method === 'Card' ? Styles.Selected : null } ></span>
                <AiFillCreditCard />
                <p>Credit card/ Debit cards</p> 
              </div>
              <div>
                <input type="text" name='Name' placeholder='Name'/>
                <div className={Styles.SubCardiv}>
                  <input type="number" name='CardNumber' placeholder='Card Number'/>
                  <div>
                    <input type="number" name='CVV'   placeholder='CVV'/>
                    <input type="month" name='Date' placeholder='MM/YY'/>
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.ButtonDiv}>
              <button>Cancel</button>
              <button>Buy</button>
            </div>
          </form>
        </section>
      </div>
      <SideBar />
    </>
  )
}
