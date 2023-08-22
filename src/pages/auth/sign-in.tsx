 

import React from 'react';
import Router from 'next/router' 
import { 
	Button, 
	Flex,
	FormControl,
	FormLabel, 
	Stack,
	Alert,
	AlertIcon,
	Input,
	InputGroup, 
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components 
import DefaultAuthLayout from 'layouts/auth/Default';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from 'redux/userSlice';
export default function SignIn() {  
	const userState = useSelector((state:any) => state?.user?.informations)
	const [token,setToken] = React.useState(null) 
	const textColor = useColorModeValue('navy.700', 'white'); 
	const brandStars = useColorModeValue('brand.500', 'brand.400');
	const [ show, setShow ] = React.useState(false);
	const [ user, setUser ] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorObject , setErrorObject ]  = React.useState(null)
	const handleClick = () => setShow(!show);
	const dispatch = useDispatch()
	const handleChangePassword = (event:any) => {
		setPassword(event.target.value)
	}
		const handleChangeUsername = (event:any) => {
		setUser(event.target.value)
	}
	const handleSubmit = async () => { 
    try { 
      const response = await axios.post("http://164.92.110.240:3000/v1/auth/login", {email:user,password:password
      });
 
		if (response) {
		setErrorObject(null)
		dispatch(loginAction(response.data)) 
		window.localStorage.setItem('tokenAccess', response.data.tokens.access.token)
		window.localStorage.setItem('tokenRefresh',response.data.tokens.refresh.token)
		window.localStorage.setItem('userId',response.data.user.id)
		Router.push('/admin')
      }
		} catch (error:any) {
      console.error('Error during authentication:', error);
		setErrorObject({
		  message:error?.response.data.message
	  })
    }
  };
	return (
		<DefaultAuthLayout illustrationBackground={'/img/auth/mail.jpg'}>
			<Flex
				maxW={{ base: '100%', md: 'max-content' }}
				w='100%'
				mx={{ base: 'auto', lg: '0px' }}
				me='auto'
				h='100%'
				alignItems='start'
				justifyContent='center'
				mb={{ base: '30px', md: '60px' }}
				px={{ base: '25px', md: '0px' }}
				mt={{ base: '14vh', md: '30vh' }}
				flexDirection='column'>
			 
				<Flex
					zIndex='2'
					direction='column'
					w={{ base: '100%', md: '420px' }}
					maxW='100%'
					background='transparent'
					borderRadius='15px'
					mx={{ base: 'auto', lg: 'unset' }}
					me='auto'
					mb={{ base: '20px', md: 'auto' }}>
		 
				 
					<FormControl onSubmit={() => {
						console.log()
					}} >
						<FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
							Username<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							isRequired={true}
							variant='auth'
							fontSize='sm'
							ms={{ base: '0px', md: '0px' }}
							type='text'
							placeholder='admin@admin.com'
							mb='24px'
							fontWeight='500'
							size='lg'
							value={user}
							onChange={handleChangeUsername}
						/>
					 
						<InputGroup size='md'>
							<Input
								isRequired={true}
								fontSize='sm'
								placeholder='Password'
								mb='24px'
								size='lg'
								type={show ? 'text' : 'password'}
								variant='auth'
								value={password}
								onChange={handleChangePassword}
							/>
				 
						</InputGroup>
						<Flex justifyContent='space-between' align='center' mb='24px'>
					 	 
					 
						 {errorObject && <Stack spacing={3}>
  <Alert status='error' >
    <AlertIcon />
    {errorObject?.message}
								</Alert>
								</Stack>}
						</Flex>
						
						<Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px' onClick={handleSubmit}  >
							Sign In
						</Button>
					</FormControl>
					<Flex flexDirection='column' justifyContent='center' alignItems='start' maxW='100%' mt='0px'>
		 
					</Flex>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}
