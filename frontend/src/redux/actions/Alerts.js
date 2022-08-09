export const createErrorAlert = (message) => (dispatch) => {
  dispatch({
    type: "CREATE_ERROR_ALERT",
    payload: { type: "error", message }
  });
};

export const createMessageAlert = (message) => (dispatch) => {
  dispatch({
    type: "CREATE_SUCCESS_ALERT",
    payload: { type: "success", message },
  });
};