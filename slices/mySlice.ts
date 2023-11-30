import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
interface MyStateInterface {
  key: string;
  value: number;
}

interface InitialStateInterface {
  pending: boolean;
  myState: MyStateInterface | null;
  error: string | SerializedError;
}
const initialState: InitialStateInterface = {
  pending: false,
  myState: null,
  error: "",
};

const BASE_URL = "example.com";

export const myFnWithArg = createAsyncThunk(
  "mySlice/myFnWithArg",
  async (myStateFromClient: MyStateInterface, thunkAPI) => {
    try {
      const { data } = await axios.post(BASE_URL, myStateFromClient);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const myFnWithoutArg = createAsyncThunk(
  "mySlice/myFnWithoutArg",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(BASE_URL);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    iDoNothing: (state, action) => {
      state.myState = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(myFnWithArg.pending, (state) => {
      state.pending = true;
      return state;
    }),
      builder.addCase(myFnWithArg.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.error = "";
        if (payload) {
          state.myState = payload;
        }
        return state;
      }),
      builder.addCase(myFnWithArg.rejected, (state, { error }) => {
        state.pending = false;
        state.error = error;
        return state;
      });
    builder.addCase(myFnWithoutArg.pending, (state) => {
      state.pending = true;
      return state;
    }),
      builder.addCase(myFnWithoutArg.fulfilled, (state) => {
        state.pending = false;
        state.error = "";
        return state;
      }),
      builder.addCase(myFnWithoutArg.rejected, (state, payload) => {
        state.pending = false;
        state.error = payload.error;
        return state;
      });
  },
});

export const { iDoNothing } = mySlice.actions;
export default mySlice.reducer;
