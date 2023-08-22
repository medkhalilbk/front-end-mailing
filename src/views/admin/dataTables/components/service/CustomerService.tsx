import { getAllClients } from "components/requests";

export const CustomerService = {
 

 

    getCustomersLarge() {
        return Promise.resolve(getAllClients());
    },

 
/*     getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('/api/data/customers?' + queryParams).then((res) => res.json());
    } */
};