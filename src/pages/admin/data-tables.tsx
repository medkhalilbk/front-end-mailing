import { Box, SimpleGrid } from '@chakra-ui/react' 
import ComplexTable from 'views/admin/dataTables/components/ClientsTable'
 
import React from 'react'
import AdminLayout from 'layouts/admin' 
export default function DataTables () {
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
     <ComplexTable />
      </Box>
    </AdminLayout>
  )
}
