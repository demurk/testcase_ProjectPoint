import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

import { editRecord, getRecord } from "../../redux/actions/Records";
import JSONModifyBase from "../../components/JSONModifyBase";

const RecordEditPage = () => {
  const { structureId, recordId } = useParams()

  const editingRecordData = useSelector(({ records }) => records.active)

  const dispatch = useDispatch()
  const onEditRecord = (data) => {
    dispatch(editRecord(structureId, recordId, data))
  }

  useEffect(() => {
    dispatch(getRecord(structureId, recordId))
  }, [])

  return (
    <JSONModifyBase
      key={editingRecordData}
      saveAction={onEditRecord}
      data={editingRecordData}
    />
  )
};

export default RecordEditPage;