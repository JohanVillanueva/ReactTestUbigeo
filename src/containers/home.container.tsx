import React, { useState } from 'react';
import FileUpload from '../components/file-upload.component';
import UbigeoContext, { initialValues } from '../store/index.store';
import Table from '../components/table.component';
import { UbigeoDictionary } from '../types/index';


const { Provider } = UbigeoContext;

export const Home = () => {

    const [state, setState] = useState({
        ...initialValues,
        handleDataChange: (departments: UbigeoDictionary, provinces: UbigeoDictionary, districts: UbigeoDictionary) => {
            setState({
                ...state,
                departments,
                provinces,
                districts
            })
        }
    })

    const { departments, provinces, districts, currentUbigeoSelected } = state;
    return (
        <Provider value={state}>
            <div className="ubigeo-container">
                <h2>ReactTest</h2>
                <h3>Ubigeo</h3>
                <FileUpload />
                
                { departments && <Table title="Departamentos" rows={departments}/> }
                { provinces && <Table title="Provincias" rows={provinces}/> }
                { districts && <Table title="Distritos" rows={districts}/> }
            </div>
        </Provider>
    )
}
export default Home;