import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex, 
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react' 
import React, { useMemo } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import { TableProps } from 'views/admin/default/variables/columnsData'

function TopCreatorTable(props: TableProps) {

  
  const { columnsData, tableData } = props

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])
  const [isClosed, setIsClosed] = React.useState(false)
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow
  } = tableInstance

  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex
          align={{ sm: 'flex-start', lg: 'center' }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'
        >
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Recently Added
          </Text>
          <Button onClick={() => {
            setIsClosed(!isClosed)
          }} variant='action'>Close</Button>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor='transparent'
                  >
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.400'
                    >
                      {column.render('Header')}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
                {!isClosed && 
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data
                    if (cell.column.Header === 'Name') {
                      data = (
                        <Flex align='center'>
                          <Avatar
                            src={"data:image/jpeg;base64,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"}
                            w='30px'
                            h='30px'
                            me='8px'
                          />
                          <Text
                            color={textColor}
                            fontSize='sm'
                            fontWeight='600'
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      )
                    } else if (cell.column.Header === 'Date') {
                      data = (
                        <Text
                          color={textColorSecondary}
                          fontSize='sm'
                          fontWeight='500'
                        >
                          {cell.value}
                        </Text>
                      )
                    } else if (cell.column.Header === 'Size') {
                      data = (
                        <Box>
                           {cell.value}
                        </Box>
                      )
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor='transparent'
                      >
                        {data}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>}
        </Table>
      </Flex>
    </>
  )
}

export default TopCreatorTable
