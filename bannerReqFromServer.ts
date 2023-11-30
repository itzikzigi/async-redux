import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BannerInterface } from "../interface/BannerInterface";

const URL = `${import.meta.env.VITE_BASE_URL}/api/banners`;

export const getBannersReq = createAsyncThunk(
  "banners/getBannersReq",
  async (_, thunkAPI) => {
    try {
      const { data: banner } = await axios.get(URL);
      return banner;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addBannerReq = createAsyncThunk(
  "banners/addBannerReq",
  async (newBanner: Partial<BannerInterface>, thunkAPI) => {
    try {
      const { data: banner } = await axios.post(URL, newBanner);
      return banner;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyBannersReq = createAsyncThunk(
  "banners/getMyBannersReq",
  async (_, thunkAPI) => {
    try {
      const { data: banner } = await axios.get(`${URL}/myBanners/`);
      return banner;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBannerByIdReq = createAsyncThunk(
  "banners/getBannerByIdReq",
  async (id: string, thunkAPI) => {
    try {
      const { data: banner } = await axios.get(`${URL}/${id}`);
      if (banner.length) return banner[0];
      return banner;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editBannerReq = createAsyncThunk(
  "banners/editBannerReq",
  async (editedBanner: BannerInterface, thunkAPI) => {
    try {
      const { _id } = editedBanner;
      const { data: banner } = await axios.put(`${URL}/${_id}`);
      return banner;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBannerReq = createAsyncThunk(
  "banners/editBannerReq",
  async (bannerId: string, thunkAPI) => {
    try {
      const { data: banner } = await axios.delete(`${URL}/${bannerId}`);
      return banner;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUnbannerdProducts = createAsyncThunk(
  "banners/getUnbannerdProducts",
  async (_, thunkAPI) => {
    try {
      const { data: products } = await axios.get(`${URL}/products`);
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
