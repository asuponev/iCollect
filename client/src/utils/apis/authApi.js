import axios from '../myAxios';
import urls from '../urls';

export const authApi = (typeAuth, data) => {
  return axios.post(
    typeAuth === 'register' ? urls.REGISTER : urls.LOGIN,
    data,
    { withCredentials: true }
  )
}