import React from "react";
import { useDispatch } from "react-redux";

import { addStructure } from "../../redux/actions/Structure";

import JSONModifyBase from "../../components/JSONModifyBase";

const StructureAddPage = () => {
  const dispatch = useDispatch()

  const onAddStructure = (data) => {
    dispatch(addStructure(data))
  }

  return (
    <JSONModifyBase saveAction={onAddStructure} />
  )
};

export default StructureAddPage;