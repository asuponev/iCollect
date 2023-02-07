import axios from '../myAxios';
import urls from '../urls';

export const checkAuth = () => {
  return axios.get(urls.ACCOUNT);
}