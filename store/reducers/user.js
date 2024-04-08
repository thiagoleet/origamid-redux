export const USER_FETCH_STARTED = "user/FETCH_STARTED";
export const USER_FETCH_SUCCESS = "user/FETCH_SUCCESS";
export const USER_FETCH_ERROR = "user/FETCH_ERROR";

const userFetchStarted = () => ({ type: USER_FETCH_STARTED });
const userFetchSuccess = (payload) => ({
  type: USER_FETCH_SUCCESS,
  payload,
});
const userFetchError = (payload) => ({ type: USER_FETCH_ERROR, payload });

export const userFetch = (token) => async (dispatch) => {
  try {
    dispatch(userFetchStarted());
    const response = await fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    dispatch(userFetchSuccess(data));
  } catch (error) {
    dispatch(userFetchError(error.message));
  }
};

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function token(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH_STARTED:
      return { data: null, error: null, loading: true };
    case USER_FETCH_SUCCESS:
      return { data: action.payload, error: null, loading: false };
    case USER_FETCH_ERROR:
      return { data: null, error: action.payload, loading: false };
    default:
      return state;
  }
}

export default token;
