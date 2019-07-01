import React, { useContext } from 'react'
import { UbigeoDictionary } from '../types/index.types';
import UbigeoContext from '../store/index.store';

interface PropsTypes {
  rows: UbigeoDictionary,
  title: string,
  type:string,
  parent:string
}
export const Table = ({rows, title, type, parent}:PropsTypes) => {

  const {currentUbigeo, handleCurrentUbigeoChange} = useContext(UbigeoContext);

  const getFilteredData = (data:UbigeoDictionary) => {
    let parentCode = currentUbigeo[parent]
    let filtered:UbigeoDictionary = {};

    Object.keys(data).map((key:string)=> (
      data[key].parentCode === parentCode ? filtered[key] = data[key] : null
    ));

    return filtered
  }
  
  const addSelectedClass = (code:string) => (
    code===currentUbigeo[type] ? 'selected':''
  )

  const toogleUbigeoItemSelected = (ubigeoCode:string) => {
    let newUbigeoSelected:any = {};

    newUbigeoSelected[type] = currentUbigeo[type]=== ubigeoCode ? '' : ubigeoCode;

    if(type==='department') newUbigeoSelected['province']='';
    if(type!=='district') newUbigeoSelected['district']='';

    handleCurrentUbigeoChange(newUbigeoSelected)
  }

  const getRows = (data:UbigeoDictionary) => {
    let filteredData:UbigeoDictionary = (parent && currentUbigeo[parent]) ? getFilteredData(data) : data;
    if (filteredData)
      return Object.keys(filteredData).map((key:string) => filteredData[key] &&
            <tr className={`row-item ${addSelectedClass(filteredData[key].code)}`} key={key} 
            onClick={()=>toogleUbigeoItemSelected(filteredData[key].code)}
            >
              <td>{filteredData[key].code}</td>
              <td>{filteredData[key].name}</td>
              <td>{filteredData[key].parentCode || '-'}</td>
              <td>{filteredData[key].parentDescription || '-'}</td>
            </tr> 
        );
    else return (<tr>
      <td> No existe data </td></tr>);
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
        <tbody>
        {
          getRows(rows)
        }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
