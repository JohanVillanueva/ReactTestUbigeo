import React, { useState } from 'react';
import FileUpload from '../components/file-upload.component';
import UbigeoContext from '../store/index.store';
import Table from '../components/table.component';
import { UbigeoDictionary, HomeStateData } from '../types/index.types';


const { Provider } = UbigeoContext;


export const Home = () => {

    const [stateData, setStateData] = useState<HomeStateData>({
        departments:null,
        districts:null,
        provinces:null
    });

    const [currentUbigeo, setCurrentUbigeo] = useState({
        department: '',
        province: '',
        district: ''
    })

    const handleCurrentUbigeoChange = (selectedUbigeoItem:any) => {
        setCurrentUbigeo({
            ...currentUbigeo,
            ...selectedUbigeoItem
        });
    }

    const handleDataChange = (departments: UbigeoDictionary, provinces: UbigeoDictionary, districts: UbigeoDictionary) => {
        setStateData({
            ...stateData,
            departments,
            provinces,
            districts
        });
    }

    const { departments, provinces, districts } = stateData;
    return (
        <Provider value={{currentUbigeo, handleCurrentUbigeoChange, handleDataChange}}>
            <div className="ubigeo-container">
                <h2>ReactTest</h2>
                <FileUpload />
                
                { departments && <Table title="Departamentos" rows={departments} type="department" parent="" /> }
                { provinces && <Table title="Provincias" rows={provinces} type="province" parent="department"/> }
                { districts && <Table title="Distritos" rows={districts} type="district" parent="province"/> }
            </div>
        </Provider>
    )
}
export default Home;