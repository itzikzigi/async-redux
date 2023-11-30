import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  getToken,
  getUser,
  removeToken,
  setItem,
} from "./service/localStorageService";
import { UserInterface } from "./interfaces/userInterface";
import {
  LoginInterface,
  SignUpInterface,
} from "./interfaces/userSliceInterfaces";

interface InitialStateInterface {
  loading: boolean;
  userState: UserInterface | null;
  token: string | null;
  error: string | SerializedError;
}
const initialState: InitialStateInterface = {
  error: "",
  loading: false,
  token: getToken(),
  userState: getUser(),
};

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://banner-service-back.onrender.com:";

export const loginReq = createAsyncThunk(
  "user/loginReq",
  async (userFromClient: LoginInterface, thunkAPI) => {
    try {
      const { data: token } = await axios.post(
        `${BASE_URL}/api/users/login`,
        userFromClient
      );
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const signUpReq = createAsyncThunk(
  "user/signUpReq",
  async (userFromClient: SignUpInterface, thunkAPI) => {
    try {
      const { data: user } = await axios.post(
        `${BASE_URL}/api/users/sign-up`,
        userFromClient
      );
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const deleteUserReq = createAsyncThunk(
  "user/deleteUserReq",
  async (_, thunkAPI) => {
    try {
      const { data: deletedUser } = await axios.delete(`${BASE_URL}/api/users`);
      return deletedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getUserReq = createAsyncThunk(
  "user/getUserReq",
  async (_, thunkAPI) => {
    try {
      const { data: user } = await axios.get(BASE_URL);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);
export const editUserReq = createAsyncThunk(
  "user/editUserReq",
  async (editedUser: Partial<UserInterface>, thunkAPI) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/users`, editedUser);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userState = null;
      state.token = null;
      removeToken();
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginReq.pending, (state) => {
      state.loading = true;
      return state;
    }),
      builder.addCase(loginReq.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = "";
        if (payload) {
          state.token = payload;
          setItem("token", payload);
          state.userState = getUser();
        }
        return state;
      }),
      builder.addCase(loginReq.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error;
        return state;
      });
    builder.addCase(signUpReq.pending, (state) => {
      state.loading = true;
      return state;
    }),
      builder.addCase(signUpReq.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        return state;
      }),
      builder.addCase(signUpReq.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload.error;
        return state;
      });
    builder.addCase(deleteUserReq.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserReq.fulfilled, (state) => {
      removeToken();
      state.token = null;
      state.userState = null;
      return state;
    });
    builder.addCase(deleteUserReq.rejected, (state, payload) => {
      state.error = payload.error;
      return state;
    });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
