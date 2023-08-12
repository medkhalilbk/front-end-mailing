export const CustomerService = {
    getData() {
        return [ {
    company: "Company 1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    number: "123-456-7890",
    country: "United States",
    sector: "Technology",
    date: "2023-08-10T12:34:56Z",
    userId: "user123"
  },
  {
    company: "Company 2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    number: "987-654-3210",
    country: "Canada",
    sector: "Finance",
    date: "2023-08-09T09:00:00Z",
    userId: "user456"
  },
  {
    company: "Company 1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    number: "123-456-7890",
    country: "United States",
    sector: "Technology",
    date: "2023-08-10T12:34:56Z",
    userId: "user123"
  },
  {
    company: "Company 2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    number: "987-654-3210",
    country: "Canada",
    sector: "Finance",
    date: "2023-08-09T09:00:00Z",
    userId: "user456"
  },
  {
    company: "Company 3",
    fullName: "Michael Johnson",
    email: "michael.johnson@example.com",
    number: "555-123-4567",
    country: "United Kingdom",
    sector: "Healthcare",
    date: "2023-08-08T18:15:30Z",
    userId: "user789"
            },
  {
    company: "Company 50",
    fullName: "Sara Williams",
    email: "sara.williams@example.com",
    number: "444-555-6666",
    country: "Australia",
    sector: "Education",
    date: "2023-08-07T20:45:00Z",
    userId: "user987"
  } , 
  {
    company: "Company 50",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    number: "555-555-5555",
    country: "Australia",
    sector: "Healthcare",
    date: "2023-08-08T15:30:00Z",
    userId: "user789"
  }
];  
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
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