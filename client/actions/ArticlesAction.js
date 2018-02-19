import axios from 'axios';
import { GET_ALL_ARTICLES } from './types';

const apiUrl = 'api/v1/articles/';
const getAllArticles = dispatch => axios
  .get(apiUrl)
  .then((response) => {
    console.log(response, '+++++++++++++++++');
    dispatch({
      type: GET_ALL_ARTICLES,
      allArticles: response.data
    });
  })
  .catch(error => error.response);

export default getAllArticles;
