import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

import { getStructure, editStructure } from "../../redux/actions/Structure";
import JSONModifyBase from "../../components/JSONModifyBase";

const StructureEditPage = () => {
  const { structureId } = useParams()
  const editingStructureData = useSelector(({ structures }) => structures.active)

  const dispatch = useDispatch()

  const onEditStructure = (data) => {
    dispatch(editStructure(structureId, data))
  }

  useEffect(() => {
    dispatch(getStructure(structureId))
  }, [])

  return (
    editingStructureData &&
    <JSONModifyBase
      key={editingStructureData}
      saveAction={onEditStructure}
      data={editingStructureData}
    />
  )
};

export default StructureEditPage;