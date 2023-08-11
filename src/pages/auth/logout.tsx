import React from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';

function Logout() {
  React.useEffect(() => {
    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to Logout',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Logged out!', '', 'success');
          if (typeof window !== 'undefined') {
            window.localStorage.clear();
            Router.push('/auth');
          }        
        }else {
              Router.back()
          }   
      }) ;
    };
    handleLogout();
  }, []);

  return <></>;
}

export default Logout;
