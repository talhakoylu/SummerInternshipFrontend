export const SET_USER = "SET_USER";
export const SET_FETCHING = "SET_FETCHING";
export const SET_LOADING = 'SET_LOADING';
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_LEVELS = "SET_LEVELS";
export const SET_BOOK_LANGUAGES = "SET_BOOK_LANGUAGES";

//Actions were declared in this file. 

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};

export const setFetching = (payload) => {
  return {
    type: SET_FETCHING,
    payload,
  };
};

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  };
};


export const setLanguage = (payload) => {
  return {
    type: SET_LANGUAGE,
    payload,
  };
};

export const setCategories = (payload) => {
  return {
    type: SET_CATEGORIES,
    payload,
  };
};

export const setLevels = (payload) => {
  return {
    type: SET_LEVELS,
    payload,
  };
};

export const setBookLanguages = (payload) => {
  return {
    type: SET_BOOK_LANGUAGES,
    payload,
  };
};