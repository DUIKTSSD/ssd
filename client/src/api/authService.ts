import api from "./api.ts";
import { UserState } from "../types/userStateTypes.ts";

export const registerUserAPI = async (userData: UserState) => {
  try {
    const response = await api.auth.register(userData);
    return response.data;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error; // Передаем ошибку для обработки в thunk
  }
};

export const loginUserAPI = async (userData: UserState) => {
  try {
    const response = await api.auth.login(userData);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};