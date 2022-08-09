import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom'

import { getRecords } from "../../redux/actions/Records";

import { defaultPath } from "../../App";
import Record from "../../components/Record"

const RecordsPage = () => {
  const { structureId } = useParams()
  const records = useSelector(({ records }) => records.data)
  const isLoading = useSelector(({ records }) => records.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecords(structureId))
  }, [])

  return (
    <div>
      <h3><Link to={defaultPath}>Вернуться к списку структур</Link></h3>
      <h2 className="align-middle">Список структур</h2>
      
      {!isLoading && (
        <>
          <table className="table align-middle">
            <thead>
              <tr className="table-tr">
                <th>ID</th>
                <th>Свойства</th>
                <th>Операции</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <Record key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </>
      )}
      <Link to={`${defaultPath}/${structureId}/records/add`}>
        <button className="add-link">
          Добавить запись
        </button>
      </Link>
    </div>
  );
};

export default RecordsPage;