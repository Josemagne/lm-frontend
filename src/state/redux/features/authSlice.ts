import {
  createSelector,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit"
import { LM_User } from "../../../types/auth/user"
import { RootState } from "../store"

interface InitialAuthState {
  token: string | null
  isLoggedIn: boolean
}

const initialState: InitialAuthState = {
  token: null,
  isLoggedIn: false,
}

export const authSlice: Slice<InitialAuthState> = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleIsLoggedIn: (
      state: InitialAuthState,
      action: PayloadAction<void>
    ) => {
      state.isLoggedIn = !state.isLoggedIn
    },
  },
})

const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const isLoggedInSelector = createSelector(
  selectIsLoggedIn,
  (isLoggedIn) => isLoggedIn
)

export const { toggleIsLoggedIn } = authSlice.actions

export default authSlice.reducer
