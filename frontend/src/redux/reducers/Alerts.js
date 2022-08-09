const initialState = {
  alert: {},
};

const alerts = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ERROR_ALERT":
    case "CREATE_SUCCESS_ALERT": {
      return { alert: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default alerts;