import React, { createContext } from 'react';

let fileReader:FileReader = null;

const isPlainTextFile = (file : File):boolean => {
    const type = file.type;
    return type==='text/plain';
}

const handleFile = (e:any) => {
    console.log('file content',  fileReader.result);
}

const handleFileChange = (file:File) => {
    if(file && isPlainTextFile(file)) {
        fileReader = new FileReader();
        fileReader.onloadend = handleFile;
        fileReader.readAsText(file);
    } else{
        alert('Solo se aceptar archivos de texto plano');
    }
}

const FileUpload = () => (
        <div>
            <fieldset >
                <input type="file" accept=".txt"
                    onChange={(e) => handleFileChange(e.target.files[0])} />
            </fieldset>
            <br/>
        </div>
    );

    
export default FileUpload;
    
    