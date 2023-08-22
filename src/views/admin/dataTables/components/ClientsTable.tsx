import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext'; 
import { Button } from 'primereact/button';  
import { Tag } from 'primereact/tag';
import { CustomerService } from './service/CustomerService';
import { Checkbox, Flex, Stack } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { updateCostumersListAction } from 'redux/costumerSlice';
import { deleteClient, updateClient } from 'pages/admin/requests';
interface Representative {
  name: string;
  image: string;
}

interface Customer {
  id:String | null , 
  company: String,
  fullName: String,
  email: String,
  number: String,
  country: String,
  sector: String,
  date: Date | String
  userId: String
} 

export default function CustomersDemo() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const dispatch = useDispatch() 
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        country: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email:  { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        number:  { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        sector:{ operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [representatives] = useState<Representative[]>([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);
    const [statuses] = useState<string[]>(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status: string) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    useEffect(() => {
        dispatch(updateCostumersListAction(null))
        CustomerService.getCustomersLarge().then((data: any[]) => setCustomers(getCustomers(data))).catch((err) =>
        {
              Swal.fire({
                icon: 'error', title: "You have to reconnect!", allowOutsideClick: false,
            showCloseButton: false, text: err.message
        }).then(() => {
       window.localStorage.clear();
       Router.push('/auth');
  })
        });
    
    }, []); 

    useEffect(() => {
    dispatch(updateCostumersListAction(selectedCustomers))
    }, [selectedCustomers])
    
    const getCustomers = (data: Customer[]) => {
        return [...(data || [])].map((d) => {
            if (typeof d.date =="string") {
                d.date = new Date(d.date)
            };

            return d;
        });
    };

    const formatDate = (value: string | Date) => {
        return new Date(value).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

  

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <h4 className="m-0">Customers</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
 
 

    const representativesItemTemplate = (option: Representative) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
                <span>{option.name}</span>
            </div>
        );
    };

    

    const statusItemTemplate = (option: string) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };
 

    const actionBodyTemplate = (costumer: Customer) => {
        return <Flex style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "baseline" }}><Button onClick={() => {
            Router.push('/admin/sendMail')
            dispatch(updateCostumersListAction([costumer]))
        }} type="button" icon="pi pi-envelope " rounded></Button><Button onClick={() =>  {Swal.fire({
  title: 'Client detail',
  html: `<b>Company</b> <input type="text" id="company" value="${costumer.company}" class="swal2-input"> <br> <b>Full Name</b> <input type="text" id="fName" value="${costumer.fullName}" class="swal2-input"> <br> <b>Email Add</b> <input type="text" id="email" value="${costumer.email}" class="swal2-input" style='fontSize:10px!important;'> <b>Phone Nbr</b> <input type="text" id="phone" value="${costumer.number}" class="swal2-input"> <b>Company</b> <input type="text" id="country" value="${costumer.country}" class="swal2-input"> <b> Activity</b> <input type="text" id="sector" value="${costumer.sector}" class="swal2-input">`,
  confirmButtonText: 'Edit',
  focusConfirm: false,
            preConfirm: () => {
    const id = costumer.id
    const company = Swal.getPopup().querySelector('#company').value
    const fullName = Swal.getPopup().querySelector('#fName').value 
    const email = Swal.getPopup().querySelector('#email').value 
    const number = Swal.getPopup().querySelector('#phone').value 
    const country = Swal.getPopup().querySelector('#country').value 
    const sector = Swal.getPopup().querySelector('#sector').value 
    
    return {id,company,fullName,email,number,country,sector}
  }
        }).then( async (result:any) => {
           try {
             if (result.value) {
            const  {id,company,fullName,email,number,country,sector} = result.value
            let updatedCostumer = { id: id, company: company, fullName: fullName, email: email, number: number, country: country, sector: sector }
            const request = await updateClient(updatedCostumer)   
            window.location.reload()
           } 
          } catch (error:any) {
             Swal.fire(`
    error: ${error.message}` )
           } 
 
})}} type="button" style={{ backgroundColor: "orange", borderColor: "orange" }} icon="pi pi-user-edit" rounded></Button><Button onClick={() => Swal.fire({ title: "Are you sure to delete?", html: "<b> Company : </b>" + costumer.company + "<br> <b> Full Name : </b>" + costumer.fullName + "<br> <b> Email : </b> " + costumer.email, confirmButtonText: 'Yes, delete it!', showCancelButton: true }).then(async(result) => {
  if (result.isConfirmed) {
    try {
    const del = await deleteClient(costumer.id)
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    ).then((res) => {
        window.location.reload()
    })
    } catch (error:any) {
           Swal.fire(
       error.message,
      'Delete action has been suspended.',
      'error'
    )
    }
  }
})} type="button" style={{backgroundColor:"red" , borderColor:"red"}} icon="pi pi-trash" rounded></Button></Flex>;
    };

    const header = renderHeader(); 
        const actionCheck = (costumer: Customer) => {
            return <Checkbox onChange={(e) => {
                if (e.target.checked) {
                setSelectedCustomers([...selectedCustomers, costumer]);
                }
                else {
                    const updatedCustomers = selectedCustomers.filter(existingCustomer => existingCustomer !== costumer);
                    setSelectedCustomers(updatedCustomers);
                 }
            
        }} /> ;
    }; 
    return (
     
        <Flex style={{ flexDirection: "column" }}>
            <Stack style={{  flexDirection:"row", flex:2 , height:50 }} > 
                <Button onClick={() => Router.push('/admin/addClient')} style={{ backgroundColor: "green", border:"none" , height:50}}>Add client</Button>
                {selectedCustomers.length && <Button onClick={() => Router.push('/admin/sendMail')} style={{ backgroundColor: "#422AFB" , height:50, marginLeft:15 ,marginTop:0  }}>Multiple Emails</Button>}
            </Stack>
         <DataTable value={customers} paginator header={header} rows={8}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id"  
                    filters={filters} filterDisplay="menu" globalFilterFields={['company', 'fullName', 'email', 'country', 'sector', 'date']}
                    emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                 <Column field="id"  headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionCheck} />
                <Column field="company" header="Company" sortable filter filterPlaceholder="Search by company" style={{ minWidth: '14rem' }} />
                <Column field="fullName" header="Full Name" sortable filterField="fullName" style={{ minWidth: '14rem' }}    filterPlaceholder="Search by country" />
                <Column header="Email" field='email' sortable sortField="email" filterField="email"  filterMenuStyle={{ width: '14rem' }}
                style={{ minWidth: '14rem' }}  filter  />
                <Column field="number"  header="Phone Number" sortable filterField="phone"   style={{ minWidth: '12rem' }}    />
                <Column field="country" header="Country" sortable style={{ minWidth: '12rem' }}  filter />
                <Column field="sector" header="Sector" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}    />
                <Column field="id" header="Actions" headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                 
                                    
            </DataTable>
           </Flex>
    );
}