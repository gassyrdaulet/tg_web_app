import axios from "axios";
const serverURL = "https://jackmarket.kz:2222/api";

export const getPriceById = async (fromId, id) => {
  const { data } = await axios.get(serverURL + "/price/" + id, {
    params: {
      fromId,
    },
  });
  return data[0];
};

export const newPrice = async (fromId, data, queryId) => {
  await axios.post(serverURL + "/new", {
    fromId,
    queryId,
    data,
  });
};

export const editPrice = async (fromId, data, queryId) => {
  await axios.post(serverURL + "/edit", {
    fromId,
    queryId,
    data,
  });
};

export const deletePrice = async (fromId, data, queryId) => {
  await axios.post(serverURL + "/delete", {
    fromId,
    queryId,
    data,
  });
};

export const deactivatePrice = async (fromId, data, queryId) => {
  await axios.post(serverURL + "/deactivate", {
    fromId,
    queryId,
    data,
  });
};

export const activatePrice = async (fromId, data, queryId) => {
  await axios.post(serverURL + "/activate", {
    fromId,
    queryId,
    data,
  });
};

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

export const getStoreId = async (fromId) => {
  const { data } = await axios.get(serverURL + "/store", {
    params: {
      fromId,
    },
  });
  return data;
};

export const newUser = async (fromId, data, queryId) => {
  await axios.post(serverURL + "/auth/registration", {
    fromId,
    queryId,
    data,
  });
};
