import React, { Component } from 'react';
import url from '../variables/url'
import Menu from "./Menu";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import basura from '../recursos/Trash.png';
import lapiz from '../recursos/Pencil.png';
import suma from '../recursos/Plus.png';

const urlTabla = 'pacientes/';


class pacientes extends Component {

    state = {
        data: [],
        modal: false,
        tipoModal: '',
        modalBorrar: false,
        modalError: false,
        form: {
            "id": '',
            "nombre": '',
            "apellido": '',
            "dni": '',
            "direccion": '',
            "telefono": '',
            "celular": '',
            "fechanac": '',
            "fechaalta": '',
            "antecedentes": '',
            "idObrasocial": ''
        },
        listObrasSociales: []
    }

    // Funciones de estado

    

    
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
                "id": '',
                "nombre": '',
                "apellido": '',
                "dni": '',
                "direccion": '',
                "telefono": '',
                "celular": '',
                "fechanac": '',
                "fechaalta": '',
                "antecedentes": '',
                "idObrasocial": ''
            }
        })
    }

    seleccionarItem = (items) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                "id": items.id,
                "nombre": items.nombre,
                "apellido": items.apellido,
                "dni": items.dni,
                "direccion": items.direccion,
                "telefono": items.telefono,
                "celular": items.celular,
                "fechanac": items.fechanac,
                "fechaalta": items.fechaalta,
                "antecedentes": items.antecedentes,
                "idObrasocial": items.idObrasocial
            }
        })

    }

    mostrarModal = () => {
        this.setState({ modal: !this.state.modal })
    }



    //Funciones de llamada a BackEnd

    agregarItem = async () => {

        try {
            var datos = this.state.form;

            if (!datos.dni) {
                delete datos.dni
            }
    
            if (!datos.fechanac) {
                delete datos.fechanac
            }
    
            if (!datos.fechaalta) {
                delete datos.fechaalta
            }
    
            if (!datos.idObrasocial) {
                delete datos.idObrasocial
            } 
    
            console.log(this.state.form);
            await axios.post(url + urlTabla, this.state.form).then(response => {
                this.mostrarModal();
                this.limpiarForm();
                this.listarItems();
    
            })
            
        } catch (error) {
            console.log(error.message);
        }

       
    }

    borrarItem = async () => {
        await axios.delete(url + urlTabla + this.state.form.id).then(
            response => {
                this.setState({ modalBorrar: false });
                this.listarItems()
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({ modalBorrar: false });
                    this.setState({ modalError: true })
                } else {
                    console.log(error.message)
                }
            })
    }


    modificarItem = async () => {
        await axios.put(url + urlTabla + this.state.form.id, this.state.form)
            .then(response => {
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
        this.listarItems();
        this.cargarObrasSociales();
    }


    // Renderizado

    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <div>
                        <h1 className="h1 my-4">Pacientes</h1>
                    </div>

                    <div>
                        <button className='btn btn-primary rounded-pill px-4 text-white' onClick={() => { this.setState({ tipoModal: 'agregar' }); this.mostrarModal() }}><img src={suma} width="15px" className='me-2' />Agregar Paciente</button>
                    </div>
                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>DNI</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Celular</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Fecha de Alta</th>
                                <th>Antecedentes</th>
                                <th>Obra Social</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(items => {
                                return (
                                    <tr>
                                        <td>{items.id}</td>
                                        <td>{items.nombre}</td>
                                        <td>{items.apellido}</td>
                                        <td>{items.dni}</td>
                                        <td>{items.direccion}</td>
                                        <td>{items.telefono}</td>
                                        <td>{items.celular}</td>
                                        <td>{items.fechanac}</td>
                                        <td>{items.fechaalta}</td>
                                        <td>{items.antecedentes}</td>
                                        <td>{this.obtenerOs(items.idObrasocial)}</td>
                                        
                                        <td><a href={'paciente/' + items.id}><button className="btn btn-primary ms-2 float-end">Ficha</button></a>
                                            
                                            </td>
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

                                <label className='text-primary badge'>Nombre: </label>
                                <input onChange={this.cambiosform} type="text" name="nombre" className='form-control mb-2' value={this.state.form.nombre} />

                               <label className='text-primary badge'>Apellido: </label>
                                <input onChange={this.cambiosform} type="text" name="apellido" className='form-control mb-2' value={this.state.form.apellido} />

                                <label className='text-primary badge'>DNI: </label>
                                <input onChange={this.cambiosform} type="text" name="dni" className='form-control mb-2' value={this.state.form.dni} />

                                <label className='text-primary badge'>Dirección: </label>
                                <input onChange={this.cambiosform} type="text" name="direccion" className='form-control mb-2' value={this.state.form.direccion} />

                                <label className='text-primary badge'>Teléfono: </label>
                                <input onChange={this.cambiosform} type="text" name="telefono" className='form-control mb-2' value={this.state.form.telefono} />

                                <label className='text-primary badge'>Celular: </label>
                                <input onChange={this.cambiosform} type="text" name="celular" className='form-control mb-2' value={this.state.form.celular} /> 

                               <label className='text-primary badge'>Fecha de Nacimiento: </label>
                                <input onChange={this.cambiosform} type="date" name="fechanac" className='form-control mb-2' value={this.state.form.fechanac} />

                               <label className='text-primary badge'>Fecha de Alta: </label>
                                <input onChange={this.cambiosform} type="date" name="fechaalta" className='form-control mb-2' value={this.state.form.fechaalta} />

                                <label className='text-primary badge'>Antecedentes: </label>
                                <input onChange={this.cambiosform} type="text" name="antecedentes" className='form-control mb-2' value={this.state.form.antecedentes} />

                                <label className='text-primary badge'>Obra Social: </label>
                                <select name="idObrasocial"  onChange={this.cambiosform} className='form-control mb-2' value={this.state.form.idObrasocial}>
                                <option value=''>Elegir Obra Social</option>       
                                {this.state.listObrasSociales.map(items => {
                                return (
                                    <option value={items.id}>{items.obrasocial}</option>                                   
                                )
                                })}
                                </select>

                                <Link className="ms-3 text-danger"  to={'/obrassociales'}> <p style={{fontSize:14, marginLeft:'5px'}}>Mi obra social no se encuentra en el listado </p></Link>
                                

                                




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
                        <h4 className="h5 text-center-py-4">¿Está seguro de que desea eliminar? a: <br /> <strong>{this.state.form.nombre}  </strong> </h4>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger' onClick={() => { this.borrarItem() }}>Si, borrar</button>
                        <button className='btn btn-success' onClick={() => { this.setState({ modalBorrar: false }) }}>Cancelar</button>

                    </ModalFooter>
                </Modal>

                {/*   MODAL ERROR */}
                <Modal isOpen={this.state.modalError}>
                    <ModalBody>
                        <h4 className="h5 text-center-py-4">Este paciente no puede eliminarse porque tiene historias clinicas registradas en el sistema<br /></h4>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={() => { this.setState({ modalError: false }) }}>Ok</button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }


}



export default pacientes