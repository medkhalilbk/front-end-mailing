
import React, { useRef } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Flex, Stack } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin'; 
import {useReactToPrint} from 'react-to-print'; 
import { deleteCostumerFromListAction } from 'redux/costumerSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function AdvancedDemo() {  

    const globalRef = useRef(null)
    
      const handlePrintGlboal = useReactToPrint({ 
        onBeforePrint : () => {
            setIsPrint(true)
        } ,
        onBeforeGetContent : () => {
            setIsPrint(true)
        } , 
 
        content: () => globalRef.current,
      });
    const costumersList = useSelector((state: any) => state.costumers)
    const [isPrint,setIsPrint] = React.useState(false)
    const dispatch = useDispatch()
    const header = (
        <img alt="Card" height={150}  src="https://strattonleocommunication.com/wp-content/uploads/2016/06/our-clients-banner.jpg" />
    );

    const clientComponent = ({id,fullName,company,number,country,email,sector} : any) => {
  
     return (
        <Stack margin={"auto"} my={4} width={"90%"}>
            <Flex>
                <div className="card flex justify-content-center">
                    <Card title={fullName} subTitle={company} footer={() => {
                        return (
                            <div  hidden={isPrint}  className="flex flex-wrap justify-content-end gap-2 no-print">
                                <Button label="Remove" onClick={() => {
                                    dispatch(deleteCostumerFromListAction({ id: id }));
                                } } icon="pi pi-trash" style={{ backgroundColor: "red", borderColor: "transparent", marginRight: "10px" }} />
                                <Button onClick={(e) => { console.log(e); } } label="Print" icon="pi pi-paperclip" className="p-button-outlined p-button-secondary" />
                            </div>
                        );
                    } } header={header} className="md:w-25rem">
                        <p className="m-0">
                            <ul style={{ paddingLeft: 25 }}>
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
     ) ;
     
    }
    return (
        <AdminLayout>
            <Flex flexDir={"row"} margin={"auto"} justifyContent={"center"} >
                <Button onClick={() => {
                    setIsPrint(true)
                    handlePrintGlboal()
                }}>Print {costumersList?.length} Card(s)  </Button>
            </Flex>
            <div ref={globalRef}>
                {costumersList && costumersList.map((c:any) => {
            return clientComponent(c)
        })}
            </div>
      </AdminLayout>
    )
}
        