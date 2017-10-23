import React, {Component} from 'react';
import './css/login.css';
import {Redirect} from 'react-router';
import $ from 'jquery';
export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {msgErroForm:'', FireRedirect: false, usuarios: [], tipoUsuario:'', categoria: '', validado: false};
    }

    validaDadoFormularioRegistro() {
        var todosInputsFomrulario = $('form').find('.field:visible');
        todosInputsFomrulario.each(function(element) {
            if($(this).val().length < 4) {
                $(this).parent().addClass("has-error");
                $(this).parent().append("<p class='msgErro help-block'>Menos de 4 caracteres</p>");
                return false;
            }
        });
        this.setState({validado:true});
    }

    iniciaForm() {
        $('#tipo').change(function(){
            if($('#tipo').prop('selectedIndex') === 0) {
                $('button').attr("disabled", true);
            } else {
                $('button').removeAttr("disabled");
            }
            $('#tipo option:selected').each(function(){
                this.setState({tipoUsuario:$('#tipo option:selected').val()});
                if(this.state.tipoUsuario === "Usuario") {
                    $('.cnpj-form').hide();
                } else {
                    $('.cnpj-form').show();
                }
                if(this.state.tipoUsuario === "Instituicao") {
                    $('.categoria-instituicao-form').show();
                    $('.categorias-form').hide();
                } else {
                    $('.categoria-instituicao-form').hide();
                    $('.categorias-form').show();
                }
            }.bind(this))
        }.bind(this))
    }

    componentDidMount() {
        $('.msg-erro').hide();
        this.iniciaForm();
        this.buscaTiposUsuarios();
    }

    buscaTiposUsuarios() {
        $.get("https://helptccapi.herokuapp.com/v1/usuarios", {}, function(usuarios) {
            this.setState({usuarios: usuarios})
        }.bind(this))
    }

    enviaForm(event) {
        event.preventDefault();
        $('.msgErro').remove();
        $('.has-error').removeClass('has-error');
        
        this.validaDadoFormularioRegistro();
        if(this.state.validado) {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({
                username:this.username.value, password:this.senha.value,
                password2:this.senha2.value, email:this.email.value,
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
            .catch(error => {
                this.setState({msgErroForm: error+""})
            })
        }
    }

    
    enviaForm(event) {
        event.preventDefault();
        this.validaDadoFormularioRegistro();
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
                var token = JSON.parse(res).token;
                localStorage.setItem('auth-token', token );
                    
                
                this.setState({FireRedirect: true})
                window.location.reload();
            })
            .catch(error => {
                $('.msg-erro').show();
               this.setState({msgErroForm: error});
        })
    }

    render() {
        const { from } = this.props.location.state || '/';
        const { FireRedirect } = this.state;
        
       
        return (
            <div className="container">
                <div className="form-group">
                    <label htmlFor="tipo">Escolha o tipo de usuário</label>
                    <select className="form-control" id="tipo">
                        <option>Escolha o usuario</option>
                        {
                            this.state.usuarios.map(usuario => {
                              return (
                                  <option key={usuario._id}>{usuario.titulo}</option>
                              )
                            })
                        }
                    </select>
                </div>
                <img src={require("./img/logo.png")} alt="logo"/>
                <h1 className="msg-erro alert alert-warning">
                    {
                        this.state.msgErroForm
                    }
                </h1>
                <form className="formulario-tipo-login" onSubmit={this.enviaForm.bind(this)} method="post">          
                    <div className="form-group">
                        <label>Username:</label>
                        <input className="form-control" id="username" type="text" name="username" ref={(input) => this.username = input} placeholder="Username"/>                                              
                        <span className="error help-block">{this.state.msgErro}</span>
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input className="form-control" id="senha" type="password" name="password" ref={(input) => this.senha = input} placeholder="Senha"/>                               
                        <span className="error help-block">{this.state.msgErro}</span>
                    </div>
                    <input type="hidden" id="tipo" name="tipo" value="usuario" ref={(input) => this.tipo = input} />
                    <div className="form-group">
                        <label></label>
                        <button disabled className="btn btn-primary" type="submit">Login</button>                                                                      
                    </div>
                    <p>Ainda não tem uma conta? registre-se <a href="/registro">aqui</a> para fazer o bem</p>
                </form>
                {
                    FireRedirect && (
                        <Redirect to={from || '/'}/>
                    )
                }
            </div>
        )

    }

    


}