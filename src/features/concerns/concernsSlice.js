import {createSlice,createAsyncThunk}from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchConcerns = createAsyncThunk('concerns/fetchConcerns',
    async()=>{
    const response=await axios.get('https://bee-minimal-api.onrender.com/concerns');
    return response.data;
})

const concernsSlice=createSlice({
    name:'concerns',
    initialState:{
        concerns:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchConcerns.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchConcerns.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.concerns=action.payload;
        })
        .addCase(fetchConcerns.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
    }
})

export default concernsSlice.reducer;