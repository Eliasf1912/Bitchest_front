import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Styles from './CryptoTable.module.scss'
import BitCoinCash from '../../assets/bitcoin-cash.png'
import BitCoin from '../../assets/bitcoin.png'
import Cardano from '../../assets/cardano.png'
import Dash from '../../assets/dash.png'
import Etherum from '../../assets/ethereum.png'
import Iota from '../../assets/iota.png'
import Litecoin from '../../assets/litecoin.png'
import Nem from '../../assets/nem.png'
import Riple from '../../assets/ripple.png'
import Stelar from '../../assets/stellar.png'

export default function CryptoTable({Cryptos}) {

  const Navigate = useNavigate() 
  let CryptosArr = [];

  const SelectLogo = (CryptoName) => {
    switch (CryptoName) {
      case 'Bitcoin':
        return BitCoin
      break;
      case 'Ethereum':
        return Etherum
      break;
      case 'Ripple':
        return Riple
      break;
      case 'Bitcoin Cash':
        return BitCoinCash
      break;
      case 'Cardano':
        return Cardano
      break;
      case 'Litecoin':
        return Litecoin
      break;
      case 'NEM':
        return Nem
      break;
      case 'Stellar':
        return Stelar
      break;
      case 'IOTA':
        return Iota
      break;
      case 'Dash':
        return Dash
      break;
    }
  }

  Cryptos.forEach(Crypto => {
    let IsInside = CryptosArr.some(Crypt => Crypt.name === Crypto.cryptos.name)
    if(IsInside){
      // On récupère l'élément avec la date la plus récente si l'élément est déja dans le tableau
      let CryptoInsideArr = CryptosArr.find(Crypt => Crypt.name === Crypto.cryptos.name)
      let DateToCheck = new Date(Crypto.CreatedAt)
      let DateInsideArr = new Date(CryptoInsideArr.createdat)
      if(DateInsideArr < DateToCheck){
        // Ensuite on remplace
        CryptoInsideArr.cotation = Crypto.Cotation
        CryptoInsideArr.creadtedat = Crypto.CreatedAt
      }
    }
    else{
      // On ajoute si il existe pas 
      let CryptoObj = { 
        name : Crypto.cryptos.name,
        cotation : Crypto.Cotation,
        creadtedat : Crypto.CreatedAt,
        price : Crypto.cryptos.price
      }
      CryptosArr.push(CryptoObj)
    }
  })

  const Purchase = (crypto) => {
    Navigate('/purchaseForm', {state : {crypto}})
  }

  return (
    Array.isArray(Cryptos) && Cryptos.length > 10 ?
    <>
      <div className={Styles.CryptoTable}>
        <h2>Market Value</h2>
        <table>
          <thead>
            <tr>
              <td>Currency Name</td>
              <td>Price</td>
              <td>24h%</td>
              <td>Trade</td>
            </tr>
          </thead>
          <tbody>
            {
              CryptosArr.map((cryptos,index) => {
                return <tr key={index} className=''>
                  <td>
                    <div>
                      <img src={SelectLogo(cryptos.name)} alt="Logo crypto" />
                      <p>{cryptos.name}</p>
                    </div>
                  </td>
                  <td>{cryptos.price}$</td>
                  <td className={cryptos.cotation < 0 ? Styles.Negative : Styles.Positive}>{cryptos.cotation}</td>
                  <td>
                    <button onClick={() => Purchase(cryptos.name)} ><AiOutlineShoppingCart /></button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
    :
    <>
      <h2>Loading Error</h2>
    </>
  ) 
}
