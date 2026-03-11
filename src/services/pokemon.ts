import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;

export const fetchPokemon = async (name: string) => {
  const { data } = await axios.get(`${API_URL}/pokemon/${name.toLowerCase()}`);
  return data;
};

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const { data } = await axios.get(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  return data;
};

export const fetchAllPokemonNames = async () => {
  const { data } = await axios.get(`${API_URL}/pokemon?limit=20`);
  return data.results;
};

export const fetchTypeDetails = async (typeName: string) => {
  const { data } = await axios.get(`${API_URL}/type/${typeName}`);
  return data;
};

export const fetchAllTypes = async () => {
  const { data } = await axios.get(`${API_URL}/type`);
  return data.results.filter(
    (t: any) => t.name !== "shadow" && t.name !== "unknown",
  );
};
