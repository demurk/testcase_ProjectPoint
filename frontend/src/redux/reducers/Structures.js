const initialState = {
  data: [],
  isLoading: false,
  active: null,
};

const structures = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case "GET_STRUCTURES": {
      return {
        ...state,
        data,
        isLoading: false,
        active: null
      };
    }

    case "GET_STRUCTURE": {
      return {
        ...state,
        active: data,
      };
    }

    case "DELETE_STRUCTURE": {
      const newStructures = state.data.filter(function (el) {
        return el.id !== data.id;
      });

      return { ...state, data: newStructures };
    }

    case "STRUCTURES_SET_LOADING": {
      return {
        ...state,
        isLoading: data,
      };
    }

    default:
      return state;
  }
};

export default structures;