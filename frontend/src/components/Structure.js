import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

import { deleteStructure } from "../redux/actions/Structure";
import { defaultPath } from "../App";


const Structure = ({structure}) => {
  const structureId = structure.id
  
  const dispatch = useDispatch()
  const onStructureDelete = () => {
    dispatch(deleteStructure(structureId))
  }

  return (
    <tr className="record-row align-middle">
      <td>{structureId}</td>
      <td>{structure.title}</td>
      <td>
        <Link to={`${defaultPath}/${structureId}/records`}>
          <img
            src="/svg/eye.svg"
            className="svg sm-svg"
            alt="Просмотреть записи"
          />
        </Link>
        <Link to={`${defaultPath}/${structureId}/edit`}>
          <img
            src="/svg/edit.svg"
            className="svg med-svg"
            alt="Редактировать структуру"
          />
        </Link>
        <img
          src="/svg/recycle_bin.svg"
          className="svg med-svg"
          onClick={onStructureDelete}
          alt="Удалить структуру"
        />
      </td>
    </tr>
  )
};

export default Structure;