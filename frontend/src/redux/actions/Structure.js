import axios from "axios";

import proxy from "../../lib/Proxy";
import { createMessageAlert, createErrorAlert } from "./Alerts";

const DEFAULT_PATH = '/app/structures'

export const getStructures = (setLoading = true) => (dispatch) => {
  if (setLoading) {
    dispatch({ type: "STRUCTURES_SET_LOADING", payload: true });
  }

  axios
    .get(proxy(DEFAULT_PATH))
    .then(({ data }) => {
      dispatch({
        type: "GET_STRUCTURES",
        payload: data,
      });
    });
};

export const getStructure = (structureId) => (dispatch) => {
  axios
    .get(proxy(`${DEFAULT_PATH}/${structureId}`))
    .then(({ data }) => {
      dispatch({
        type: "GET_STRUCTURE",
        payload: data,
      });
    });
};

export const addStructure = (data) => (dispatch) => {
  axios
    .post(proxy(DEFAULT_PATH), data)
    .then(() => dispatch(createMessageAlert("Structure was added successfully!")))
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const editStructure = (structureId, data) => (dispatch) => {
  axios
    .put(proxy(DEFAULT_PATH), {data, structureId} )
    .then(() => dispatch(createMessageAlert("Structure was edited successfully!")))
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const deleteStructure = (structure_id) => (dispatch) => {
  axios
    .delete(proxy(DEFAULT_PATH), { data: { "id": structure_id } })
    .then((res) => {
      dispatch({ type: "DELETE_STRUCTURE", payload: res.data });
      dispatch(createMessageAlert("Structure was deleted successfully!"));
    })
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};