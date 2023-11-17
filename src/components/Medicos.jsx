import React, { Component } from 'react';
import url from '../variables/url'
import Menu from "./Menu";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import basura from '../recursos/Trash.png';
import lapiz from '../recursos/Pencil.png';
import suma from '../recursos/Plus.png';

const urlTabla = 'medicos/';


class medicos extends Component {

    state = {
        data: [],
        modal: false,
        tipoModal: '',
        modalBorrar: false,
        modalError: false,
        modalEspecializacion: false,
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
            "matricula": '',
            "horariosAtt": [],
            "especializaciones": []
        },
        listEspecializaciones: [],
        listRelaciones: []
    }

    // Funciones de estado




    cargarEspecializaciones = async () => {
        await axios.get(url + 'especializaciones/').then(response => {
            const data = response.data;
            this.setState({ listEspecializaciones: data });
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
                "matricula": '',
                "horariosAtt": []
            }
        })
    }

    guardarOpciones = async () => {
        var checkboxes = document.getElementsByName("opcion");
        console.log('funcion guardar opciones');
        console.log(checkboxes);

        await axios.get(url + 'medicos/').then(response => {
            const ids = response.data.map(object => {
                return object.id;
            });
            var medico = Math.max(...ids);
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    this.vincularEspecializacion(medico, checkboxes[i].value);
                    console.log('dentro del loop de cada chequeada');
                }

            }
           
           

        })
     
        this.listarRelaciones();

    }

    vincularEspecializacion = async (medico, especializacion) => {
        console.log('vinculando');

        const datos = {
            "medicoId": medico,
            "especializacioneId": especializacion
        }

        await axios.post(url + 'relaciones/', datos).then(response => {
            console.log('cargado');
            console.log(response);

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
                "matricula": items.matricula,
                "horariosAtt": items.horariosAtt
            }
        })

    }

    mostrarModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    mostrarModalEspecializacion = () => {
        this.setState({ modalEspecializacion: !this.state.modalEspecializacion })
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
                console.log('sumamos medico');
                console.log(response);
                this.mostrarModal();
                this.mostrarModalEspecializacion();
                //this.limpiarForm();
                this.listarItems();

            })

        } catch (error) {
            console.log(error.message);
        }


    }

    borrarItem = async () => {
        // Primero borramos las relaciones con Especializaciones

        await axios.get(url + 'relaciones/').then(
            response => {
                const resultArray = response.data.filter(item => item.medicoId === this.state.form.id);
                if(resultArray.length > 0){
                    for (let i = 0; i < resultArray.length; i++) {                          
                        axios.delete(url + 'relaciones/' + resultArray[i].id).then(
                            response => {
                                console.log('relacion borrada');
                            }).catch(error => {
                                console.log(error.message)
                            })
                    }                   
                }
                this.borrarItemSinRel();          
                console.log(resultArray);

            }
        ).catch(error => {
            console.log(error.message)
           
            })

        
    }

    borrarItemSinRel = async () => {
        await axios.delete(url + urlTabla + this.state.form.id).then(
            response => {
                this.setState({ modalBorrar: false });
                this.listarItems()
            }).catch(error => {
                 if (error.response.status === 400) {
                console.log('hasta aqui bien')
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

    listarRelaciones = async () => {
        await axios.get(url + 'relaciones/').then(response => {
            const data = response.data;
            this.setState({ listRelaciones: data })
        }).catch(error => {
            console.log(error.message)
        })

    }

    listarEspecializaciones = async () => {

        const instancias = document.getElementsByClassName('textoEspecializaciones');

        console.log(instancias.data);
        return ('hola');
    }

    obtenerEspecializacion = (numero) => {
        
        const objetoElegido = this.state.listEspecializaciones.find(item => item.id === numero);
        if (objetoElegido) {
            const nombre = objetoElegido.especializacion;
            return nombre;
          } else {
            return '---';
          }        
    }





    // Montar al inicio

    componentDidMount() {
        console.log('test 01');
        this.listarItems();
        this.cargarEspecializaciones();
        this.listarRelaciones();
    }


    // Renderizado

    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <div>
                        <h1 className="h1 my-4">Médicos</h1>
                       
                    </div>

                    <div>
                        <button className='btn btn-primary rounded-pill px-4 text-white' onClick={() => { this.setState({ tipoModal: 'agregar' }); this.mostrarModal() }}><img src={suma} width="15px" className='me-2' />Agregar Médico</button>
                    </div>
                    <hr />

                    <div className="container">

                        {this.state.data.map(items => {
                            return (
                                <div className="card mb-4" >
                                    

                                    <div className="card-body">
                                        <h5 className="card-title"> <strong>Profesional: {items.nombre} {items.apellido} </strong></h5>
                                        <p className="card-text"> 
                                            {this.state.listRelaciones.map(rels => {
                                                if (rels.medicoId === items.id) {
                                                  
                                                    return (
                                                        <>{this.obtenerEspecializacion(rels.especializacioneId)}, </>
                                                    )
                                                }
                                            })}
                                       </p>
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td><b>Dirección</b> {items.direccion}</td>
                                                    <td><b>Teléfono</b> {items.telefono}</td>
                                                    <td><b>Celular</b> {items.celular}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>DNI:</b> {items.dni}</td>
                                                    <td><b>Matricula</b> {items.matricula}</td>
                                                    <td><b>F. Nacimiento:</b> {items.fechanac}</td>

                                                </tr>
                                                <tr>
                                                    <td><b>ID:</b> {items.id}</td>
                                                    <td><b>Fecha Alta:</b> {items.fechaalta}</td>
                                                    <td>
                                            <button className="btn btn-primary ms-2 float-end" onClick={() => { this.seleccionarItem(items); this.setState({ modal: true }) }}><img src={lapiz} width="15px" alt="Editar" /></button>
                                            <button className="btn btn-danger  float-end" onClick={() => { this.seleccionarItem(items); this.setState({ modalBorrar: true }) }}><img src={basura} width="15px" alt="Borrar" /></button>
                                        </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            )
                        })}

                    </div>

                   
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

                                <label className='text-primary badge'>Matricula: </label>
                                <input onChange={this.cambiosform} type="text" name="matricula" className='form-control mb-2' value={this.state.form.matricula} />



                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>




                        <button className='btn btn-danger rounded-pill px-4' onClick={this.mostrarModal}>Cancelar</button>
                        {this.state.tipoModal === 'agregar' ?
                            <button className='btn btn-success rounded-pill px-4' onClick={this.agregarItem}>Agregar</button>
                            :
                            <button className='btn btn-success rounded-pill px-4' onClick={this.modificarItem}>Editar</button>
                        }


                    </ModalFooter>
                </Modal>


                {/*  MODAL BORRAR */}

                <Modal isOpen={this.state.modalBorrar}>
                    <ModalBody>
                        <p>Item id: {this.state.form.id}</p><hr />
                        <h4 className="h5 text-center-py-4">¿Está seguro de que desea eliminar? a: <br /> <strong>{this.state.form.nombre}  </strong> </h4>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={() => { this.setState({ modalBorrar: false }) }}>Cancelar</button>
                        <button className='btn btn-danger' onClick={() => { this.borrarItem() }}>Si, borrar</button>


                    </ModalFooter>
                </Modal>

                {/*  MODAL ESPECIALIZACIONES */}

                <Modal isOpen={this.state.modalEspecializacion}>
                    <ModalHeader>
                        <h4>Seleccione las especializaciones que desee agregar a: <strong> {this.state.form.nombre} {this.state.form.apellido} </strong></h4>

                    </ModalHeader>
                    <ModalBody>
                        <label className='text-primary badge mb-3'>Especializaciones: </label>
                        <form id="opcionesForm">
                            {this.state.listEspecializaciones.map(items => {
                                return (
                                    <>
                                        <label className='form-check-label'>

                                            <input className='form-check-input' type="checkbox" name="opcion" value={items.id} />  {items.especializacion}
                                        </label>
                                        <br />
                                    </>
                                )
                            })}



                        </form>

                        <Link className="ms-3 text-danger" to={'/especializaciones'}> <p style={{ fontSize: 14, marginLeft: '5px' }}>Mi especialización no se encuentra en el listado </p></Link>







                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={() => { this.guardarOpciones() }}>Guardar</button>
                    </ModalFooter>
                </Modal>

                {/*   MODAL ERROR */}
                <Modal isOpen={this.state.modalError}>
                    <ModalBody>
                        <h4 className="h5 text-center-py-4">Este medico no puede eliminarse porque tiene historias clinicas registradas en el sistema<br /></h4>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={() => { this.setState({ modalError: false }) }}>Ok</button>
                    </ModalFooter>
                </Modal>



            </div>
        )
    }


}



export default medicos
