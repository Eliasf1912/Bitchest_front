import React from 'react'
import Styles from './BalanceDisplay.module.scss'
import { useNavigate } from "react-router-dom";
import { GetCookie } from '../../Services/Auth';

export default function BalanceDisplay({Balance}) {

  const Navigate = useNavigate()

  return (
    <div className={Styles.Balance}>
      {
        Number.isInteger(Balance) ? 
        <>
          <h2>Total Balance</h2>
          <span>{Balance}$</span>
          <button onClick={()=>{Navigate('/Wallet')}}>Wallet</button>
        </>
        :
        <>
          <h2>Loading Error</h2>
        </>
      }
    </div>
  )
}
