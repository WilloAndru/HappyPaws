import api from "./api";

export const getCategories = async () => {
  const res = await api.get("/getCategories");
  return res.data;
};
