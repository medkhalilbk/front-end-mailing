import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
 

const initialState: any = {
    informations:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.informations = null
    },
    loginAction: (state, action: PayloadAction<any>) => {
        state.informations = action.payload 
    },
  },
})
 
export const { logoutAction, loginAction } = userSlice.actions

export default userSlice.reducer