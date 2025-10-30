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
