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