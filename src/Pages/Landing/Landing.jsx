import React, { useState } from 'react'
import styles from './Landing.module.scss'
import Logo from '../../assets/bitchest_logo.png'

export default function Main() {

  // State pour changer la méthode d'authentification
  const [SwitchAuth,setSwitchAuth] = useState('Sign');
  // State pour les condtions d'utilisation
  const [EnableCondition,setEnableCondition] = useState(false);
  // State pour les condtions pour le remember me
  const [EnableRememberMe,setEnableRememberMe] = useState(false);

  // State pour les inputs  
  const [UserNameInput,setUserNameInput] = useState('')
  const [EmailInput,setEmailInput] = useState('')
  const [PasswordInput,setPasswordInput] = useState('')

  // State pour les erreurs d'inputs
  const [UserNameInputError,setUserNameInputError] = useState(false)
  const [EmailInputError,setEmailInputError] = useState(false)
  const [PasswordInputError,setPasswordInputError] = useState(false)

  // State pour le refus du formulaire
  const [InvalidForm,SetInvalidForm] = useState(false)


  // Cette fonction gére le changement de méthode d'authentification
  const ToggleSwicthAuth = () => {
    if(SwitchAuth === 'Sign') {
      // On reset le form au changement
      setSwitchAuth('Login')
      setEnableCondition(false)
      setEnableRememberMe(false)
      setUserNameInput('')
      setUserNameInputError(false)
      setEmailInput('')
      setEmailInputError(false)
      setPasswordInput('')
      setPasswordInputError(false)
    }
    else{
      setSwitchAuth('Sign')
      setEnableCondition(false)
      setEnableRememberMe(false)
      setUserNameInput('')
      setUserNameInputError(false)
      setEmailInput('')
      setEmailInputError(false)
      setPasswordInput('')
      setPasswordInputError(false)
    }
  }

  // Ces fonction gére le remember me et l'âge requis
  const ToggleCondition = () => {
    if(!EnableCondition) {
      setEnableCondition(true)
      console.log(EnableCondition)
    }
    else{
      setEnableCondition(false)
      console.log(EnableCondition)
    }
  }

  const ToggleRemeberMe = () => {
    if(!EnableRememberMe) {
      setEnableRememberMe(true)
    }
    else{
      setEnableRememberMe(false)
    } 
  }

  // Cette fonction gére le changement des inputs 
  const HandleChangeInput = (e) => {
    switch (e.target.name) {
      case 'Email':
        if(SwitchAuth === 'Sign'){
          if(e.target.value === '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e.target.value)){
            setEmailInputError(true)
          }else{
            setEmailInputError(false)
          }
        }
        else{
          if(e.target.value === ''){
            setEmailInputError(true)
          }else{
            setEmailInputError(false)
          }
        }
        setEmailInput(e.target.value)
      break;
      case 'Username':
        if(e.target.value === ''){
          setUserNameInputError(true)
        }else{
          setUserNameInputError(false)
        }
        setUserNameInput(e.target.value)
      break;
      case 'Password':
        if(SwitchAuth === 'Sign'){
          if(e.target.value === '' || !TestPassword(e.target.value)){
            setPasswordInputError(true)
          }else{
            setPasswordInputError(false)
          }
        }
        else{
          if(e.target.value === ''){
            setPasswordInputError(true)
          }else{
            setPasswordInputError(false)
          }
        }
        setPasswordInput(e.target.value)
      break;
    }
  }

  // Permet de valider la robustesse du mot de passe 
  function TestPassword(Pwd){
    if( 
      /[A-Z]/.test(Pwd) && 
      /[a-z]/.test(Pwd) && 
      /[0-9]/.test(Pwd) && 
      /[!@#$%^&*(),.?":{}|<>]/.test(Pwd) &&
      Pwd.length >= 8
    ){
      return true
    }
    else{
      return false
    }
  }

  // Cette fonction permet d'envoyer le formulaire si tout les conditions sont réunis 
  const SubmitForm = (e) => {
    e.preventDefault()
    if(SwitchAuth === 'Sign'){
      if(!EmailInputError && !UserNameInputError && !PasswordInputError && EnableCondition && !EmailInput.length == 0 && !UserNameInput.length == 0 && !PasswordInput.length == 0){
        alert('submit réussi')
      }
      else{
        SetInvalidForm(true)
      }
    }
    else{
      if(!EmailInputError && !PasswordInputError && !EmailInput.length == 0 && !PasswordInput.length == 0){
        alert('submit réussi')
        console.log(EmailInputError,PasswordInputError)
      }
      else{
        SetInvalidForm(true)
      }

    }
  }

  return (
    
    <section className={styles.Landing}>
      <img src={Logo} className={styles.Logo} alt="Logo bitchest" />
      {/* Section sing up */}
      {
        SwitchAuth === 'Sign' && 
        <section>
          <h2>Sign up</h2>
          <form>
            <fieldset className={EmailInputError ? styles.Error : null}>
              <input type="email" placeholder='Email' name='Email' onChange={HandleChangeInput} value={EmailInput}/>
              {EmailInputError && <p className={styles.Error}>The Email is incorrect</p> }
            </fieldset>
            <fieldset className={UserNameInputError ? styles.Error : null}>
              <input type="text" placeholder='Username' name='Username' onChange={HandleChangeInput} value={UserNameInput}/>
              {UserNameInputError && <p>This UserName already exits, choose another one !</p> }
            </fieldset>
            <fieldset className={PasswordInputError ? styles.Error : null}>
              <input type="Password" placeholder='Password' name='Password' onChange={HandleChangeInput} value={PasswordInput}/>
              {PasswordInputError && <p className={styles.Error}>Must be 8+ chars, with 1 uppercase, 1 lowercase, 1 number, and 1 symbol</p>}
            </fieldset>
            <div onClick={ToggleCondition}>
              <span className={ EnableCondition ? styles.Selected : null}></span>
              <p>I confirm that I am over 18</p>
            </div>
            <input type="submit" value='Sign up' onClick={SubmitForm} className={InvalidForm ? styles.Refused : null} onAnimationEnd={()=>{SetInvalidForm(false)}}/>
          </form>
          <p>Got one already ? <span onClick={ToggleSwicthAuth}>Login</span></p>
        </section>
      }
      
      {/* Section login */}
      {
        SwitchAuth === 'Login' && 
        <section>
          <h2>Login</h2>
          <form>
            <fieldset className={EmailInputError ? styles.Error : null}>
              <input type="email" placeholder='Email' name='Email' onChange={HandleChangeInput} value={EmailInput}/>
              {EmailInputError && <p className={styles.Error}>The Email is incorrect</p> }
            </fieldset>
            <fieldset className={PasswordInputError ? styles.Error : null}>
              <input type="Password" placeholder='Password' name='Password' onChange={HandleChangeInput} value={PasswordInput}/>
            </fieldset>
            <div onClick={ToggleRemeberMe}>
              <span className={EnableRememberMe ? styles.Selected : null} ></span>
              <p>Remember me</p>
            </div>
            <input type="submit" value='Login' onClick={SubmitForm} className={InvalidForm ? styles.Refused : null} onAnimationEnd={()=>{SetInvalidForm(false)}}/>
          </form>
          <p>Don’t have an account yet ? <span onClick={ToggleSwicthAuth}>Get one ! </span></p>
        </section> 
      }
      
    </section>
  )
}
