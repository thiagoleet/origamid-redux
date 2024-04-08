import getLocalStorage from "../util/getLocalStorage.js";

export const TOKEN_FETCH_STARTED = "token/FETCH_STARTED";
export const TOKEN_FETCH_SUCCESS = "token/FETCH_SUCCESS";
export const TOKEN_FETCH_ERROR = "token/FETCH_ERROR";

const tokenFetchStarted = () => ({ type: TOKEN_FETCH_STARTED });
const tokenFetchSuccess = (payload) => ({
  type: TOKEN_FETCH_SUCCESS,
  payload,
  localStorage: "token",
});
const tokenFetchError = (payload) => ({ type: TOKEN_FETCH_ERROR, payload });

export const tokenFetch = (user) => async (dispatch) => {
  try {
    dispatch(tokenFetchStarted());
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const { token } = await response.json();
    dispatch(tokenFetchSuccess(token));
  } catch (error) {
    dispatch(tokenFetchError(error.message));
  }
};

const initialState = {
  loading: false,
  data: getLocalStorage("token", null),
  error: null,
};

function token(state = initialState, action) {
  switch (action.type) {
    case TOKEN_FETCH_STARTED:
      return { data: null, error: null, loading: true };
    case TOKEN_FETCH_SUCCESS:
      return { data: action.payload, error: null, loading: false };
    case TOKEN_FETCH_ERROR:
      return { data: null, error: action.payload, loading: false };
    default:
      return state;
  }
}

export default token;
