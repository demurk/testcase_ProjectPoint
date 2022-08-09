import axios from "axios";

import proxy from "../../lib/Proxy";
import { createMessageAlert, createErrorAlert } from "./Alerts";

export const getRecords = (id, setLoading = true) => (dispatch) => {
  if (setLoading) {
    dispatch({ type: "RECORDS_SET_LOADING", payload: true });
  }

  axios
    .get(proxy(`/app/structures/${id}/records`))
    .then(({ data }) => {
      dispatch({
        type: "GET_RECORDS",
        payload: data,
      });
    });
};

export const getRecord = (structureId, recordId) => (dispatch) => {
  axios
    .get(proxy(`/app/structures/${structureId}/records/${recordId}`))
    .then(({ data }) => {
      dispatch({
        type: "GET_RECORD",
        payload: data,
      });
    });
};

export const addRecord = (id, data) => (dispatch) => {
  axios
    .post(proxy(`/app/structures/${id}/records`), data)
    .then(() => dispatch(createMessageAlert("Record was added successfully!")))
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const editRecord = (structureId, recordId, data) => (dispatch) => {
  axios
    .put(proxy(`/app/structures/${structureId}/records`), {data, recordId} )
    .then(() => dispatch(createMessageAlert("Record was edited successfully!")))
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};

export const deleteRecord = (structure_id, record_id) => (dispatch) => {
  axios
    .delete(proxy(`/app/structures/${structure_id}/records`), { data: { "id": record_id } })
    .then((res) => {
      dispatch({ type: "DELETE_RECORD", payload: res.data });
      dispatch(createMessageAlert("Record was deleted successfully!"));
    })
    .catch((err) => {
      dispatch(createErrorAlert(err.response.data));
    });
};