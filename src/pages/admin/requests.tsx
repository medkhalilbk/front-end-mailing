


export function getToken(): any {
    if (typeof (window) !== "undefined") {
        return {
            acessToken: window.localStorage.getItem('tokenAccess'), 
            refreshToken  : window.localStorage.getItem('tokenRefresh')
      }
  }
   return null
}

export const axiosConfig = {
    headers: { Authorization: `Bearer ${getToken()?.acessToken}` }
};