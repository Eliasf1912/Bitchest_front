const APIurl = 'https://127.0.0.1:8000/'
import { useNavigate } from "react-router-dom";


export async function Register(UserName,Email,Pwd){
  try {
    const Response = await fetch(`https://127.0.0.1:8000/api/register`, 
      {
        method : 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(
          { 
            "username": UserName,
            "email" : Email,
            "password" : Pwd
          }
        )
      }
    )

    if(Response.ok){
      return await Response.json()
    }
    else if(Response.status === 409){
      const ErrorData = await Response.json()
      throw new Error(ErrorData.message)
    }
  } catch (Error) {
    throw Error
  }
} 

export async function Login(UserName,Pwd){
  try {
    const Response = await fetch(`https://127.0.0.1:8000/api/login`, 
      {
        method : 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(
          { 
            "username": UserName,
            "password" : Pwd
          }
        )
      }
    )
    if(Response.ok){
      return await Response.json()
    }
    else if(Response.status === 401){
      const ErrorData = await Response.json()
      throw new Error(ErrorData.message)
    }
  } catch (Error) {
    throw Error
  }
}

export async function GetUserDashBoardInformations(Cookie){
  try {
    const Response = await fetch(`https://127.0.0.1:8000/api/user/dashboard`, 
      {
        method : 'GET',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${Cookie}`
        }
      }
    )
    if(Response.ok){
      return await Response.json()
    }
  } catch (Error) {
    throw Error
  }
}

export async function PurchaseCrypto(Cookie,Type,Bitcoins,Amount,Cotation){
  try {
    const Response = await fetch(`https://127.0.0.1:8000/api/user/transactions`, 
      {
        method : 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${Cookie}`
        },
        body : JSON.stringify(
          { 
            "type": Type,
            "bitcoins" : Bitcoins,
            "amount" : Amount,
            "cotation" : Cotation
          }
        )
      }
    )
    if(Response.ok){
      return await Response.json()
    }
    else if(Response.status === 409){
      const ErrorData = await Response.json()
      throw new Error(ErrorData.message)
    }
  } catch (Error) {
    throw Error
  }
}

// Cookie méthode

export function GetCookie(Nom){
  let Token = ''
  const Cookies = document.cookie.split(";");
  Cookies.forEach(Cookie => {
    let NameCookie = Cookie.split('=');
    if(NameCookie[0] == Nom){
      Token = NameCookie[1].toString()
    }
  })
  return Token
}

export function setCookie(Name, Value, Days) {
  const date = new Date();
  date.setTime(date.getTime() + (Days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${Name}=${Value};${expires};secure;path=/`;
}

export function RemoveCookie(Nom) {
  document.cookie = `${Nom}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}