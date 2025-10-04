import api from "./api";

export const getOffers = async () => {
  const res = await api.get("/getOffers");
  return res.data;
};

export const getPopular = async () => {
  const res = await api.get("/getPopular");
  return res.data;
};

export const getFood = async () => {
  const res = await api.get("/getFood");
  return res.data;
};

export const getGromming = async () => {
  const res = await api.get("/getGromming");
  return res.data;
};
