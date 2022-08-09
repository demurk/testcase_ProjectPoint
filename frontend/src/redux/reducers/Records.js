const initialState = {
  data: [],
  isLoading: false,
  active: null,
};

const records = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "GET_RECORDS": {
      return {
        ...state,
        data,
        isLoading: false,
        active: null
      };
    }

    case "GET_RECORD": {
      return {
        ...state,
        active: data,
      };
    }

    case "DELETE_RECORD": {
      const newRecords = state.data.filter(function (el) {
        return el.id !== data.id;
      });

      return { ...state, data: newRecords };
    }

    case "RECORDS_SET_LOADING": {
      return {
        ...state,
        isLoading: data,
      };
    }

    default:
      return state;
  }
};

export default records;