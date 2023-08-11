 

import { 
  Box, 
  Flex,
  Text,
  Avatar, 
  Badge,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
 import Swal from 'sweetalert2'
import banner from 'img/auth/banner.png'
import Banner from 'views/admin/profile/components/Storage'
import AdminLayout from 'layouts/admin'  
import { useSelector } from 'react-redux'
import Router from 'next/router'

export default function UserReports () {
  // Chakra Color Mode
  const userInfos = useSelector((state:any)=> state?.user.informations)
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )
  return ( 
    <AdminLayout>
{/*  <Flex>
  <Avatar src="" />
  <Box ml="3">
    <Text fontWeight="bold">
      Admin
      <Badge ml="1" colorScheme="green">
        Confirmed
      </Badge>
    </Text>
          <Text fontSize="sm"><Button bgColor={'#422AFB'}   style={{height:20, color:"white"}} size={'sm'} > Logout </Button></Text>
  </Box>
</Flex> */}
    </AdminLayout>
  )
}
