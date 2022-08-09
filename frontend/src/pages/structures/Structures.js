import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import Structure from "../../components/Structure";
import { getStructures } from "../../redux/actions/Structure";

import { defaultPath } from "../../App";

const StructuresPage = () => {
  const structures = useSelector(({ structures }) => structures.data)
  const isLoading = useSelector(({ structures }) => structures.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStructures())
  }, [])

  return (
    <div>
      <h2 className="align-middle">Список структур</h2>
      {!isLoading && (
        <>
          <table className="table align-middle">
            <thead>
              <tr className="table-tr">
                <th>ID</th>
                <th>Название</th>
                <th>Операции</th>
              </tr>
            </thead>

            <tbody>
              {structures.map((structure) => (
                <Structure key={structure.id} structure={structure} />
              ))}
            </tbody>
          </table>
        </>
      )}

      <Link to={`${defaultPath}/add`}>
        <button className="add-link">
          Добавить структуру
        </button>
      </Link>
    </div>
  );
};

export default StructuresPage;