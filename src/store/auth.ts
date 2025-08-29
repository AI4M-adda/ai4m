import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  user: object | null;
  token: string | null;
}

const initialState: IAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setUserSlice: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    setTokenSlice: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setTokenSlice, setUserSlice } = authSlice.actions;
export default authSlice.reducer;
