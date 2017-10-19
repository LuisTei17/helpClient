import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import Login from './Login';
import Registro from './Registro';
import Feed from './Feed';
import Perfil from './Perfil';
import Home from './Home';
import {Redirect} from 'react-router';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

function verificaAutenticado() {
  if(localStorage.getItem('auth-token') === null) {
    return false;  
  }
  return true;
}  

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    localStorage.getItem('auth-token') != null ? (
      <Component {...props}/>

    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
    )
  )}/>
)


class App extends Component {
  
  constructor() {
    super();
  }

  desloga() {
    localStorage.removeItem('auth-token');
    const { from } = this.props.location.state || '/';
    (
      <Redirect/>
    )
  }

  verificaLogado() {
    if(localStorage.getItem('auth-token') != null) {
      $('.logado').show();
      $('.deslogado').hide();
    } else {
      $('.logado').hide();
      $('.deslogado').show();
    }
  }
  
  componentDidMount() {
   this.verificaLogado();
  }

  render() { 
   
    return (
      <Router>
        <div id="layout">  
          <a href="#menu" id="menuLink" className="menu-link">
      
              <span></span>
          </a>
          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>
                  <ul className="pure-menu-list">
                      <li className="deslogado pure-menu-item"><Link to="/login" className="pure-menu-link">Login</Link></li>
                      <li className="deslogado pure-menu-item"><Link to="/registro" className="pure-menu-link" >Registro</Link></li>
                      <li className="logado pure-menu-item"><Link to="/" className="pure-menu-link">Feed</Link></li>
                      <li className="logado pure-menu-item"><Link to="/perfil" className="pure-menu-link">Perfil</Link></li>
                      <li className="logado pure-menu-item"><Link to="" onClick={this.desloga} className="pure-menu-link">Deslogar</Link></li>
                  </ul>
              </div>
          </div>
          <PrivateRoute verificaLogado={this.verificaLogado} exact path="/" component={Feed}/>
          <PrivateRoute verificaLogado={this.verificaLogado} exact path="/perfil" component={Perfil}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/registro" component={Registro}/>
          <Route exact path="/home" component={Home}/>  
        </div>     
      </Router>
    );
  }
}
    
    export default App;