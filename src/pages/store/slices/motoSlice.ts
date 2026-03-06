import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { act } from 'react';

export const fetchMotos = createAsyncThunk(
    'motos/fetchAll',
    async () => {
    const response = await fetch("/api/motos");
    if (!response.ok) throw new Error('Error ');
    return await response.json(); 
    }
);

interface MotoState {
    items: any[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    template:string;
}

const initialState: MotoState = {
    items: [],
    status: 'idle',
    error: null,
    template:""
};

export const motoSlice = createSlice({
    name: 'motos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchMotos.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(fetchMotos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.data;
        state.template=action.payload.template;
        })
        .addCase(fetchMotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Algo salió mal';
        });
    },
});
export const selectMotoByUrl = (state: RootState, url: any) => {
    if (!url)  return null; 
    return state.motos.items.find((m) => m.url === url);
};
export default motoSlice.reducer;