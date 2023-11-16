import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'} >Home</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link "  to={'/obrassociales'}>Obras Sociales</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link "  to={'/especializaciones'}>Especializaciones</Link>
                    </li>
                    <li className='separadorNav'></li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/pacientes'}>Pacientes</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/medicos'}>Médicos</Link>
                    </li>
                    <li className='separadorNav'></li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/historiasclinicas'}>Cargar Historia Clínica</Link>
                    </li>
              
                </ul>
                </div>
            </div>
    </nav>
  )
}

export default Menu