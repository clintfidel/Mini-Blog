import { GET_ALL_ARTICLES } from '../actions/types';

const initialState = {
  articles: []
};

/**
 * @description - User authentication reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
function ArticlesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return { ...state, articles: action.allArticles };
    default:
      return state;
  }
}

export default ArticlesReducer;
