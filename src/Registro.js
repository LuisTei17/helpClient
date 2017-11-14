import React, {Component} from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

export default class Registro extends Component {

    constructor(props) {
        super(props);
        this.state = {msgErroForm: '', categoriasForm:[], categorias:[], usuarios:[], tipoUsuario: '', validado: false};
    }

    validaDadoFormularioRegistro(event) {
        event.preventDefault();

        $('.msgErro').remove();
        $('.has-error').removeClass('has-error');

        var todosInputsFomrulario = $('form').find('.field:visible');
        todosInputsFomrulario.each(function(element) {
            if($(this).val().length < 4) {
                $(this).parent().addClass("has-error");
                $(this).parent().append("<p class='msgErro help-block'>Menos de 4 caracteres</p>");
            }
        })
        if($('#senha').val() !== $('#senha2').val()) {                
            $('#senha').parent().addClass("has-error");
            $('#senha').parent().append("<p class='msgErro help-block'>As senhas não coincidem</p>");
        }    
        if (this.state.tipoUsuario === "Instituicao" && $(".categoria-instituicao-form select").prop("selectedIndex") === 0) {
                $(".categoria-instituicao-form select").parent().addClass("has-error");
                $(".categoria-instituicao-form select").parent().append("<p class='msgErro help-block'>Seleciona uma categoria</p>");
        } else {
            this.setState({validado:true});
            this.determinaCategorias();
        };
    }

    componentDidMount() {
        $('form').hide();
        $('.msg-erro').hide();
        this.iniciaForm();
        this.buscaTiposUsuarios();
        this.buscaCategorias();        
    }

    iniciaForm() {
        $('#tipo').change(function(){
            if($('#tipo').prop('selectedIndex') === 0) {
                $('form').hide();
            } else {
                $('form').show();
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
                $('.escolhe-usuario').hide();
            }.bind(this))
        }.bind(this))
    }

    determinaCategorias() {
        var categorias = [];
        $('.categorias-form input:checked').each(function(index) {
            categorias.push($(this).val());
        })
        this.setState({categoriasEnviaForm:categorias})
        this.enviaForm();
    }

    buscaCategorias() {
        $.get("https://helptccapi.herokuapp.com/v1/categorias", {}, function(categorias) {
            this.setState({categorias: categorias})
        }.bind(this))
        
    }
    
    buscaTiposUsuarios() {
        $.get("https://helptccapi.herokuapp.com/v1/usuarios", {}, function(usuarios) {
            this.setState({usuarios: usuarios})
        }.bind(this))
    }
    
    enviaForm() {
    
        console.log("aaaa")
        console.log(this.state.validado)
        if(this.state.validado) {
            console.log("aaaaa")
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({
                    username:this.username.value, password:this.senha.value,
                    password2:this.senha2.value, email:this.email.value,
                    categorias:this.state.categoriasEnviaForm
                }),
                headers: new Headers({
                    'Content-type':'application/json'
                })
            };
        
            //fetch('http://localhost:4030/v1/registro'+this.state.tipoUsuario, requestInfo)
            fetch('https://helptccapi.herokuapp.com/v1/registro' + this.state.tipoUsuario, requestInfo) 
            .then(response => {
                if(response.ok) {
                    browserHistory.push('/login');
                } else {
                    throw ({"msg":"Não foi possível registrar"})
                }
            })
            .catch(error => {
                this.setState({msgErroForm: error.msg})
            })
        }
    }
    
    render() {
        return (
            <div className="container">    
                <img src={require("./img/logo.png")} alt="logo"/>
                <h1 className="msg-erro alert alert-warning">
                {
                    this.state.msgErroForm
                }
                </h1>
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
                <form className="formulario-tipo-login" onSubmit={this.validaDadoFormularioRegistro.bind(this)} method="post">          
                    <div className="username form-group">
                        <label className="control-label">Username:</label>
                        <input className="form-control field" id="username" type="text" name="username" ref={(input) => this.username = input} placeholder="Username"/>                                              
                    </div>
                    <div className="email form-group">
                        <label className="control-label">Email:</label>
                        <input className="form-control field" id="email" type="email" name="email" ref={(input) => this.email = input} placeholder="Email"/>                               
                    </div>
                    <div className="senha form-group">
                        <label className="control-label">Senha:</label>
                        <input className="form-control field" id="senha" type="password" name="password" ref={(input) => this.senha = input} placeholder="Senha"/>                               
                    </div>
                    <div className="senha-2 form-group">
                        <label className="control-label">Confirme a senha:</label>
                        <input className="form-control field" id="senha2" type="password" name="password2" ref={(input) => this.senha2 = input} placeholder="Senha"/>                               
                    </div>
                    <div className="form-group cnpj-form">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="text" name="cnpj" id="cnpj" className="form-control field" ref={(input) => this.cnpj = input} placeholder="Cnpj" />
                    </div>
                    <div className="form-group categorias-form">
                         {
                             this.state.categorias.map(categoria => {
                                 return (
                                    <div key={categoria.titulo} className="checkbox">
                                        <label>
                                            <input type="checkbox" name="categoria" value={categoria.titulo}/>{categoria.titulo}
                                        </label>
                                    </div>
                                 );
                             })
                         }
                    </div>
                    <div className="form-group categoria-instituicao-form">
                        <label htmlFor="categoria">Selecione a categoria</label>
                        <select  className="form-control" id="categoria" name="tipoCategoria" >
                            <option>Escolha uma categoria</option>
                            {
                                this.state.categorias.map(categoria => {
                                    return(
                                        <option key={categoria._id} name="categoria" value={categoria.titulo} ref={(input) => this.categoria = input}>{categoria.titulo}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label></label>
                        <button className="btn btn-primary" type="submit">Registro</button>                                                                      
                    </div>
                    <p className="text-link-formulario ">Já tem uma conta? faça login <a href="/login">aqui</a> para ajudar alguém</p>
                </form>
                
            </div>
        )
    }
}