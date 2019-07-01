import React from "react";

export const initialValues:any = {
    departments: null,
    provinces: null,
    districts: null,
    currentUbigeoSelected: {
        departament: '',
        province: '',
        district: ''
    },
    handleDataChange:null
}
const UbigeoContext = React.createContext(null);

export default UbigeoContext;