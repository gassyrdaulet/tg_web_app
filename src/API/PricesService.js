import axios from "axios";
const serverURL = "//167.172.103.103:2000";

export const getAllPrices = async (fromId) => {
  const { data } = await axios.post(serverURL, {
    fromId,
  });
  return data;
};
