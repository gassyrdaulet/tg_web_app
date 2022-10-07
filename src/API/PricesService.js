import axios from "axios";
const serverURL = "https://jackmarket.kz:2222";

export const getAllPrices = async (fromId) => {
  const { data } = await axios.post(serverURL, {
    fromId,
  });
  return data;
};

export const getBrands = async (searchValue, fromId) => {
  const { data } = await axios.get(serverURL + "/brands", {
    params: {
      searchValue,
      fromId,
    },
  });
  return data;
};

export const getCategories = async (searchValue, fromId) => {
  const { data } = await axios.get(serverURL + "/categories", {
    params: {
      searchValue,
      fromId,
    },
  });
  return data;
};
