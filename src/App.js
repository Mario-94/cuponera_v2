import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';
import logo from './logo.svg';
import {
  CouponFormContainer,
  UpdateCouponContainer,
  DetailCouponContainer,
} from './containers/CouponFormContainer';
import CouponList from './containers/CouponList';
import { CouponPublicListContainer } from './containers/CouponPublicListContainer';
import { QrReaderContainer } from './containers/QrReaderContainer';
import { CouponPublicDetail } from './containers/CouponPublicDetail';
import {CouponValidationComponent  } from './componets/CouponValidationComponent';


function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img src={logo} className="App-logo" alt="logo" />
              reactstrap
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/crear_cupon"> Crear Cupon </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/administrar_cupones">Lista de cupones</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/lectorQR">lectorQR</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/listadoPublico">Listado publico</Link>
                </NavLink>
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
          <Route path="/validateCupon/:id" component={CouponValidationComponent}/>      
        </div>
      </Router>
    </div>
  );
}

export default App;
