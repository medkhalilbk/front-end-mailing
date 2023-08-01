import Router from 'next/router'
import React, { useEffect } from 'react'

export default function Home() {
  


  useEffect(() => {
    if (typeof (window) !== "undefined") { 
      window.localStorage.getItem('tokenAccess')? Router.push('/admin') : Router.push('/auth')
    } 
  })

  return <></>
}
