import React from 'react'
import { UbigeoDictionary } from '../types/index';

interface PropsTypes {
  rows: UbigeoDictionary,
  title: string
}
export const Table = ({rows, title}:PropsTypes) => {

  const getRows = (data:UbigeoDictionary) => {
    if (data)
      return Object.keys(data).map((key:string) => (
          <tr key={key}>
            <td>{data[key].code}</td>
            <td>{data[key].name}</td>
            <td>{data[key].parentCode || '-'}</td>
            <td>{data[key].parentDescription || '-'}</td>
          </tr>
        )
      );
    else return null;
  };

  return (
    <div className="table-container">
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Código padre</th>
            <th>Descripción padre</th>
          </tr>
        </thead>
        <tbody>{getRows(rows)}</tbody>
      </table>
    </div>
  );
};

export default Table;
