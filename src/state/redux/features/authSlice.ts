import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"
import { LM_User } from "../../../types/auth/user"

interface LM_InitialState {
  token: string | null
}

const initialState: LM_InitialState = {
  token: null,
}

export const bookSlice: Slice<LM_InitialState> = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
})

export const {} = bookSlice

export default bookSlice.reducer
