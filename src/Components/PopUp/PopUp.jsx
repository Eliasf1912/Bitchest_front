import React, { useState } from 'react'
import Styles from './PopUp.module.scss'
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function PopUp({ErrorPopUp,CloseFunction,Show}) {

  const Navigate = useNavigate()
  
  return (
    <div className={ Show ? Styles.PopUpDisplay : Styles.PopUpHiden }>
      <div>
        {ErrorPopUp === true && <button className={Styles.BurgerMenuClose} onClick={CloseFunction}><AiOutlineClose /></button>}
        {ErrorPopUp === true ? <p className={Styles.Error}>Insufficient balance</p> : <p>Thank you for your purchase !</p>}
        {ErrorPopUp === false && <button className={Styles.Button} onClick={()=>{Navigate('/DashBoardUser')}}>Dashboard</button>}
      </div>
    </div>
  )
}
