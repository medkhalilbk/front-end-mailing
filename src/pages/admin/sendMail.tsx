 
import React, { ChangeEvent, useEffect, useState } from 'react'
import AdminLayout from 'layouts/admin'  
import { useDispatch, useSelector } from 'react-redux' 
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Text, Badge, Flex, Textarea, } from '@chakra-ui/react'
import { Button } from 'primereact/button'; 
import { deleteCostumerFromListAction } from 'redux/costumerSlice';
import { sendEmail } from '../../components/requests';
import Swal from 'sweetalert2';  
import  Router  from 'next/router';

export default function SendMailPage() {

  const costumersState = useSelector((state: any) => state.costumers)
  const [isDisabled,setIsDisabled] = useState(true)
  const [bodyText, setBodyText] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {   
    ((costumersState?.length !== 0) && (bodyText.length !== 0))  ? setIsDisabled(false) :  setIsDisabled(true) 
  }, [costumersState,bodyText])
  
   function handleSending()  {
 
    sendEmail(costumersState, bodyText).then(() => {
      Swal.fire({ title: "Sending emails in progress!", text: "In few time emails will be delivered" }).then((res) => {
         res.isConfirmed ? Router.push('/admin/data-tables') : null
       })
    }).catch((err:any) => {
       Swal.fire({title:"Error" , text:err.message})
     })
    
  
        
  
  }

  function handleTextArea(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setBodyText(value)
  }

   
  return (
      <AdminLayout> 
          <Accordion className='w-full' allowMultiple style={{maxWidth:"80%" , margin:"auto" ,}}>
  <AccordionItem className='border-b border-gray-200 py-[17px] dark:!border-white/10'>
    <h2>
            <AccordionButton className='flex justify-between'>
              Email List
       <AccordionIcon className='text-left !text-navy-900 dark:!text-white'/>
      </AccordionButton>
    </h2>
    <AccordionPanel className='text-left text-medium mt-2 !text-navy-900 dark:!text-white' pb={4}>
            {(Array.isArray(costumersState)) && costumersState.map((c:any,k:number) => { return <Flex  key={k}>
  <Avatar src="" size={'xs'} />
  <Box ml="3">
    <Text fontWeight="bold">
      {c.email}
      <Badge ml="1" colorScheme="green">
        {c.fullName}
      </Badge>
    </Text>
    <Text fontSize="sm">{c.company}</Text>
              </Box>
              <Flex style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"  , alignContent:"baseline", marginLeft:"15px"}}><Button  style={{backgroundColor:"#E31A1A", border:"none" , borderRadius:"40%"}} onClick={() => { dispatch(deleteCostumerFromListAction(c))}}   icon="pi pi-trash"  ></Button></Flex>
</Flex> })}
    </AccordionPanel>
        </AccordionItem>
      </Accordion>
      
      <Flex style={{ maxWidth: "80%", margin: "auto", marginTop: "5%", flexDirection:"column" }}>
        <Text mb={4}>Mail Body :</Text>
        <Textarea onChange={handleTextArea} value={bodyText} rows={15} placeholder='Here is the mail body' /> 
        <Button disabled={isDisabled} onClick={() => {
          handleSending()
        }}  style={{ maxWidth: "25%" , margin:"auto" , marginTop:14}}>Send</Button>
      </Flex>
    </AdminLayout>
  )
}
