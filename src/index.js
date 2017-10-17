import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import './css/index.css';
import Login from './Login';
import Registro from './Registro';
import Feed from './Feed';
import Perfil from './Perfil';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

function verificaEstaAutenticado(nextState, replace) {
    if(localStorage.getItem("auth-token") === null) {
        replace("/home");
    }
}

ReactDOM.render(
    (<Router history={browserHistory} >
        <Route path="/" component={App}>
            <IndexRoute component={Feed} onEnter={verificaEstaAutenticado}/>
            <Route path="/perfil" component={Perfil} onEnter={verificaEstaAutenticado}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/registro" component={Registro}/>
        <Route path="/home" component={Home}/>
    </Router>),
    document.getElementById('root')
);