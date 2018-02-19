import axios from 'axios';
import { GET_ALL_ARTICLES } from './types';

const apiUrl = 'api/v1/articles/';
export function getAllArticles() {
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((response) => {
        dispatch({
          type: GET_ALL_ARTICLES,
          allArticles: response.data
        });
      })
			.catch(error => Promise.reject(error.response.data.message));
  };
}

export default getAllArticles;
