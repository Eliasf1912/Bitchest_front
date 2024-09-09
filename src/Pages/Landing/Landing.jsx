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

  const ToggleSwicthAuth = () => {
    if(SwitchAuth === 'Sign') {
      setSwitchAuth('Login')
      setEnableCondition(false)
      setEnableRememberMe(false)
    }
    else{
      setSwitchAuth('Sign')
      setEnableCondition(false)
      setEnableRememberMe(false)
    }
  }

  const ToggleCondition = () => {
    if(EnableCondition) {
      setEnableCondition(false)
    }
    else{
      setEnableCondition(true)
    }
  }

  const ToggleRemeberMe = () => {
    if(EnableRememberMe) {
      setEnableRememberMe(false)
    }
    else{
      setEnableRememberMe(true)
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
            <input type="email" placeholder='Email' name='Email'/>
            <input type="text" placeholder='Username' name='Username'/>
            <input type="Password" placeholder='Password' name='Password'/>
            <div onClick={ToggleRemeberMe}>
              <span className={ EnableRememberMe ? styles.Selected : null}></span>
              <p>I confirm that I am over 18</p>
            </div>
            <input type="submit" value='Sign up'/>
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
            <input type="text" placeholder='Username' name='Username'/>
            <input type="Password" placeholder='Password' name='Password'/>

            <div onClick={ToggleCondition}>
              <span className={EnableCondition ? styles.Selected : null}></span>
              <p>Remember me</p>
            </div>
            <input type="submit" value='Login'/>
          </form>
          <p>Don’t have an account yet ? <span onClick={ToggleSwicthAuth}>Get one ! </span></p>
        </section> 
      }
      
    </section>
  )
}
