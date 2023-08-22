import axios from "axios";
import { store } from "../redux/store"; 

const state = store.getState() 

export const apiUrl = "https://146.190.35.48/v1"

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
     const request = await axios.get(apiUrl + "/clients", axiosConfig)
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
     const request = await axios.post(apiUrl + "/sendMails",{to:costumers,mailBody:body} , axiosConfig)
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
     const request = await axios.delete(apiUrl + "/clients/"+id, axiosConfig)
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
     const request = await axios.put(apiUrl + "/clients/"+custmer.id, custmer,   axiosConfig)
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
    return await axios.get(apiUrl + "/files", axiosConfig)
   
} catch (error) {
    console.log(error)    
}
}

export async function addClientRequest(client:any) {
    try {
        const request = axios.post(apiUrl + "/clients" , client , axiosConfig)
        return request
    } catch (error) {
        return error
    }
}
export const axiosConfig = {
    headers: { Authorization: `Bearer ${getToken()?.acessToken}` }
};