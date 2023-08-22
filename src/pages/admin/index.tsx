import React, { useEffect } from 'react';
import Router from 'next/router';

export default function Admin() {
  useEffect(() => {
    const hasNavigated = localStorage.getItem('hasNavigated'); 
    if (!hasNavigated) {
      Router.push('/admin/data-tables');
      localStorage.setItem('hasNavigated', 'true');
    } else {
      localStorage.removeItem('hasNavigated');
      window.location.reload();
    }
  }, []);

  return <div />;
}
