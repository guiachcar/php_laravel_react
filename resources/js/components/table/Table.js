import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer,MDBNav,MDBNavItem,MDBBtn,MDBDataTable} from 'mdbreact';
import axios from 'axios';

const initialState = { columns: [
    {
      label: 'Id',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Nome',
      field: 'nome',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Telefone',
      field: 'telefone',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Mensagem',
      field: 'mensagem',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Arquivo',
      field: 'arquivo',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Nome do Arquivo',
      field: 'nome_arquivo',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Ip',
      field: 'ip',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Criado em',
      field: 'created_at',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Editado em',
      field: 'updated_at',
      sort: 'asc',
      width: 100
    }
  ],rows: []};

class DataTable extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.getProfiles = this.getProfiles.bind(this);
    }
        
    async getProfiles(){
        var response =  await axios.get('http://192.168.99.101/api/profiles');
        this.setState({ rows :  response.data});    
        console.log(this.state);
    }
    componentDidMount() {
        this.getProfiles();
    }

    render(){
        return (
            <MDBContainer>
            <MDBNav className='justify-content-center'>
            <MDBNavItem>
                <MDBBtn color="success" href="/">Cadastrar</MDBBtn>
            </MDBNavItem>
            </MDBNav>
            <MDBDataTable
            striped
            bordered
            hover
            data={this.state} />
            </MDBContainer>
        )
    }
}
export default DataTable;


if (document.getElementById('DataTable')) {
    ReactDOM.render(<DataTable />, document.getElementById('DataTable'));
}