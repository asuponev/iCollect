import axios from '../myAxios';

export const fetchLogin = async (values) => {
  try {
    const { data } = await axios.post('/auth/login',
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const fetchRegister = async (values) => {
  try {
    const { data } = await axios.post('/auth/register',
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed');
  }
}

export const fetchFirebaseLogin = async (values) => {
  try {
    const { data } = await axios.post('/auth/firebaseLogin',
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
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getOneUser = async (userId) => {
  try {
    const { data } = await axios.get(`/users/${userId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getUsers = async () => {
  try {
    const { data } = await axios.get('/users');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const updateUsers = async (usersWithAction) => {
  try {
    const { data } = await axios.patch('/users', usersWithAction);
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

export const deleteCollection = async (collectionId) => {
  try {
    const { data } = await axios.delete(`/collections/${collectionId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getAllCollectionsUser = async (userId) => {
  try {
    const { data } = await axios.get(`/users/${userId}/collections`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

export const getOneCollection = async (collectionId) => {
  try {
    const { data } = await axios.get(`/collections/${collectionId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

export const createItem = async (collectionId, values) => {
  try {
    const { data } = await axios.post(
      `/collections/${collectionId}`,
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const updateItem = async (collectionId, itemId, values) => {
  try {
    const { data } = await axios.patch(
      `/collections/${collectionId}/items/${itemId}`,
      values,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const deleteItem = async (collectionId, itemId) => {
  try {
    const { data } = await axios.delete(`/collections/${collectionId}/items/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const deleteItems = async (collectionId, items) => {
  try {
    const { data } = await axios.delete(
      `/collections/${collectionId}/items/`,
      { params: items }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getAllCollectionItems = async (collectionId) => {
  try {
    const { data } = await axios.get(`/collections/${collectionId}/items`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getItem = async (collectionId, itemId) => {
  try {
    const { data } = await axios.get(`/collections/${collectionId}/items/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const createComment = async (itemId, message) => {
  try {
    const { data } = await axios.post(
      '/comments',
      { itemId, message },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getAllItemComment = async (itemId) => {
  try {
    const { data } = await axios.get(`/comments/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const addLIke = async (itemId) => {
  try {
    const { data } = await axios.post(
      '/likes',
      { itemId },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getAllItemLikes = async (itemId) => {
  try {
    const { data } = await axios.get(`/likes/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const removeLike = async (itemId) => {
  try {
    const { data } = await axios.delete(`/likes/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getLastItems = async () => {
  try {
    const { data } = await axios.get(`/items`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getSearchItems = async (value) => {
  try {
    const { data } = await axios.get(`/search/${value}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getBiggestCollections = async () => {
  try {
    const { data } = await axios.get(`/collections`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const getAllTags = async () => {
  try {
    const { data } = await axios.get(`/tags`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}