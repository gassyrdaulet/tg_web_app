import axios from "axios";
const serverURL = "https://jackmarket.kz:2222";

export const getAllPrices = async (fromId) => {
  const { data } = await axios.post(serverURL, {
    fromId,
  });
  return data;
};
