
import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

///  importamos componenentes
//import Menu from "./components/Menu";
import home from "./components/Home";
import obrasSociales from "./components/obrassociales";
import especializaciones from "./components/especializaciones";
import pacientes from "./components/Pacientes";
import medicos from "./components/Medicos";
import paciente from "./components/paciente";
import historiasClinicas from "./components/historiasclinicas";
import profesor from './components/profesor';






function App() {
 
  return (
    <BrowserRouter>  
                <Routes>
                <Route path="/" Component={home}></Route>
                <Route path="/obrassociales" Component={obrasSociales}></Route>
                <Route path="/pacientes" Component={pacientes}></Route>
                <Route path="/medicos" Component={medicos}></Route>
                <Route path="/especializaciones" Component={especializaciones}></Route>
                <Route path="/historiasclinicas" Component={historiasClinicas}></Route>
                <Route path="/paciente/:id" Component={paciente}></Route>
                <Route path="/profesor" Component={profesor}></Route>
                </Routes>
            
    </BrowserRouter>
  );
}

export default App;


