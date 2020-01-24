import React from 'react';
import {useDropzone} from 'react-dropzone';
import FormPage from '../form/Form';

function Dropzone(props) {
  
  

  const { getRootProps, getInputProps} = useDropzone({
    accept: '.pdf,.doc,.docx,.odt,.txt',
    maxSize: '500000',
    minSize: '1',
    onDrop: files => props.uploadFile(files)
  });
  
  return (
    <div className="md-form form-group">
        <i data-test="fa" className="fa fa-file prefix"></i>
        <div {...getRootProps({className: 'dropzone'})}>
       
        <input id='arquivo' name='arquivo' {...getInputProps()} required/>
        <p align='center'>Arraste aqui ou clique para o upload</p>
      </div>
      <aside>
        <h4>Arquivo</h4>
        <ul>{props.value}</ul>
      </aside>
    </div>
  );
}
export default Dropzone;
