import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEAPI_BASE_URL,
});
