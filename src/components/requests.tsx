import axios from "axios";
import { store } from "../redux/store"; 

const state = store.getState() 

export function getToken(): any {
    
    if (typeof (window) !== "undefined") {
        return {
            acessToken: window.localStorage.getItem('tokenAccess'), 
            refreshToken  : window.localStorage.getItem('tokenRefresh')
        }
        

    }
    if (typeof (window) == "undefined" && state.user.informations ) {
        return {
            acessToken: state.user.informations.tokens.access.token, 
            refreshToken  : state.user.informations.tokens.refresh.token
        }
        

  }
   return null
}
export async function getAllClients(): Promise<any> {
   
 try {
     const request = await axios.get("http://164.92.110.240:3000/v1" + "/clients", axiosConfig)
     return request.data.message 
 } catch (error : any ) {
     if (error.response.status === 401) {
        throw new Error("Session expired!");
     } else {
         throw new Error("Server problem")
    }
 }
    
}


export async function sendEmail(costumers : any[], body:String): Promise<any> {
     
 try {
     const request = await axios.post("http://164.92.110.240:3000/v1" + "/sendMails",{to:costumers,mailBody:body} , axiosConfig)
     return request.data.message 
 } catch (error : any ) {
     if (error.response.status === 401) {
        throw new Error("Session expired!");
     } else {
         return error
    }
 }
    
}
export async function deleteClient(id:String): Promise<any> {
   
 try {
     const request = await axios.delete("http://164.92.110.240:3000/v1" + "/clients/"+id, axiosConfig)
     return request.data.message 
 } catch (error : any ) {
     if (error.response.status === 401) {
        throw new Error("Session expired!");
     } else {
         
         throw new Error("Server problem")
    }
 }

}


export async function updateClient(custmer:any) {
      
 try {
     const request = await axios.put("http://164.92.110.240:3000/v1" + "/clients/"+custmer.id, custmer,   axiosConfig)
     return request.data.message 
 } catch (error : any ) {
     if (error.response.status === 401) {
        throw new Error("Session expired!");
     } else {
         
         throw new Error("Server problem")
    }
 } 
}


export async function getFiles() {
try {
    return await axios.get("http://164.92.110.240:3000/v1" + "/files", axiosConfig)
   
} catch (error) {
    console.log(error)    
}
}

export async function addClientRequest(client:any) {
    try {
        const request = axios.post("http://164.92.110.240:3000/v1" + "/clients" , client , axiosConfig)
        return request
    } catch (error) {
        return error
    }
}
export const axiosConfig = {
    headers: { Authorization: `Bearer ${getToken()?.acessToken}` }
};