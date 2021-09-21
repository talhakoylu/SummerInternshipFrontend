import { SET_BOOK_LANGUAGES, SET_CATEGORIES, SET_LOADING, SET_FETCHING, SET_LANGUAGE, SET_LEVELS, SET_USER } from "../actions/auth.action";

const initialState = {
  loading: false,
  fetching: true,
  lang: "tr",
  token: null,
  user: null,
  loggedIn: false,
  categories: [],
  bookLanguages: [],
  levels: []
};

/**
 * A function created to manage and assign actions in bulk.
 * @param {*} state waiting for required state.
 * @param {*} action Retrieves the initialState line to which the payload data will be assigned.
 * @returns state of giving actions
 */

export default function authReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case SET_FETCHING:
      return { ...state, fetching: payload };
    case SET_LOADING:
      return {...state, loading: payload};
    case SET_LANGUAGE:
      return { ...state, lang: payload };
    case SET_CATEGORIES:
      return { ...state, categories: payload };
    case SET_LEVELS:
      return { ...state, levels: payload };
    case SET_BOOK_LANGUAGES:
      return {...state, bookLanguages: payload}

    default:
      return state;
  }
}
