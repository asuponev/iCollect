import axios from '../myAxios';
import urls from '../constants/urlsApi';

export const authApi = async (typeAuth, values) => {
  try {
    const { data } = await axios.post(
      typeAuth === 'register' ? urls.REGISTER : urls.LOGIN,
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const checkAuth = async () => {
  try {
    const { data } = await axios.get(urls.AUTH);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getOneUser = async (id) => {
  try {
    const { data } = await axios.get(`${urls.USERS}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getUsers = async () => {
  try {
    const { data } = await axios.get(urls.USERS);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const updateUsers = async (usersWithAction) => {
  try {
    const { data } = await axios.patch(urls.USERS, usersWithAction);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const createCollection = async (values) => {
  try {
    const { data } = await axios.post(
      '/collections',
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const updateCollection = async (collectionId, values) => {
  try {
    const { data } = await axios.patch(
      `/collections/${collectionId}`,
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getAllCollectionsUser = async (id) => {
  try {
    const { data } = await axios.get(`${urls.USERS}/${id}/collections`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

export const getOneCollection = async (collectionId) => {
  try {
    const { data } = await axios.get(`collections/${collectionId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}