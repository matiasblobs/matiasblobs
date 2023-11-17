import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../recursos/logo.png';


const home = () => {
return (
    <div className="container-fluid alto100">
    <div className="row h-100">
     
      <div className="col-md-6 h-100 bg-primary p-5 text-white d-flex flex-column justify-content-between align-items-center home-1">
        <div className='cajaTexto'>
            <h1>Bienvenido</h1>
            <p>Al sistema de control de  Historias Clínicas de <b>Centro Médico Palacio.</b></p>
            <p>Con este programa usted podrá organizar:</p>
            <ul>
                <li>Médicos en staff y sus especialidades.</li>
                <li>Pacientes del centro de salud y sus obras sociales.</li>
                <li>Historias clínicas de cada paciente.</li>
            </ul>
        </div>
        <div className='cajaAbajo col-10'>
        <p className='small '><strong>PalacioClinicas 1.0 Beta</strong></p>
        </div>        
      </div>

      
      <div className="col-md-6 h-100 d-flex flex-column justify-content-between p-5 home-2">
        <div className='cajaArriba'><img src={logo} alt="Logo Centro Medico Palacio" srcset="" /></div>
        <div className="cajaTexto">
        <Link className="enlace me-4" to={'/medicos'} >
        <button className='btn btn-primary rounded-pill px-4 mb-3'><strong>STAFF MÉDICO</strong></button><br />
        </Link>
        <Link className="enlace me-4" to={'/pacientes'} >
        <button className='btn btn-primary rounded-pill px-4 mb-3'><strong>PACIENTES</strong></button><br />
        </Link>
        <Link className="enlace me-4" to={'/historiasclinicas'} >
        <button className='btn btn-primary rounded-pill px-4 mb-3'><strong>CARGAR HISTORIAS CLÍNICAS</strong></button><br />
        </Link>
        <Link className="enlace me-4" to={'/profesor'} >
        <button className='btn btn-secondary rounded-pill px-4'><strong>README PROFESOR</strong></button>
        </Link>
        </div>
        <div className="cajaAbajo d-flex">
        <div className="ms-auto"></div>   
        <p className='small'>
            <Link className="enlace me-4" to={'/especializaciones'} ><b>ESPECIALIZACIONES</b></Link>
            <Link className="enlace" to={'/obrassociales'} ><b >OBRAS SOCIALES</b></Link> 
            </p>   
                 
        </div>
      </div>
    </div>
  </div>
)
}

export default home
