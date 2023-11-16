import React, { Component } from 'react';
import url from '../variables/url'
import Menu from "./Menu";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import basura from '../recursos/Trash.png';
import lapiz from '../recursos/Pencil.png';
import suma from '../recursos/Plus.png';

const urlTabla = 'clinicas/';



class historiasClinicas extends Component {

    state = {
        form: {
            "idPaciente": '',
            "idMedico": '',
            "diagnostico": 'deo',
            "acciones": ''
        },
        listPacientes: [],
        listMedicos: [],
        modalError: false,
        modalExito: false
    }

    // Funciones de estado

    cambiosform = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    limpiarForm = () => {
        this.setState({
            form: {
                "idPaciente": '',
                "idMedico": '',
                "diagnostico": '',
                "acciones": ''
            }
        })
    }




    //Funciones de llamada a BackEnd

    cargarPacientes = async () => {
        await axios.get(url + 'pacientes/').then(response => {
            const data = response.data;
            this.setState({ listPacientes: data });

        }).catch(error => {
            console.log(error.message)
        })
    }

    cargarMedicos = async () => {
        await axios.get(url + 'medicos/').then(response => {
            const data = response.data;
            this.setState({ listMedicos: data });

        }).catch(error => {
            console.log(error.message)
        })
    }

    agregarItem = async () => {
        await axios.post(url + urlTabla, this.state.form).then(response => {
            this.limpiarForm();
            this.setState({ modalExito: true })
        }).catch(error => {
            if (error.response.status === 400) {
                this.setState({ modalBorrar: false });
                this.setState({ modalError: true })
            } else {
                console.log(error.message)
                
            }
        })
    }

    // Montar al inicio

    componentDidMount() {
        this.cargarMedicos();
        this.cargarPacientes();
    }


    // Renderizado

    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <div>
                        <h1 className="h1 my-4">Cargar Historia Clinica</h1>
                    </div>

                    <form className='form-group'>
                        <div className="border rounded p-2 mb-3">

                            <label className='text-primary badge'>Medico tratante: </label>
                            <select name="idMedico" onChange={this.cambiosform} className='form-control mb-2' value={this.state.form.idMedico}>
                                <option value=''>Elegir Médico</option>
                                {this.state.listMedicos.map(items => {
                                    return (
                                        <option value={items.id}>{items.nombre} {items.apellido}</option>
                                    )
                                })}
                            </select>

                            <label className='text-primary badge'>Paciente: </label>
                            <select name="idPaciente" onChange={this.cambiosform} className='form-control mb-2' value={this.state.form.idPaciente}>
                                <option value=''>Elegir Paciente</option>
                                {this.state.listPacientes.map(items => {
                                    return (
                                        <option value={items.id}>{items.nombre} {items.apellido}</option>
                                    )
                                })}
                            </select>


                            <label className='text-primary badge'>Diagnóstico: </label>
                            <textarea class="form-control" name="diagnostico" onChange={this.cambiosform} value={this.state.form.diagnostico} rows="3"></textarea>

                            <label className='text-primary badge'>Tratamiento: </label>
                            <textarea class="form-control" name="acciones" onChange={this.cambiosform} value={this.state.form.acciones} rows="3"></textarea>

                        </div>
                    </form>

                    <div>
                        <button className='btn btn-primary rounded-pill px-4 text-white' onClick={()=> {this.agregarItem();} }>Guardar</button>
                        
                    </div>
                    
                </div>

  
                {/*   MODAL ERROR */}
                <Modal isOpen={this.state.modalError}>
                    <ModalBody>
                        <h4 className="h5 text-center-py-4">Error de carga<br /></h4>
                        <p>Recuerde que debe seleccionar un médico y un paciente para poder cargar una historia clínica</p>
                        <p>Las historias clínicas deben incluir un diagnóstico para poder ser guardadas</p>

                    </ModalBody>
                    <ModalFooter>

                        <button className='btn btn-success' onClick={() => { this.setState({ modalError: false }) }}>Ok</button>

                    </ModalFooter>
                </Modal>

                {/*   MODAL EXITO */}
                <Modal isOpen={this.state.modalExito}>
                    <ModalBody>
                        <h4 className="h5 text-center-py-4">La historia clínica se cargó con éxito<br /></h4>

                    </ModalBody>
                    <ModalFooter>

                        <button className='btn btn-success' onClick={() => { this.setState({ modalExito: false }) }}>Ok</button>

                    </ModalFooter>
                </Modal>


            </div>
        )
    }


}



export default historiasClinicas