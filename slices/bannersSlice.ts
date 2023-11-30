import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { BannerInterface } from "./interface/BannerInterface";
import {
  getBannersReq,
  addBannerReq,
  getMyBannersReq,
  getBannerByIdReq,
  deleteBannerReq,
  getUnbannerdProducts,
} from "./service/bannerReqFromServer";
import { ProductInterface } from "./interface/ProductInterface";

interface InitialState {
  pending: boolean;
  bannersState: BannerInterface[] | null;
  specificBanner: BannerInterface | null;
  products: ProductInterface[] | null;
  error: string | SerializedError;
}

const initialState: InitialState = {
  pending: false,
  bannersState: null,
  specificBanner: null,
  products: null,
  error: "",
};

export const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<BannerInterface[]>) => {
      state.bannersState = action.payload;
      return state;
    },
    setSpecificBanner: (state, action) => {
      state.specificBanner = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBannersReq.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(
      getBannersReq.fulfilled,
      (state, payload: PayloadAction<BannerInterface[]>) => {
        state.pending = false;
        state.bannersState = payload.payload;
        state.error = "";
        return state;
      }
    );
    builder.addCase(getBannersReq.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.error;
      return state;
    });
    builder.addCase(addBannerReq.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(
      addBannerReq.fulfilled,
      (state, payload: PayloadAction<BannerInterface[]>) => {
        state.pending = false;
        state.bannersState?.push(payload.payload[0]);
        state.error = "";
        return state;
      }
    );
    builder.addCase(addBannerReq.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.error;
      return state;
    });

    builder.addCase(getMyBannersReq.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(
      getMyBannersReq.fulfilled,
      (state, payload: PayloadAction<BannerInterface[]>) => {
        state.pending = false;
        state.bannersState = payload.payload;
        state.error = "";
        return state;
      }
    );
    builder.addCase(getMyBannersReq.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.error;
      return state;
    });
    builder.addCase(getBannerByIdReq.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(
      getBannerByIdReq.fulfilled,
      (state, { payload }: PayloadAction<BannerInterface>) => {
        state.pending = false;
        state.specificBanner = payload;
        state.error = "";
        return state;
      }
    );
    builder.addCase(getBannerByIdReq.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.error;
      return state;
    });
    builder.addCase(deleteBannerReq.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(deleteBannerReq.fulfilled, (state) => {
      state.pending = false;
      state.error = "";
      return state;
    });
    builder.addCase(deleteBannerReq.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.error;
      return state;
    });
    builder.addCase(getUnbannerdProducts.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getUnbannerdProducts.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.products = payload;
      state.error = "";
      return state;
    });
    builder.addCase(getUnbannerdProducts.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.error;
      return state;
    });
  },
});
export const { setBanners, setSpecificBanner } = bannersSlice.actions;
export default bannersSlice.reducer;
