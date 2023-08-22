import React, { useState } from 'react';
import AdminLayout from 'layouts/admin';
import Router from 'next/router'
import {
  FormControl,
  FormLabel,
  Flex,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { addClientRequest } from '../../components/requests';

function AddClient() {
  const [company, setCompany] = useState('');
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [sector, setSector] = useState('');
  const handleButtonClick = async  () => {
    try {
    if (!company || !fullName || !number || !email || !sector) {
    return Swal.fire({title:"Error" , text:"Please fill the form!"})
    }  
      let client = {
        company: company,
        fullName: fullName,
        number: number,
        email: email,
        country: country,
        sector: sector,
        }; 
        const request =  await addClientRequest(client) 
        const toggleSwal = await Swal.fire({ title: "Client Added!", text: "Navigate to clients list to view the changes" })
        toggleSwal.isConfirmed ? Router.push('/admin/data-tables') : null
    } catch (error:any) {
       await Swal.fire({ title: "Error", text: error.message })
    }
  };

  return (
    <AdminLayout>
      <Flex flexDirection="column"  padding={0} >
        <Text fontSize="3xl" fontWeight="bold">
          Add Client Informations :
        </Text>
        <FormControl>
          <FormLabel mt={5}>Company :</FormLabel>
          <Input
            type="text"
            width="80"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <FormLabel mt={5}>Full Name :</FormLabel>
          <Input
            type="text"
            width="80"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <FormLabel mt={5}>Number :</FormLabel>
          <Input
            type="number"
            width="80"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <FormLabel mt={5}>Email :</FormLabel>
          <Input
            type="email"
            width="80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel mt={5}>Country :</FormLabel>
          <Input
            type="text"
            width="80"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <FormLabel mt={5}>Sector :</FormLabel>
          <Input
            type="text"
            width="80"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />
        </FormControl>
        <Button backgroundColor={"green"} color={"white"} width={"60"} mt={5} onClick={handleButtonClick}>
          Log Values
        </Button>
      </Flex>
      <Flex> 
      </Flex>
    </AdminLayout>
  );
}

export default AddClient;
