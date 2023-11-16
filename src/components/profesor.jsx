import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from "./Menu";






class profesor extends Component {

  

   



    // Renderizado

    render() {
        return (
            <div>
                <Menu />
                <div className="container mt-5">
                    <h1>Sobre este trabajo</h1>
                    <p>Hola profesor le comento brevemente lo que puede encontrar en este trabajo, es por supuesto una versión Beta o incompleta de lo que puede realmente ser un sistema de gestión de un Centro Médico, pero es una base que incluye carga, edición y borrado de contenidos, con tablas relacionadas y con tablas de relación múltiple</p>
                    <ul>
                        <li>Las obras sociales están relacionadas con los pacientes mediante foreign key de uno a uno.</li>
                        <li>Podemos ver en la sección pacientes cómo se hace una consulta a la tabla de Obras Sociales para tomar sus nombres y también para cargarlos en un componente Select en el formulario de carga</li>
                        <li>La relacion entre especializaciones y médicos es de muchos a muchos, ya que un médico puede tener varias especializaciones</li>
                        <li>En esta beta no incluimos una interface para borrar/editar las especializaciones asignadas luego de la carga de un médico.</li>
                        <li>Si queremos borrar un Médico que tiene cargadas especializaciones, el sistema procede primero a borras esas relaciones y luego borra al médico.</li>
                        <li>Las historias clínicas son una tabla aparte con foreign Key para médicos y pacientes.</li>
                        <li>El listado de historias clínicas se ve filtrado dentro de la ficha de cada paciente, se puede acceder a la ficha de cada paciente desde el botón ficha en la página /pacientes</li>
                        <li>Las fichas de cada paciente son links dinámicos de tipo plantilla</li>
                        <li>En esta Beta no incluimos interfaz de edición de Historias clínicas, pero si de borrado</li>
                    </ul>
                    <Link to={'/'}> Volver a HOME</Link>
                </div>
                


           


            </div>
        )
    }


}



export default profesor