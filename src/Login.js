import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import './css/login.css';
export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {msg:this.props.location.query.msg};
    }

    enviaForm(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({username:this.username.value, password:this.senha.value, tipo:this.tipo.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        //fetch('http://localhost:4030/v1/login', requestInfo)
        fetch('https://helptccapi.herokuapp.com/v1/login', requestInfo)
            .then(response => {
                if(response.ok) {

                    return response.text();
                } else {
                    throw new Error('não foi possível logar')
                }
            })
            .then(res => {
                console.log(JSON.parse(res).token);
                var token = JSON.parse(res).token;
                localStorage.setItem('auth-token', token );
                browserHistory.push('/');
                

            })
            .catch(error => {
                this.setState({msg:error.msg})
            })
    }

    render() {
        return (
            <div id="layout">
                <div className="header">
                    <img src={require("./img/logo.png")} alt="logo"/>
                </div>
                <div className="main">
                    <div className="pure-form pure-form-aligned">
                        <form className="formularioLogin pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">          
                            <div className="pure-control-group">
                                <label>Username:</label>
                                <input className="pure-input-1-3 pure-input-rounded" id="username" type="text" name="username" ref={(input) => this.username = input} placeholder="Username"/>                                              
                                <span className="error">{this.state.msgErro}</span>
                            </div>
                            <div className="pure-control-group">
                                <label>Senha:</label>
                                <input className="pure-input-1-3 pure-input-rounded" id="senha" type="password" name="password" ref={(input) => this.senha = input} placeholder="Senha"/>                               
                                <span className="error">{this.state.msgErro}</span>
                            </div>
                            <input type="hidden" id="tipo" name="tipo" value="usuario" ref={(input) => this.tipo = input} />
                            <div className="pure-control-group">
                                <label></label>
                                <button className="pure-button  pure-input-1-3 pure-button-primary pure-input-rounded" type="submit">Login</button>                                                                      
                            </div>
                            <p>Ainda não tem uma conta? registre-se <a href="/registro">aqui</a> para fazer o bem</p>
                        </form>
                    </div>
                </div>
            </div>
        )

    }


}