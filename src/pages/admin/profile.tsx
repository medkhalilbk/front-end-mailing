import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';
import AdminLayout from 'layouts/admin';
import { SimpleGrid } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { axiosConfig } from './requests';

export default function ProfileOverview() {
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
      let changePasswordRequest = await axios.patch(process.env.API_URL + "/users/" + userId, { oldPassword, newPassword }, axiosConfig)
      
      Swal.fire(changePasswordRequest.data.message, '', 'success')
      if (typeof window !== 'undefined') {
            window.localStorage.clear();
            Router.push('/auth');
          }     
    } catch (error: any) {  
      Swal.fire(error.response.data.message, '', 'error');
      
    }
    
  };

  return (
    <AdminLayout>
      <SimpleGrid backgroundColor={'white'} borderRadius={13} columns={2} padding={3} spacing={10}>
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
          <Button onClick={handleChangePassword} style={{ marginLeft: 5 }} variant="brand">
            Update
          </Button>
   
        </FormControl>
      </SimpleGrid>
    </AdminLayout>
  );
}
