import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'

import { addRecord } from "../../redux/actions/Records";
import JSONModifyBase from "../../components/JSONModifyBase";

const RecordAddPage = () => {
  const { structureId } = useParams()
  const dispatch = useDispatch()

  const onAddRecord = (data) => {
    dispatch(addRecord(structureId, data))
  }

  return (
    <JSONModifyBase saveAction={onAddRecord} />
  )
};

export default RecordAddPage;