import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import { Redirect } from 'react-router';

export default class Registro extends Component {

    constructor(props) {
        super(props);
        this.state = {msgErroForm: '', FireRedirect: false};
    }

    componentDidMount() {
        $('.msg-erro').hide();        
    }

    enviaForm(event) {
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                username:this.username.value, password:this.senha.value,
                password2:this.password2, email:this.email.value,
                categorias:['idosos']
            }),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        //fetch('http://localhost:4030/v1/registroUsuario', requestInfo)
        fetch('https://helptccapi.herokuapp.com/v1/registroUsuario', requestInfo) 
            .then(response => {
                if(response.ok) {
                    this.setState({FireRedirect: true})
                } else {
                    throw new Error('não foi possível registrar')
                }
            })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                this.setState({msgErroForm: error+""})
            })
    }

    render() {
        const { from } = this.props.location.state || '/';
        const { FireRedirect } = this.state;
        return (
            <div id="layout">
                <div className="header">
                    <img src={require("./img/logo.png")} alt="logo"/>
                </div>
                <div className="main">
                    <div className="pure-form pure-form-aligned">
                        <h1 className="alert alert-warning">
                            {
                                this.state.msgErroForm
                            }
                        </h1>
                        <form className="formularioLogin pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">          
                            <div className="pure-control-group">
                                <label>Username:</label>
                                <input className="pure-input-1-3 pure-input-rounded" id="username" type="text" name="username" ref={(input) => this.username = input} placeholder="Username"/>                                              
                                <span className="error">{this.state.msgErro}</span>
                            </div>
                            <div className="pure-control-group">
                                <label>Email:</label>
                                <input className="pure-input-1-3 pure-input-rounded" id="email" type="email" name="email" ref={(input) => this.email = input} placeholder="Email"/>                               
                                <span className="error">{this.state.msgErro}</span>
                            </div>
                            <div className="pure-control-group">
                                <label>Senha:</label>
                                <input className="pure-input-1-3 pure-input-rounded" id="senha" type="password" name="password" ref={(input) => this.senha = input} placeholder="Senha"/>                               
                                <span className="error">{this.state.msgErro}</span>
                            </div>
                            <div className="pure-control-group">
                                <label>Confirme a senha:</label>
                                <input className="pure-input-1-3 pure-input-rounded" id="senha2" type="password" name="password2" ref={(input) => this.senha2 = input} placeholder="Senha"/>                               
                                <span className="error">{this.state.msgErro}</span>
                            </div>
                            <input type="hidden" id="tipo" name="tipo" value="usuario" ref={(input) => this.tipo = input} />
                            <div className="pure-control-group">
                                <label></label>
                                <button className="pure-button  pure-input-1-3 pure-button-primary pure-input-rounded" type="submit">Registro</button>                                                                      
                            </div>
                            <p>Já tem uma conta? faça login <a href="/login">aqui</a> para ajudar alguém</p>
                        </form>
                        {
                            FireRedirect && (
                                <Redirect to={from || '/'}/>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}