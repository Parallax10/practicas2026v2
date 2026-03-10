import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface FavState{
    items:any[]
}
const initialState:FavState={
    items:[]
}

export const favSlice=createSlice({
    name:"favorites",
    initialState,
    reducers:{
        toggleFavorite:(state,action:PayloadAction<any>)=>{
            const product=action.payload
            const exists=state.items.find(item=>item.url===product.url)
            if(exists){
                state.items=state.items.filter(item=>item.url!== product.url)
            }else{
                state.items.push(product)
            }
        }
    }
})
export const { toggleFavorite } = favSlice.actions;
export default favSlice.reducer;