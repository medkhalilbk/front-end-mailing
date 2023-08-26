
import React, { useRef, useState } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Flex, Stack } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin'; 
import {useReactToPrint} from 'react-to-print'; 
import { deleteCostumerFromListAction } from 'redux/costumerSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function PrintComponent() {  
    const singleRef = useRef(null) 
    const globalRef = useRef(null)
    const [singleRefState,setSingleRefState] = useState(null)
    const handlePrintGlboal = useReactToPrint({
        content: () => globalRef.current,
      });
     const handlePrintSingle = useReactToPrint({
        content: () => singleRef.current,
    })
    const costumersList = useSelector((state: any) => state.costumers)
    const dispatch = useDispatch()
    const header = (
        <img alt="Card" height={150}  src="https://strattonleocommunication.com/wp-content/uploads/2016/06/our-clients-banner.jpg" />
    );
 
    const ClientComponent = ({ id, fullName, company, number, country, email, sector }: any) => {
    return (
                          <Stack margin={"auto"} my={4} width={"90%"}   >
            <Flex>
                   <div className="card flex justify-content-center">
                        <Card title={fullName} subTitle={company} footer={() => {
                            return (
                                 <div ref={singleRef}  className="flex flex-wrap justify-content-end gap-2 noPrint">
                                    <Button label="Remove" onClick={() => {
                                        dispatch(deleteCostumerFromListAction({id:id}))
            }} icon="pi pi-trash" style={{backgroundColor:"red" , borderColor:"transparent" , marginRight:"10px"}} />
           
        </div>
                            )
            }} header={header} className="md:w-25rem">
                <p className="m-0">
                    <ul style={{paddingLeft:25}}>
                                    <li><b>Phone</b> : {number}</li>
                                     <li><b>Country</b> : {country}</li>
                                    <li><b>Email</b> : {email}</li>
                                    <li><b>Sector</b> : {sector}</li>
                    </ul>
                </p>
            </Card>
        </div>
            </Flex>
     </Stack>
        )
    }
    return (
        <AdminLayout>
            <Flex flexDir={"row"} margin={"auto"} justifyContent={"center"} >
                <Button icon="pi pi-paperclip" style={{margin:15 , justifyContent:"space-between"}} label={"Print "+  costumersList?.length  +" Card(s)  "} onClick={handlePrintGlboal}> </Button>
            </Flex>
            <div ref={globalRef}>
                {costumersList && costumersList.map((c:any) => {
            return ClientComponent(c)
        })}
            </div>
      </AdminLayout>
    )
}
        