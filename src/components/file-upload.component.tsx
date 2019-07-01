import React, { useContext } from 'react';
import UbigeoContext from '../store/index.store';
import { convertDataInStructures } from '../services/ubigeo.service';

const FileUpload = () => {
    let fileReader:FileReader = null;
    const {handleDataChange} = useContext(UbigeoContext);

    const isPlainTextFile = (file : File):boolean => {
        const type = file.type;
        return type==='text/plain';
    }

    const handleFileChange = (file:File) => {
        if(file && isPlainTextFile(file)) {
            fileReader = new FileReader();
            fileReader.onloadend = () => {
                convertDataInStructures(fileReader.result.toString())
                .subscribe(ubigeoDataArray=>{
                    handleDataChange(...ubigeoDataArray);
                })
            };
            fileReader.readAsText(file);
        } else{
            alert('Solo se aceptar archivos de texto plano');
        }
    }

    return (
        <div>
            <fieldset >
                <input type="file" accept=".txt"
                    onChange={(e) => handleFileChange(e.target.files[0])} />
            </fieldset>
            <br/>
        </div>      
    );
}
    
export default FileUpload;
    
    