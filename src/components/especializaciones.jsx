import React, { Component } from 'react';
import url from '../variables/url'
import Menu from "./Menu";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import basura from '../recursos/Trash.png';
import lapiz from '../recursos/Pencil.png';
import suma from '../recursos/Plus.png';

const urlTabla = 'especializaciones/';



class especializaciones extends Component {

    state = {
        data: [],
        modal: false,
        tipoModal: '',
        modalError: false,
        modalBorrar: false,
        form: {
            "id": '',
            "especializacion": '',
        }
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
                id: '',
                especializacion: ''
            }
        })
    }

    seleccionarItem = (items) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: items.id,
                especializacion: items.especializacion
            }

        })

    }

    mostrarModal = () => {
        this.setState({ modal: !this.state.modal })
    }



    //Funciones de llamada a BackEnd

    agregarItem = async () => {
        await axios.post(url + urlTabla, this.state.form).then(response => {
            this.mostrarModal();
            this.limpiarForm();
            this.listarItems();

        }).catch(error => {
            console.log(error.message)
        })
    }

    borrarItem = async () => {
        await axios.delete(url + urlTabla + this.state.form.id).then(
            response => {
                this.setState({ modalBorrar: false });
                this.listarItems()
            }).catch(error => {
                // mostramos error de foreign key
                if (error.response.status === 400) {
                    this.setState({ modalBorrar: false })
                    this.setState({ modalError: true })
                } else {
                    console.log(error.message)
                }
            })
    }


    modificarItem = async () => {
        await axios.put(url + urlTabla + this.state.form.id, this.state.form)
            .then(response => {
                console.log('editando');
                this.mostrarModal();
                this.listarItems();
            }).catch(error => {
                console.error('Error:', error);
            });
    }


    listarItems = async () => {
        await axios.get(url + urlTabla).then(response => {
            const data = response.data;
            this.setState({ data: data })
        }).catch(error => {
            console.log(error.message)
        })
    }


    // Montar al inicio

    componentDidMount() {
        this.listarItems()
    }


    // Renderizado

    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <div>
                        <h1 className="h1 my-4">Especializaciones</h1>
                    </div>

                    <div>
                        <button className='btn btn-primary rounded-pill px-4 text-white' onClick={() => { this.setState({ tipoModal: 'agregar' }); this.limpiarForm(); this.mostrarModal() }}><img src={suma} width="15px" className='me-2' />Agregar Especialización</button>
                    </div>
                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(items => {
                                return (
                                    <tr>
                                        <td>{items.id}</td>
                                        <td>{items.especializacion}</td>
                                        <td>
                                            <button className="btn btn-primary ms-2 float-end" onClick={() => { this.seleccionarItem(items); this.setState({ modal: true }) }}><img src={lapiz} width="15px" alt="Editar" /></button>
                                            <button className="btn btn-danger  float-end" onClick={() => { this.seleccionarItem(items); this.setState({ modalBorrar: true }) }}><img src={basura} width="15px" alt="Borrar" /></button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/*  MODAL FORMULARIO */}
                <Modal isOpen={this.state.modal}>
                    <ModalHeader><span className='btn btn-close' onClick={this.mostrarModal}></span></ModalHeader>
                    <ModalBody>
                        <form className='form-group'>
                            <div className="border rounded p-2 mb-3">

                                <label className='text-primary badge'>Especialización: </label>
                                <input onChange={this.cambiosform} type="text" name="especializacion" className='form-control mb-2' value={this.state.form.especializacion} />

                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal === 'agregar' ?
                            <button className='btn btn-success rounded-pill px-4' onClick={this.agregarItem}>Guardar</button>
                            :
                            <button className='btn btn-success rounded-pill px-4' onClick={this.modificarItem}>Editar</button>
                        }

                        <button className='btn btn-danger rounded-pill px-4' onClick={this.mostrarModal}>Cancelar</button>
                    </ModalFooter>
                </Modal>


                {/*  MODAL BORRAR */}

                <Modal isOpen={this.state.modalBorrar}>
                    <ModalBody>
                        <p>Item id: {this.state.form.id}</p><hr />
                        <h4 className="h5 text-center-py-4">¿Está seguro de que desea eliminar? a: <br /> <strong>{this.state.form.especializacion}  </strong> </h4>


                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger' onClick={() => { this.borrarItem() }}>Si, borrar</button>
                        <button className='btn btn-success' onClick={() => { this.setState({ modalBorrar: false }) }}>Cancelar</button>

                    </ModalFooter>
                </Modal>

                {/*   MODAL ERROR */}
                <Modal isOpen={this.state.modalError}>
                    <ModalBody>
                        <h4 className="h5 text-center-py-4">Esta especializacion no se puede eliminar porque está vinculada con médicos cargados en el sistema<br /></h4>

                    </ModalBody>
                    <ModalFooter>

                        <button className='btn btn-success' onClick={() => { this.setState({ modalError: false }) }}>Ok</button>

                    </ModalFooter>
                </Modal>


            </div>
        )
    }


}



export default especializaciones