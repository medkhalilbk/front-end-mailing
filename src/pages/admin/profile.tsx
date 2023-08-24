import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { useRouter } from 'next/router' 
import AdminLayout from 'layouts/admin';
import { SimpleGrid } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { apiUrl, axiosConfig, getToken } from '../../components/requests';
import { store } from 'redux/store';

export default function ProfileOverview() {
  const state = store.getState(); 
  const token = getToken() 
  React.useEffect(() => { 
      console.log(token);
      if (!token?.acessToken && !state.user.informations) {
        if (typeof window !== "undefined") {
         Router.push("/auth/sign-in")
       };
      }
    }, [state]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Logout',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged out!', '', 'success');
        if (typeof window !== 'undefined') {
          window.localStorage.clear();
          Router.push('/auth');
        }
      }
    });
  };

  const handleChangePassword = async () => { 
    let userId = (window.localStorage.getItem('userId'))
    try {
      let changePasswordRequest = await axios.patch(apiUrl + "/users/" + userId, { oldPassword, newPassword }, axiosConfig)
      
      Swal.fire(changePasswordRequest.data.message, '', 'success')
      if (typeof window !== 'undefined') {
            window.localStorage.clear();
            Router.push('/auth');
          }     
    } catch (error: any) {  
      console.log(error)
      Swal.fire(error.response.data.message, '', 'error');
      
    }
    
  };

  

  return (
    <AdminLayout>
      <SimpleGrid backgroundColor={'white'} borderRadius={13} columns={1} padding={50} spacing={4}>
        <FormControl id="email">
          <FormLabel style={{ flexDirection: 'row' }}>Change Password</FormLabel>
          <Input
            style={{ width: '40%' }}
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
          />
          <Input
            style={{ width: '40%', marginLeft: 10 }}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <Button disabled={(oldPassword == newPassword)}  onClick={handleChangePassword} style={{ marginLeft: 5 }} variant="brand">
            Update
          </Button>
          {((oldPassword == newPassword) &&  (oldPassword  !== "")) && <Text mt={2} color="red.300" >You can`&apos;`t change with the same password !</Text>}
        </FormControl>
      </SimpleGrid>
    </AdminLayout>
  );
}
