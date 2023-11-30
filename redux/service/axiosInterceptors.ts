import axios from "axios";
import { Action, Dispatch } from "@reduxjs/toolkit";

const axiosInterceptors =
  () => (next: Dispatch<Action>) => (action: Action) => {
    const token = "your token";
    axios.defaults.headers.common["Authorization"] = token;

    return next(action);
  };

export default axiosInterceptors;
