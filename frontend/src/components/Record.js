import React from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom'

import { deleteRecord } from "../redux/actions/Records";
import { defaultPath } from "../App";


const Record = ({ record }) => {
  const { structureId } = useParams()

  const dispatch = useDispatch()

  const onRecordDelete = () => {
    dispatch(deleteRecord(record.structure_id, record.id))
  }

  const recordData = record.data
  return (
    <tr className="align-middle">
      <td>{record.id}</td>
      <td>
        {Object.keys(recordData).map(key =>
          <p key={key}>{recordData[key]['description']}: {recordData[key]['value']}</p>
        )}
      </td>
      <td>
        <Link to={`${defaultPath}/${structureId}/records/${record.id}/edit`}>
          <img
            src="/svg/edit.svg"
            className="svg med-svg"
            alt="Редактировать запись"
          />
        </Link>
        <img
          src="/svg/recycle_bin.svg"
          className="svg med-svg"
          onClick={onRecordDelete}
          alt="Удалить запись"
        />
      </td>
    </tr>
  )
};

export default Record;