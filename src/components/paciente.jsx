import React, { Component } from 'react';
import url from '../variables/url'
import Menu from "./Menu";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'


import basura from '../recursos/Trash.png';
import lapiz from '../recursos/Pencil.png';
import suma from '../recursos/Plus.png';

const urlTabla = 'pacientes/';


class paciente extends Component {

    state = {
        objetivo: '2',
        data: [],
        listObrasSociales: [],
        listMedicos: [],
        clinicas: [],
        clinicaElegida: '',
        modalBorrar: false
    }

    // Funciones de estado


    obtenerObjetivo = () => {
        const direccion = window.location.href;
        const cortes = direccion.split("/");
        const numero = cortes[cortes.length - 1];
        this.setState({ objetivo: numero }, () => {
            console.log(this.state.objetivo);
            this.obtenerPaciente();
           
        });
    }


    borrarItem = async () => {
        await axios.delete(url + 'clinicas/' + this.state.clinicaElegida).then(
            response => {
                this.setState({ modalBorrar: false });
                this.cargarClinicas()
            }).catch(error => {
                console.log(error.message)
            })
    }


    seleccionarClinica = (items) => {
        this.setState({
            clinicaElegida: items

        })

    }
    obtenerPaciente = async () => {
        await axios.get(url + urlTabla + this.state.objetivo).then(response => {
            const data = response.data;
            this.setState({ data: data });
            console.log(this.state.data);

        }).catch(error => {
            console.log(error.message)
        })
    }






    //Funciones de llamada a BackEnd

    cargarMedicos = async () => {
        await axios.get(url + 'medicos/').then(response => {
            const data = response.data;
            this.setState({ listMedicos: data });           
        }).catch(error => {
            console.log(error.message)
        })
    } 

    obtenerMedico = (numero) => {
      
        const objetoElegido = this.state.listMedicos.find(item => item.id === numero);
        if (objetoElegido) {
            const nombre = objetoElegido.nombre + ' ' + objetoElegido.apellido;
            return nombre;
        } else {
            return '---';
        }
    }

    cargarObrasSociales = async () => {
        await axios.get(url + 'obrassociales/').then(response => {
            const data = response.data;
            this.setState({ listObrasSociales: data });
        }).catch(error => {
            console.log(error.message)
        })
    }

    obtenerOs = (numero) => {
        const objetoElegido = this.state.listObrasSociales.find(item => item.id === numero);
        if (objetoElegido) {
            const nombre = objetoElegido.obrasocial;
            return nombre;
        } else {
            return '---';
        }
    }

    cargarClinicas = async () => {
        await axios.get(url + 'clinicas/').then(response => {
            const data = response.data;    
            const filtrado = data.filter(obj => obj.idPaciente == this.state.objetivo); 
            this.setState({ clinicas: filtrado});
        }).catch(error => {
            console.log(error.message)
        })
    }

    





    /* listarItems = async () => {
        await axios.get(url + urlTabla).then(response => {
            const data = response.data;
            this.setState({ data: data })
        }).catch(error => {
            console.log(error.message)
        })
    } */


    // Montar al inicio



    componentDidMount() {
        this.obtenerObjetivo();
        this.cargarObrasSociales();
        
        this.cargarMedicos();
        this.cargarClinicas();
        // this.obtenerPaciente();
        //console.log(this.state.data)



    }


    // Renderizado

    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <p className='text-primary mt-5'>FICHA PACIENTE, ID: {this.state.data.id} </p>
                    <div>
                        <h1 className="h1 mb-4">{this.state.data.nombre} {this.state.data.apellido}</h1>
                    </div>
                    <hr />
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td><strong>Dirección: </strong>{this.state.data.direccion}</td>
                                <td><strong>Teléfono: </strong>{this.state.data.telefono}</td>
                                <td><strong>Celular:</strong> {this.state.data.celular}</td>
                            </tr>
                            <tr>
                                <td><strong>DNI: </strong>{this.state.data.dni}</td>
                                <td><strong>Fecha de Nacimiento: </strong>{this.state.data.fechanac}</td>
                                <td><strong>Obra Social: </strong>{this.obtenerOs(this.state.data.idObrasocial)}</td>

                            </tr>
                            <tr>
                                <td colspan="3">
                                    <strong>Antecedentes:</strong> {this.state.data.antecedentes}
                                </td>
                            </tr>
                            <tr colspan="3">
                                <td><strong>Fecha de alta en el sistema:</strong> {this.state.data.fechaalta}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <h4 className='mt-4'><strong>Historial Clinico</strong></h4>
                    <div className="container">
                        {                   
 
                        this.state.clinicas.map(items => {
                            return (

                                <div className="card mb-4">
                                    <div className="card-body">
                                        <p>id: {items.id}</p>
                                        <table className='table table-striped'>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Médico tratante: </strong>{this.obtenerMedico(items.idMedico)}</td>
                                                    <td><strong>Paciente:</strong> {this.state.data.nombre} {this.state.data.apellido}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <strong>Diagnóstico: </strong> {items.diagnostico}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <strong>Tratamiento: </strong> {items.acciones}
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                        <button className="btn btn-danger  float-end" onClick={() => { this.seleccionarClinica(items.id); this.setState({ modalBorrar: true }) }}><img src={basura} width="15px" alt="Borrar" /></button>

                                    </div>

                                </div>









                            )
                        })}

                    </div>



                </div>



               {/*  MODAL BORRAR */}

               <Modal isOpen={this.state.modalBorrar}>
                    <ModalBody>
                        <p>Item id: {this.state.clinicaElegida}</p><hr />
                        <h4 className="h5 text-center-py-4">¿Está seguro de que desea esta entrada de historia clinica?<br /> <strong>  </strong> </h4>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger' onClick={() => { this.borrarItem() }}>Si, borrar</button>
                        <button className='btn btn-success' onClick={() => { this.setState({ modalBorrar: false }) }}>Cancelar</button>

                    </ModalFooter>
                </Modal>

                




            </div>
        )
    }


}



export default paciente