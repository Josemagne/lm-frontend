import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"
import { LM_User } from "../../../types/auth/user"

interface LM_InitialState {
    user: LM_User | null;

}

const initialState: LM_InitialState = {
    user: null

}

export const bookSlice: Slice<LM_InitialState> = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

    }
})

export const { } = bookSlice;

export default bookSlice.reducer;