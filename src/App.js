import React, { Component } from 'react';
import $ from 'jquery';
import Login from './Login';
import Registro from './Registro';
import Feed from './Feed';
import Perfil from './Perfil';
import Home from './Home';
import {Redirect} from 'react-router';
import PubSub from 'pubsub-js';
import {Router, Route, Link, browserHistory} from 'react-router';

function autentica(nextState, replace) {
  let isLogado = localStorage.getItem('auth-token') != undefined;
  if(isLogado) {
    fetch("https://helptccapi.herokuapp.com/v1/autentica?"+ $.param({"token":localStorage.getItem('auth-token')}))
      .then(response => {
        if(response.ok) {
          $('.deslogado').hide();
          $('.logado').show();
          replace("/in/feed")
         
        } else {
          $('.deslogado').show();
          $('.logado').hide();
          replace("/login");
        }
      }).catch(error => 
        replace("/login")
      )  
  } else {
    replace("/login");
  }
  
}

function desloga() {
  fetch("https://helptccapi.herokuapp.com/v1/in/logout?" +  $.param({"token":localStorage.getItem('auth-token')}))
//  fetch("https://localhost:4030/v1/in/logout")
    .then(response => {
      if(response.ok) {
        localStorage.removeItem('auth-token')
        window.location.reload();
      }
    })
}

class Navbar extends Component {

  componentDidMount() {
    $('.deslogado').show();
    $('.logado').hide();
   }
  

  render() {
    return (
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
                <li><Link to="/">Página inicial</Link></li>
                <li className="deslogado"><Link to="/login">Login</Link></li>
                <li className="deslogado"><Link to="/registro" >Registro</Link></li>
                <li className="logado"><Link to="/in/feed">Feed</Link></li>
                <li className="logado"><Link to="/in/perfil">Perfil</Link></li>
                <li className="logado"><a  onClick={desloga}>Deslogar</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="main">
          {this.props.children}
        </div>       
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {logado: false};
  }

  render() { 
   
    return (
      <Router history={browserHistory}>
            <Route path="" component={Navbar}>
              <Route path="/in/feed" component={Feed} onEnter={autentica}/>
              <Route path="/in/perfil" component={Perfil} onEnter={autentica}/>
              <Route path="/registro" component={Registro}/>
              <Route path="/login" component={Login}/>
              <Route path="/" component={Home}/>
            </Route>
      </Router>
    );
  }
}
    
    export default App;