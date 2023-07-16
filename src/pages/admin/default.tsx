 

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react'
// Assets
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar'
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from 'components/icons/IconBox'
import {
  MdAddTask,
  MdWhatsapp,
  MdOutlineContactMail,
  MdBarChart,
  MdFileCopy
} from 'react-icons/md'
import CheckTable from 'views/admin/default/components/CheckTable'
import ComplexTable from 'views/admin/default/components/ComplexTable'
import DailyTraffic from 'views/admin/default/components/DailyTraffic'
import PieCard from 'views/admin/default/components/PieCard'
import Tasks from 'views/admin/default/components/Tasks'
import TotalSpent from 'views/admin/default/components/TotalSpent'
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue'
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData
} from 'views/admin/default/variables/columnsData'
import tableDataCheck from 'views/admin/default/variables/tableDataCheck.json'
import tableDataComplex from 'views/admin/default/variables/tableDataComplex.json'
import { isWindowAvailable } from 'utils/navigation'
import AdminLayout from 'layouts/admin'
import { Image } from 'components/image/Image'
import Usa from 'img/dashboards/usa.png'

export default function UserReports () {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
            gap='20px'
            mb='20px'
          >
           
            <MiniStatistics  name='Imported mails' value='1200' />
         
            <MiniStatistics
              startContent={
                <IconBox
                  w='56px'
                  h='56px' 
                  icon={<Icon w='28px' h='28px' as={MdWhatsapp} color='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)' />}
                />
              }
              name='Imported phones'
              value='154'
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w='56px'
                  h='56px'
                  bg={boxBg}
                  icon={
                    <Icon
                      w='32px'
                      h='32px'
                      as={MdOutlineContactMail}
                      color={brandColor}
                    />
                  }
                />
              }
              name='Total Mailings'
              value='2935'
            />
          </SimpleGrid>

 
          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
            <CheckTable
              columnsData={columnsDataCheck}
              tableData={(tableDataCheck as unknown) as TableData[]}
            />
      
          </SimpleGrid>
  
        </>
      </Box>
    </AdminLayout>
  )
}
