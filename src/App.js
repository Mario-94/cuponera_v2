import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./App.css";
import logo from "./logo.svg";
import {
  CouponFormContainer,
  UpdateCouponContainer,
  DetailCouponContainer,
} from "./containers/CouponFormContainer";
import CouponList from "./containers/CouponList";
import { CouponPublicListContainer } from "./containers/CouponPublicListContainer";
import { QrReaderContainer } from "./containers/QrReaderContainer";
import { CouponPublicDetail } from "./containers/CouponPublicDetail";
import { CouponValidationComponent } from "./componets/CouponValidationComponent";
import { Prueba1 } from "./componets/prueba";
function App() {
  return (
    <Router className="App">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/administrar_cupones">
          <img src={logo} className="App-logo" alt="logo" />
          Reacstrap
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to="/crear_cupon"> Crear Cupon </Link>
          </NavItem>
          <NavItem>
            <Link to="/administrar_cupones">Lista de cupones</Link>
          </NavItem>
          <NavItem>
            <Link to="/lectorQR">lectorQR</Link>
          </NavItem>
          <NavItem>
            <Link to="/listadoPublico">Listado publico</Link>
          </NavItem>
          <NavItem>
            <Link to="/puebas">Prueba</Link>
          </NavItem>
        </Nav>
      </Navbar>
      <Route path="/crear_cupon" component={CouponFormContainer} />
      <Route path="/administrar_cupones" component={CouponList} />
      <Route path="/lectorQR" component={QrReaderContainer} />
      <Route path="/detail/:id" component={DetailCouponContainer} />
      <Route path="/update/:id" component={UpdateCouponContainer} />
      <Route path="/listadoPublico" component={CouponPublicListContainer} />
      <Route path="/detallePublico/:id" component={CouponPublicDetail} />
      <Route path="/validateCupon/:id" component={CouponValidationComponent} />
      <Route path="/puebas" component={Prueba1} />
    </Router>
  );
}

export default App;
