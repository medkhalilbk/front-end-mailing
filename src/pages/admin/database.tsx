/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react'

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link
} from '@chakra-ui/react'

// Custom components
import Banner from 'views/admin/marketplace/components/Banner'
import TableTopCreators from 'views/admin/marketplace/components/RecentlyAdded'
import HistoryItem from 'views/admin/marketplace/components/HistoryItem'
import NFT from 'components/card/NFT'
import Card from 'components/card/Card'

import Storage from 'views/admin/profile/components/Storage'
import Upload from 'views/admin/profile/components/Upload'
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators.json'
import { tableColumnsTopCreators } from 'views/admin/marketplace/variables/tableColumnsTopCreators'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import NextLink from 'next/link'

export default function NftMarketplace () {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')
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
              base: '3 / 1 / 4 / 2',
              lg: '1 / 1 / 2 / 4'
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
                tableData={(tableDataTopCreators as unknown) as TableData[]}
                columnsData={tableColumnsTopCreators}
              />
            </Card> 
          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
