import axios from "axios";
import { LoginRequest, User } from "@/types/auth.types";

export const loginRequest = async (data: LoginRequest) => {
  const res = await axios.post<User>("/api/login", data);

  return res.data;
};

export const logoutRequest = async () => {
  const res = await axios.post("/api/logout");
  return res;
};
