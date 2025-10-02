import api from "./api";

export const getOffers = async () => {
  const res = await api.get("/getOffers");
  return res.data;
};
