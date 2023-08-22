 

import React from 'react'

// Chakra imports
import {
  Box, 
  Flex,
  Grid, 
  SimpleGrid 
} from '@chakra-ui/react'

// Custom components 
import TableTopCreators from 'views/admin/marketplace/components/RecentlyAdded' 
import Card from 'components/card/Card'

import Storage from 'views/admin/profile/components/Storage'
import Upload from 'views/admin/profile/components/Upload'
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators.json'
import { tableColumnsTopCreators } from 'views/admin/marketplace/variables/tableColumnsTopCreators'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData' 
import { getFiles, getToken } from '../../components/requests'
import Swal from 'sweetalert2'
import  Router  from 'next/router'

export default function NftMarketplace() {
  const [files, setFiles] = React.useState([])
  React.useEffect(() => { 
    getFiles()
      .then((res) => {
        if (res && res.data && res.data.message) {
          setFiles(res.data.message);
          console.log(res.data.message)
        } else {
          console.error("Invalid response format:", res);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error', title: "You have to reconnect!", allowOutsideClick: false,
          showCloseButton: false, text: err.message
        }).then(() => {
          window.localStorage.clear();
          Router.push('/auth');
        });
      })
  }, []);
  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
          > 
           
              
              <SimpleGrid  gap='20px' >
                 
                <Storage
            gridArea={{  base: '2 / 1 / 4 / 2',
              lg: '2 / 2 / 2 / 4' }}
            used={0.1}
            total={1}
          />
          <Upload
            gridArea={{
              base: '3 / 1 ',
              lg: '1 / 1 '
            }}
            minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
            pe='20px'
            pb={{ base: '100px', lg: '20px' }}
          />
              </SimpleGrid> 
            </Flex>
     
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
          >
            <Card px='0px' mb='20px'>
              <TableTopCreators
                tableData={(files as unknown) as TableData[]}
                columnsData={tableColumnsTopCreators}
              />
            </Card> 
          </Flex>
        </Grid> 
      </Box>
    </AdminLayout>
  )
}
