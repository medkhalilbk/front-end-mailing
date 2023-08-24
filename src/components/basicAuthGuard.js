import React from 'react'
import { getToken } from './requests'
import Router from 'next/router'
import { store } from 'redux/store'


function BasicAuthGuard() {
const state = store.getState(); 
    const token = getToken()
    React.useEffect(() => {
      console.log("basic auth working");
      console.log(token);
      if (!token.acessToken && !state.user.informations) {
       return Router.push("/auth/sign-in");
      }
    }, [state]);
    return (
  <></>
  )
}

export default BasicAuthGuard