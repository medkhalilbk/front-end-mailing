 

import React from 'react';
// Chakra imports
import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

export default function SignIn() {
	// Chakra color mode
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	const brandStars = useColorModeValue('brand.500', 'brand.400');
	const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
	const googleText = useColorModeValue('navy.700', 'white');
	const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' });
	const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' });
	const [ show, setShow ] = React.useState(false);
	const handleClick = () => setShow(!show);
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
		 
				 
					<FormControl>
						<FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
							Username<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							isRequired={true}
							variant='auth'
							fontSize='sm'
							ms={{ base: '0px', md: '0px' }}
							type='text'
							placeholder='aziz@mailing..'
							mb='24px'
							fontWeight='500'
							size='lg'
						/>
					 
						<InputGroup size='md'>
							<Input
								isRequired={true}
								fontSize='sm'
								placeholder='Min. 8 characters'
								mb='24px'
								size='lg'
								type={show ? 'text' : 'password'}
								variant='auth'
							/>
				 
						</InputGroup>
						<Flex justifyContent='space-between' align='center' mb='24px'>
					 	 
					 
						 
						</Flex>
						<Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
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
