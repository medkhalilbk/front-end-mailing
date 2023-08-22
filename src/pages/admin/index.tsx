import React, { useEffect } from 'react';
import Router from 'next/router';

export default function Admin() {
  useEffect(() => {
    const hasNavigated = localStorage.getItem('hasNavigated'); 
    if (!hasNavigated) {
      
      Router.push('/admin/data-tables').then(() => {
        window.location.reload();
      });
      localStorage.setItem('hasNavigated', 'true');
    } else {
      localStorage.removeItem('hasNavigated');
      
    }
  }, []);

  return <div />;
}
