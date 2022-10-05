import axios from "axios";
const serverURL = "http://jackmarket.kz:2000";

export const getAllPrices = async (fromId) => {
  const { data } = await axios.post(serverURL, {
    fromId,
  });
  return data;
};
