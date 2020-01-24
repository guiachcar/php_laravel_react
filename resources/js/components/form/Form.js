import React, { Component } from "react";
import { MDBContainer,MDBNav, MDBNavItem, MDBRow, MDBCol,MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import ReactDOM from 'react-dom';
import Dropzone from '../utils/Dropzone';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {nome:'',email:'',telefone:'',mensagem:'', arquivo:'',  nome_arquivo:''};

class FormPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveData = this.saveData.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  
  async saveData(data){
    try{
      let response = await axios.post('http://192.168.99.101/api/profiles', data);
      toast.success(response.data);
    }catch(e){
      toast.error(e);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.saveData(this.state);
    this.setState(initialState);
  }
  
  myChangeHandler(event){
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  
  async uploadFile(files){
    try{
      var formData = new FormData();
      formData.append('arquivo',files[0])
      var response = await axios.post('http://192.168.99.101/api/profiles/upload',formData,{headers: {"Content-type": "multipart/form-data"}});
     
      if(response.status==200){
        toast.success('Arquivo Salvo');
      }else{
        return toast.error(response.errors.arquivo);
        
      }
      this.setState({nome_arquivo: files[0].path});
      this.setState({arquivo: response.data});
    }catch(e){
      toast.error(e);
    }
  }

  render(){
    
    return (<MDBContainer>
      <MDBNav right className='justify-content-center'>
      <MDBNavItem>
        <MDBBtn color="primary" href="table">Listar Cadastros</MDBBtn>
      </MDBNavItem>
      </MDBNav>
      <MDBRow>
        <MDBCol className="offset-md-2" size="8">
          <MDBCard>
            <MDBCardBody>
              <form id='form1' onSubmit={this.handleSubmit}>
                <p className="h4 text-center py-4">Formulário de Cadastro</p>
                <div className="grey-text">
                <ToastContainer />
                  <MDBInput
                    label="Nome"
                    name="nome"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.myChangeHandler}
                    value={this.state.nome}
                    required
                  />
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    name="email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.myChangeHandler}
                    value={this.state.email}
                    required
                  />                  
                  <MDBInput 
                    type="textarea" 
                    label="Mensagem"
                    name="mensagem"
                    icon="comment" 
                    outline 
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.myChangeHandler}
                    value={this.state.mensagem}
                    required
                  />
                  <div className="md-form form-group">
                  <i data-test="fa" className="fa fa-phone prefix"></i>
                  <NumberFormat 
                    format="(##) #####-####" mask=""
                    name="telefone"
                    onChange={this.myChangeHandler}
                    value={this.state.telefone}
                    placeholder='Telefone'
                    required
                    />
                    
                    </div>
                    
                  <Dropzone uploadFile={this.uploadFile} value={this.state.nome_arquivo} required/>
                  
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Cadastrar
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>)
  }
}
export default FormPage;

if (document.getElementById('FormPage')) {
    ReactDOM.render(<FormPage />, document.getElementById('FormPage'));
}