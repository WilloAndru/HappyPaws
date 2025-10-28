import axios from "axios";

export const validateEmail = async (email: string) => {
  try {
    const res = await axios.get("/api/users", {
      params: { email },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export type UserData = {
  email: string;
  name?: string | null;
  image?: string | null;
  firebaseUid: string;
};
// Hook para crear o devolver credenciales de un correo por google o github
export const syncUser = async (data: UserData) => {
  try {
    const res = await axios.post("/api/users", data);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
