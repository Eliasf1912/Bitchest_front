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

export function setCookie(Name, Value, Days) {
  const date = new Date();
  date.setTime(date.getTime() + (Days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${Name}=${Value};${expires};secure;path=/`;
}

export function RemoveCookie(nom) {
  document.cookie = `${nom}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


export function Logout(e){
  const Navigate = useNavigate();
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