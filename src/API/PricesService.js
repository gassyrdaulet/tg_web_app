import axios from "axios";
const serverURL = "https://167.172.103.103:2222";

export const getAllPrices = async (fromId) => {
  const { data } = await axios.post(serverURL, {
    fromId,
  });
  fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: fromId,
  }).then((result) => {
    console.log(result);
  });
  return data;
};
