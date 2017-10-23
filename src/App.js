import React, { Component } from 'react';
import $ from 'jquery';
import Login from './Login';
import Registro from './Registro';
import Feed from './Feed';
import Perfil from './Perfil';
import Home from './Home';
import {Redirect} from 'react-router';
import PubSub from 'pubsub-js';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    verificaLogado() ? (
      $('.logado').hide(),
      <Component {...props}/>

    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
    )
  )}/>
)

function verificaLogado() {

  let logado = localStorage.getItem('auth-token') != undefined;

  if(logado) {
    $('.deslogado').hide();
    $('.logado').show();
    return true;
  } else {
    $('.deslogado').show();
    $('.logado').hide();
    return false;
  }
}

class App extends Component {
  
  componentDidMount() {
    verificaLogado();
  }

  desloga() {
    localStorage.removeItem('auth-token');
  }
  

  render() { 
   
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">   
                    <li className="deslogado pure-menu-item"><Link to="/login" className="pure-menu-link">Login</Link></li>
                    <li className="deslogado pure-menu-item"><Link to="/registro" className="pure-menu-link" >Registro</Link></li>
                    <li className="logado pure-menu-item"><Link to="/" className="pure-menu-link">Feed</Link></li>
                    <li className="logado pure-menu-item"><Link to="/perfil" className="pure-menu-link">Perfil</Link></li>
                    <li className="logado pure-menu-item"><Link to="" onClick={this.desloga} className="pure-menu-link">Deslogar</Link></li>
                </ul>
              </div>
            </div>
          </nav>
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