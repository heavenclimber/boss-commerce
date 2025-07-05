import { IUserObj } from "@/services/getUsers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUserObj | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<IUserObj | null>) {
      state.user = action.payload;
    },
    clearUsername(state) {
      state.user = null;
    },
  },
});

export const { setUsername, clearUsername } = userSlice.actions;
export default userSlice.reducer;
