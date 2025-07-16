import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { message } from 'antd'
import axios from 'axios'

const initialState = {
    token: null,
    firstName: null,
    lastName: null,
    userId: null,
    userType: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action){
            state.token = null
            state.firstName = null
            state.lastName = null
            state.userId = null
            state.userType = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            const{payload} = action
                state.token = payload?.token
                state.firstName = payload?.firstName;
                state.lastName = payload?.lastName;
                state.userId = payload?.userId;
                state.userType = payload?.userType
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const login = createAsyncThunk(
    'auth/login',
    async (formData) => {
        try{
            const {data} = await axios.post("/login", formData);
            return data?.responseData;
        }
        catch(error){
            message.error("Error logging.")
        }
    }
)

export const {logout} = authSlice.actions
export default authSlice.reducer
