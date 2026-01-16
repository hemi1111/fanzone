import axios from "axios";

export const sendMail = async (
  name: string,
  email: string,
  message: string
): Promise<any> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/mail/contact`,
    {
      name,
      email,
      message,
    }
  );
  return response.data;
};
