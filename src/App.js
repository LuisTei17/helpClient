import React, { Component } from 'react';
import $ from 'jquery';
import Login from './Login';
import Registro from './Registro';
import Feed from './Feed';
import Perfil from './Perfil';
import Home from './Home';
import "./css/index.css";
import {Router, Route, Link, browserHistory} from 'react-router';

function logado() {
  $('.deslogado').hide();
  $('.logado').show();
}

function deslogado() {
  $('.deslogado').show();
  $('.logado').hide();
}

function autentica(nextState, replace) {
  if(localStorage.getItem('auth-token')) {
    setTimeout(
      //fetch("https://helptccapi.herokuapp.com/v1/autentica?"+ $.param({"token":localStorage.getItem('auth-token')}))
        fetch("http://localhost:4030/v1/autentica?"+ $.param({"token":localStorage.getItem('auth-token')}))        
        .then(response => {
            if(response.ok) {
              logado();
              replace("/in/feed")
            
            } else {
              deslogado();
              localStorage.removeItem('auth-token');
            }
          })
    , 4000)
  } else {
  }
  
}

function desloga() {
  //fetch("https://helptccapi.herokuapp.com/v1/in/logout?" +  $.param({"token":localStorage.getItem('auth-token')}))
    fetch("http://localhost:4030/v1/in/logout?" +  $.param({"token":localStorage.getItem('auth-token')}))
    .then(response => {
      if(response.ok) {
        localStorage.removeItem('auth-token');
        deslogado();
        browserHistory.push("/login");
        
      }
    })
}

class Navbar extends Component {

  componentDidMount() {
    deslogado(); 
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
                <li className="itens-menu"><Link to="/"><p>Página inicial</p></Link></li>
                <li className="itens-menu deslogado"><Link to="/login"> <p>Login</p></Link></li>
                <li className="itens-menu deslogado"><Link to="/registro" ><p>Registro</p></Link></li>
                <li className="itens-menu logado"><Link to="/in/feed"><p>Feed</p></Link></li>
                <li className="itens-menu logado"><Link to="/in/perfil"><p>Perfil</p></Link></li>
                <li className="itens-menu logado deslogar"><a className="btn" onClick={desloga}><p>Deslogar</p></a></li>
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