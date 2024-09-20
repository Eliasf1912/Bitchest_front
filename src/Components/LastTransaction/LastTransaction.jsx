import React from 'react'

export default function LastTransaction(Transactions) {
  return (
    Transactions === null ? 
        <>
          <h2>Latest Transaction</h2>
          <button onClick={()=>{Navigate('/Wallet')}}>Transactions</button>
        </>
        :
        <>
          <h2>You haven't done any transactions yet</h2>
        </>
  )
}
