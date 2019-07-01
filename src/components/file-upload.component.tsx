import React, { useContext, useState } from "react";
import UbigeoContext from "../store/index.store";
import { convertDataInStructures } from "../services/ubigeo.service";

const FileUpload = () => {
  let fileReader: FileReader = null;
  let fileInput = React.createRef<HTMLInputElement>();

  const { handleDataChange } = useContext(UbigeoContext);
  const [currentFileName, setCurrentFileName] = useState('');

  const isPlainTextFile = (file: File): boolean => {
    const type = file.type;
    return type === "text/plain";
  };

  const handleFileChange = (file: File) => {
    if (file && isPlainTextFile(file)) {
      setCurrentFileName(file.name);
      fileReader = new FileReader();
      fileReader.onloadend = () => {
        convertDataInStructures(fileReader.result.toString()).subscribe(
          ubigeoDataArray => {
            handleDataChange(...ubigeoDataArray);
          }
        );
      };
      fileReader.readAsText(file);
    } else {
      alert("Solo se aceptar archivos de texto plano");
    }
  };

  const handleButtonClick = () => fileInput.current.click();
  
  return (
    <div className="file-upload-container">
        <button onClick={handleButtonClick}>  Seleccionar Archivo  </button>
        <input
            type="file"
            className = "hidden-input"
            accept=".txt"
            ref={fileInput}
            onChange={e => handleFileChange(e.target.files[0])}
        />
        {
            currentFileName && <small className="filename"><b>Archivo seleccionado: </b>{ currentFileName }</small>
        }
    </div>
  );
};

export default FileUpload;
